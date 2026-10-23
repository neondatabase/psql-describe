# Translating psql from C to JS

An experiment in replacing the RegExp-and-hand-fixes port with a principled translator.

```bash
node translate/translate.ts ../postgres/src > translated.mjs  # emit the translation
node translate/compare.ts ../postgres/src                     # measure it against src/describe.mjs
npm run check:translate                                       # type-check
```

The scripts are TypeScript run directly by Node (≥ 22.18) via type stripping, so there's no build step.

## How it works

There are three modules:

- `syntax.ts` loads [tree-sitter](https://tree-sitter.github.io/) parsers (via `web-tree-sitter` and the grammars' WASM builds, so nothing native is compiled). It also does source-preserving rewriting, and has helpers for C declarators. A comment there summarises the tree-sitter node shapes used.
- `ctypes.ts` is a C type system just rich enough for the type-directed rules.
- `translate.ts` is the pipeline and the rewrite rules.

The pipeline:

1. **Preprocess**, as far as tree-sitter needs. That means erasing annotation macros that are empty on our platforms (`PGDLLIMPORT`, `pg_attribute_*(…)`), and expanding `CppAsString2()` (stringizing), which appears inside string concatenations.
2. **Parse** the headers in `config.headerDirs` and the three source files.
3. **Collect types**:
   - typedefs
   - struct bodies
   - globals and prototypes from all files
   - a few libc prototypes (e.g. `char *strchr(const char *, int)`), written as C and parsed the same way

   Expressions are then typed bottom-up, and identifiers are resolved through their enclosing blocks.
4. **Slice**: starting from the entry points (`exec_command_d`, `exec_command_list`, `exec_command_sf_sv`), follow identifiers to every function, global and header constant they transitively reference. Whatever is referenced but not defined is an *external*, which the hand-written JS runtime must provide.
5. **Infer `async`**: a function is async if it calls an async function, seeded with `PSQLexec` and `PQexec`.
6. **Rewrite the source in place**: each node is re-emitted as its original text, except where a rule (keyed by node type) applies. Comments and layout survive, so the output can be diffed against upstream C.

### Rules

Syntactic and mechanical:

| C | JS |
|---|---|
| return and parameter types | `[async] function f(a, b)` |
| `T x = y, *z;` | `let x = y, z;` |
| `a->b`, `(type) x` | `a.b`, `x` |
| `{a, b}` initialisers | `[a, b]` |
| `"a" "b"` on one line / across lines | `"ab"` / `"a" +\n"b"` |
| call to an async function | `await f()` |
| `#define X 'r'` | `const X = 'r';` |
| `free(p);`, `PQclear(res);`, … and blocks, `if`s and loops of only these | deleted |
| `pg_malloc_array(char *, n)` | `[]` |
| `goto label`, where the label is followed only by frees and a `return` | that `return` (and the label goes; if it's unreachable, so does its tail) |
| `#ifdef NOT_USED … #endif` | deleted |
| a `#define F()` inside a function | `const F = () => …` |

Type-directed:

| C | JS | Why |
|---|---|---|
| struct or array variable | `= {}` / `= []` (including nested structs) | C allocates them on declaration |
| `char buf[N]` | `= ''` | a string |
| `&x` on a struct or array | `x` | JS objects are references |
| `&x` on a scalar or pointer local | `x`, declared as `{ value }` and read as `x.value` | a box, so the address can be passed around |
| `*p` on a scalar or pointer pointer | `p.value` | an out-parameter, i.e. a box |
| `*s` on a `char *` | `s[0]` | |
| `&s[i]`, `s + n`, `s += n`, `s++` | `s.slice(i)`, `s.slice(n)`, `s = s.slice(n)`, `s = s.slice(1)` | a `char *` is modelled as the string suffix it points to |
| `'\0'` | `undefined` | the end of a string, i.e. reading past the end in JS |
| `s[i] = '\0'` | `s = s.slice(0, i)` | truncation |
| a `char *` as a condition, `!s` | `s != NULL`, `s == NULL` | `""` is falsy in JS but non-NULL in C |
| `int / int` | `Math.trunc(…)` | |
| `snprintf(buf, n, fmt, …)` | `buf = sprintf(fmt, …)` | |
| `T a = b;` or `a = b;` for a struct `T` | `{ ...b }`, or a generated `copy_T(b)` if `T` contains structs or arrays | C copies structs by value; e.g. `copy_printQueryOpt(pset.popt)` |

### Refusals

Some C can't be translated under this model, and if it's left as it is, it may be accidentally valid JS. For example, `buf->data + buf->len` would become string concatenation. So untranslatable C is emitted as `⟦original C⟧`, which is always a syntax error and easy to grep for. The translator refuses:

- **Writes through a `char *`**, e.g. `*target++ = c` or `*eol = '\0'`. JS strings are immutable.
- **A string slice passed to a function that may write through it.** A slice is only allowed as a `const char *` parameter or a variadic argument; unknown callees are refused, to be safe. `const` alone can't decide this for whole strings, because many APIs are const-incorrect: `printTableAddCell(…, char *cell, …)` never writes to `cell`. But a slice (a pointer into the middle of a buffer) passed to a non-`const` parameter is exactly how C code hands out space to write into, as in `PQescapeStringConn(conn, buf->data + buf->len, …)`.
- **All other pointer arithmetic and ordering comparisons**, e.g. walking a pointer through an array of structs (`curbuf++`, `curbuf >= buf`) or pointer differences (`target - buf->data`).

`compare.ts` pulls each translated function and its counterpart in `src/describe.mjs` into `translate/out/{translated,ported}/`, strips comments, folds `"a" + "b"`, and formats both with Prettier. `translate/out/residual.diff` is then the patch that turns the translation into today's hand-maintained port. If the translation isn't valid JS, Prettier can't format it, so that diff includes layout noise; for such functions, the report shows the first offending line.

## Results (REL_19_RC1)

77 functions are sliced, plus 2 globals and 29 header constants. 7 of the functions aren't in the port at all.

| | Valid JS |
|---|---|
| Syntactic rules only | 48 / 77 |
| \+ mechanical rules | 58 / 77 |
| \+ type-directed rules | **70 / 77** |

The 7 that remain are all refusals (or, in `parsePGArray`, a single `malloc` block holding an array of strings). Each is a natural candidate for an override:

| Function | Why | The port's version |
|---|---|---|
| `appendStringLiteral` | writes characters through a pointer into the buffer | its own, string-based |
| `appendStringLiteralConn` | passes `buf->data + buf->len` to `PQescapeStringConn` to write into | calls `appendStringLiteral` |
| `parsePGArray` | builds strings by writing through pointers into one `malloc` block | rewritten by hand |
| `patternToSQLRegex` | `*cp++`, and walks a pointer through an array of `PQExpBufferData` | rewritten with indices |
| `print_with_linenumbers` | splits lines by writing `'\0'` into the string | rewritten by hand |
| `appendReloptionsArray` | splits `name=value` by writing `'\0'` | uses `split('=')` |
| `fmtIdEnc` | passes `id_return->data + id_return->len` to `pg_encoding_set_invalid` | uses an older `fmtId` |

In the 64 valid functions that the port also has, the residual is mostly expected differences:

- NULL tests the port lacks (94 lines)
- struct copies where the port aliases (92)
- the port's `nullPrint` leftovers (42)
- boxes (31)

The rest is the port's own choices (e.g. inlined constants, pager and expanded-mode handling) and drift from upstream.

### Are declarations plus headers enough, or do we need clang?

For this code, declarations plus headers are enough. The expressions the type layer can't type are:

- function-like macros (`_()`, `gettext_noop()`, `lengthof()`)
- enum and `#define` constants
- libc functions returning `int`
- stdio
- two `pg_encoding_*` functions from an unscanned header

None of these is a string used as a condition, sliced, dereferenced or divided, so no type-directed rule is missing a type it needs. Where types are missing, the rules either do nothing (when nothing needs to change) or refuse.

What we'd get from clang:

- types for macros, by expanding them
- system headers in place of the small libc prelude
- certainty about `const` in typedefs

None of that is needed yet.

### What the translation expects of the JS runtime

Mostly what the port already provides, with two differences:

- **`strchr` and `strstr`** must return the matching suffix or `NULL`, as in C (the port returns an index).
- **Struct copies** use the generated `copy_*` functions, which are part of the output.

## Where the port differs from upstream

- **Runtime substitutions:**
  - `appendStringLiteralConn` → `appendStringLiteral`
  - `echo_hidden_command` and `minimal_error_message` → `PSQLexec`'s own echo and error handling
  - pager and stdio externals (`PageOutput`, `fprintf`, …) → `outputFn`
- **Runtime data model:** `cont.footer.data` → `cont.footer`.
- **Drift from upstream:** `exec_command_d`, `exec_command_list` and `exec_command_sf_sv` predate REL_19's `active_branch` and per-command `x` handling. The port handles `x` globally in `main()` instead.

### Bugs in the port that translation fixes

- **`\dl` status:** `listLargeObjects` lost its final `return true;`, so `\dl` ends with status `PSQL_CMD_ERROR`. This is currently invisible, because `main()` treats that the same as success.
- **Keyword quoting:** `fmtId` is an older version with a hard-coded keyword list that predates PostgreSQL 17. It's missing `json_exists`, `json_query`, `json_table`, `json_value` and `merge_action`, so identifiers with those names go unquoted. Translating `fmtIdEnc` and generating `ScanKeywords` from `src/include/parser/kwlist.h` fixes this for good.
- **Missed integer division:** one division in `formatPGVersionNumber` lacks `Math.floor`, and the port's `sprintf` doesn't truncate `%d`. So in "server does not support" messages for servers from version 10 onwards, version 170004 would show as `17.0004` rather than `17`.
- **Struct aliasing:** `printQueryOpt myopt = pset.popt` aliases rather than copies, so setting `myopt.title` and so on also modifies `pset.popt`. This is latent today, because `pset` is created afresh for each `describe()` call and each function sets the fields it uses.

## Next steps

1. Add a config of overrides: functions the slice treats as provided by the runtime rather than translated. Start with the 7 above.
2. Assemble the translation with the runtime (the port's support functions, with `strchr`/`strstr` adjusted) into a module that can replace `describe.mjs`, and run the existing test matrix against it.
3. Keep any remaining hand fixes as a patch on the translation, maintained by 3-way merge across Postgres versions.
