# Translating psql from C to JS

An experiment in replacing the RegExp-and-hand-fixes port with a principled translator.

```bash
node translate/translate.mjs ../postgres/src > translated.mjs  # emit the translation
node translate/compare.mjs ../postgres/src                     # measure it against src/describe.mjs
```

## How it works

`translate.mjs` parses C with [tree-sitter](https://tree-sitter.github.io/) (via `web-tree-sitter` and the `tree-sitter-c` grammar's WASM build, so nothing native is compiled). It then:

1. **Scans headers** for object-like `#define`s and `typedef struct` names.
2. **Expands `CppAsString2()`** textually, using those `#define`s. tree-sitter doesn't preprocess, and this is the one macro that breaks the parse (it appears inside string-literal concatenations). Doing this as a pre-pass mirrors what the C preprocessor does.
3. **Slices**: starting from the entry points (`exec_command_d`, `exec_command_list`, `exec_command_sf_sv`), it follows identifiers to every function, global and header constant they transitively reference. Whatever is referenced but not defined is an *external*, and must be provided by the hand-written JS runtime.
4. **Infers `async`**: a function is async if it calls an async function, seeded with `PSQLexec` and `PQexec`.
5. **Rewrites the source in place**: each node is re-emitted as its original text, except where a rule (keyed by node type) applies. Comments and layout survive, so the output can be diffed against upstream C.

The rules in this first pass are syntactic, plus one type-directed rule:

| C | JS |
|---|---|
| return and parameter types | `[async] function f(a, b)` |
| `const char *x = y, z[N];` | `let x = y, z = [];` (struct/array locals get `{}`/`[]`) |
| `&structOrArrayVar` | `structOrArrayVar` |
| `a->b`, `(type) x` | `a.b`, `x` |
| `{a, b}` initialisers | `[a, b]` |
| `"a" "b"` on one line / across lines | `"ab"` / `"a" +\n"b"` |
| call to an async function | `await f()` |
| `#define X 'r'` | `const X = 'r';` |

`compare.mjs` pulls each translated function and its counterpart in `src/describe.mjs` into `translate/out/{translated,ported}/`, strips comments, folds `"a" + "b"`, and formats both with Prettier. `translate/out/residual.diff` is then the patch that turns the translation into today's hand-maintained port. If the translation isn't yet valid JS, Prettier can't format it, so that diff includes layout noise too.

## Results (REL_19_RC1)

- **77 functions** sliced, plus 2 globals and 29 header constants. 7 functions aren't in the port at all: `ignore_slash_options`, `ignore_slash_whole_line`, `echo_hidden_command`, `count_lines_in_buf`, `minimal_error_message`, `getFmtEncoding`, `fmtIdEnc`.
- **48 of 77 are already valid JS.** Of the 43 that are valid and also in the port, 3 match it exactly. The residual for the other 40 is 209 lines, ignoring `fmtId` (below):
  - 121 lines: freeing calls the port deletes (`termPQExpBuffer`, `PQclear`, `free`, …)
  - 30 lines: `myopt.nullPrint = NULL;`, which the port adds and upstream doesn't have. It's a leftover from the initial port with no effect, since `NULL` and `''` print the same.
  - 58 lines: the interesting ones, catalogued below.
- **The other 29 are blocked by a short list of constructs.** Across them:
  - 64 `goto error_return`
  - about 50 `*` dereferences
  - 21 non-struct `&`
  - 2 preprocessor directives inside function bodies

  The 1,800-line `describeOneTableDetails` needs only `goto` and `*str`.

## Residual catalogue

### Mechanical rules still to add
- **Delete freeing calls** (`free`, `termPQExpBuffer`, `PQclear`, `printTableCleanup`, …) and allocations (`pg_malloc0_array(...)` → `[]`).
- **`goto error_return`**: all 15 `error_return:` labels in `describe.c` consist only of freeing calls followed by `return false;`. Once frees are deleted, every `goto` becomes `return false;`.
- **Preprocessor in function bodies**: drop `#ifdef NOT_USED` blocks; turn the function-local `#define WHEREAND()` into a local arrow function.

### Type-directed rules
These need declaration types, which tree-sitter alone doesn't give us. For this code a symbol table built from local declarations, parameters and header structs should be enough.
- **Out-params**: `&scalar` arguments (`&have_where`, `&dotcnt`, `&obj_oid`, `&noptions`, `&options`), together with `*p = …` in the callee.
- **`char *` arithmetic**:
  - `&s[i]` → `s.slice(i)`
  - `*s` → `s[0]` (note that C's `'\0'` at the end of a string becomes `undefined`)
  - pointer walking (`lines = ++eol`), in `patternToSQLRegex`, `parsePGArray`, `print_with_linenumbers` and `fmtIdEnc`
  - writes through a pointer (`*target++ = …`), in `appendStringLiteral`
- **Integer division**: `version_number / 10000` needs `Math.floor`. The port added it by hand and missed one case in `formatPGVersionNumber`.
- **`char buf[N]` is a string**, not an array: the port turns `snprintf(buf, n, …)` into `buf = sprintf(…)`.
- **Struct fields**: `&(pset.popt.topt)` needs field types from `settings.h`/`print.h`.
- **Struct copies**: `printQueryOpt myopt = pset.popt;` copies in C but aliases in JS. This doesn't show up in the diff because the port aliases too, but a typed translator should emit `{ ...pset.popt }`.

### Where the port deliberately differs (overrides)
- Runtime substitutions: `appendStringLiteralConn` → `appendStringLiteral`; `echo_hidden_command` and `minimal_error_message` → `PSQLexec`'s own echo and error handling; pager and stdio externals (`PageOutput`, `fprintf`, …) → `outputFn`.
- Runtime data model: `cont.footer.data` → `cont.footer`.
- `exec_command_list` predates REL_19's `active_branch`/`x` handling; the port handles `x` globally in `main()` instead.

### Bugs in the port that translation would fix
- `listLargeObjects` lost its final `return true;`, so `\dl` ends with status `PSQL_CMD_ERROR`. This is currently invisible, because `main()` treats that the same as success.
- `fmtId` is an older version with a hard-coded keyword list that predates PostgreSQL 17. It's missing `json_exists`, `json_query`, `json_table`, `json_value` and `merge_action`, so identifiers with those names go unquoted. Translating `fmtIdEnc` and generating `ScanKeywords` from `src/include/parser/kwlist.h` fixes this for good.

## Next steps

1. Add the mechanical rules above, and a config of runtime overrides (functions the slice should treat as provided rather than translate).
2. Add a symbol table and the type-directed rules, and see how far declarations plus header structs get before clang's typed AST is worth its setup cost.
3. Once the translation is valid JS throughout, run it against the existing test matrix in place of `describe.mjs`, keeping any residual as a patch maintained by 3-way merge.
