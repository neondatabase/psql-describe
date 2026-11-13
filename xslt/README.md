# Translating psql from C to JS with XSLT

A proof of concept for an alternative to `translate/`: turn the C parse tree into XML, add types, and translate it with XSLT 3 stylesheets (run by SaxonJS).

```bash
python3 -m venv .venv
.venv/bin/pip install -r xslt/requirements.txt
source .venv/bin/activate

npm run build:xslt -- ../postgres xslt-build
```

This builds the whole JS library from a Postgres source tree: `tmp/lib/describe.mjs`, which is `runtime.mjs` with the translated C in it, and `tmp/lib/sql-help.generated.mjs` (for `\h`). It takes about 45s. The steps, in `xslt/build.sh`, are:

1. `preprocess.py` preprocesses the C files and headers (see below), and `code-to-xml.ts` parses them as XML (`tmp/build/sources.xml`).
2. `add-types.xsl` adds types (`tmp/build/typed.xml`, which is there to look at).
3. `code-to-xml.ts` parses `runtime.mjs` too, and `c-to-js.xsl` translates the C into it.
4. `generate/create-help.mjs` generates the SQL help from the docs.

`node translate/compare.ts tmp/lib/describe.mjs xslt/out` compares the translated functions with the hand-maintained port, as for `translate/`, writing `xslt/out/residual.diff`.

## The runtime

`runtime.mjs` is the hand-written part of the library: the hand-maintained port (`src/describe.mjs`) without the functions that are now translated. It has the exported `describe()` function, which hands the command to the translated `HandleSlashCmds`, and `PSQLexec`, `pset`, output and cancellation; the C library functions the translation calls (`PQExpBuffer`, `PQgetvalue`, `sprintf`, …), and the table-printing functions, `printTableInit`, `printTable` and so on (`printQuery` and `column_type_alignment` are translated from `print.c`); and its own versions of the four C functions it can't translate, because they write characters through a `char *`: `fmtId`, `appendStringLiteral`, `appendStringLiteralConn` (into a `PQExpBuffer`'s data) and `parsePGArray` (into a block of memory holding an array of pointers and their strings).

The keyword list that `fmtId` uses to decide what to quote is generated, though. In psql, `common/keywords.c` makes the keyword categories, `ScanKeywordCategories`, by `#include`-ing `parser/kwlist.h` (a list of `PG_KEYWORD("abort", ABORT_P, UNRESERVED_KEYWORD, BARE_LABEL)` and so on) in an array, having `#define`d `PG_KEYWORD` to give just the category. The names are in a hash table made at build time, so `xslt/keywords.c` does the same as `keywords.c` for those, as `ScanKeywordNames`. Both arrays are translated as globals (the runtime's `fmtId` uses them). (The port's hand-written list was from Postgres 16, missing `json_exists`, `json_query`, `json_table`, `json_value` and `merge_action`, which psql 17 and later quote.)

For C library functions, it does just enough. For example, `PQexec` runs a query and gives a result with a status (`PGRES_TUPLES_OK` or, if the query fails, `PGRES_FATAL_ERROR`, with error fields for `PQresultErrorField`), and C's stdio is an object with a `write` method, where `stdout` writes text, and there's no pager. Text written to `stdout`, or logged as an error or warning, is collected, and goes to the `outputFn` callback as one item before the next table, or at the end. (So the line-by-line output of `\sf+`, or a warning for each extra argument, is one item, as it would be lines together in psql.) So `\sf` and `\sv` (`exec_command_sf_sv` and the functions it calls), which use these, are translated like everything else. So are `\?` and `\h` (`exec_command_slash_command_help` and `exec_command_help`), for which the runtime provides `slashUsage` (which prints the generated `\?` text: see below) and `helpSQL` (which searches the generated SQL help).

`HandleSlashCmds` and `exec_command` are translated too, so psql decides what's an invalid command, and warns about extra arguments. For these, the runtime has `psql_scan_slash_command` (which reads the command name, up to whitespace or a backslash, as psql's lexer does) and stubs for the `\if` stack (we're always in an active branch).

What psql has but the library doesn't is declared `unsupported`, e.g. `do_lo_export = unsupported('lo_export')`, which reports an error. This lets `exec_command_lo` be translated whole, for `\lo_list`.

The translation goes in place of the comment `/* TRANSLATED FROM C */`, in `describe()`'s `main()`. Any name visible there (declared in an enclosing scope, or a parameter of an enclosing function) is provided by the runtime, so it isn't translated: the runtime's version wins. Like `c:declarator`, this walks up the scopes, but in the runtime's JS parse tree:

```xml
<variable name="provided" select="distinct-values((c:js-declared($runtime-statements),
  $marker/ancestor::*/*[@field = 'parameters']/descendant::identifier[not(ancestor::*[@field = 'right'])]))"/>
```

A function the runtime provides is `async` if the runtime declares it so (like `PSQLexec`). Constants used by the translation or the runtime are translated as `const`s, in place of `/* CONSTANTS TRANSLATED FROM C */` at the top level: enum constants (e.g. `PSQL_CMD_UNKNOWN`, `PGRES_TUPLES_OK`), and constants `#define`d in headers, where the value is a single literal (e.g. `PG_DIAG_SEVERITY`, `'S'`, and `INT8OID`, `20`). (Tree-sitter doesn't parse a `#define`'s value, which could be any text, such as `((Oid) 0)`.) Any other name the translation uses but no one provides is reported as an external, so that a new Postgres version can't silently produce a library that fails at run time.

A few runtime functions changed to match the C API, which the port had adapted at each call site instead: `strstr` returns the rest of the string (or `NULL`), as in C, not an index; a table's last footer is a `printTableFooter`, `{ data }`; and `parsePGArray` sets its result through a pointer, `itemarray`, rather than filling in an array it's given. And the runtime defines `ngettext` and `pg_log_error_internal`, which the port used but never defined.

### The version, and the `\?` text

These are generated too, and go with the constants. `build.sh` reads the version from `configure.ac` (e.g. `19rc1`), as `PG_VERSION`, and `PG_MAJORVERSION` is its leading digits, as configure makes it. The default docs URL is then as psql makes it, in `/docs/devel/` or (here) `/docs/19/`.

The `\?` text is `slashUsage`'s lines (from `help.c`) for the commands we have. To decide if we have a command, the stylesheet follows its name as psql would: through `exec_command`'s `if`-`else` chain, evaluating conditions such as `strcmp(cmd, "sf") == 0`, `cmd[0] == 'd'` and `strncmp(cmd, "lo_", 3) == 0` for that name, and on into the function it calls, if that's passed the name, where `exec_command_lo` tests `strcmp(cmd + 3, "export") == 0`. We have the command if the functions called are all translated or provided, and none is `unsupported`. So `\lo_list` stays, but `\lo_export` goes (`do_lo_export` is unsupported), as does `\copyright` (`exec_command_copyright` is neither translated nor provided). A section stays if any of its commands does. `\? options` and `\? variables` stay, since they're `\?` with an argument (the runtime reports them unsupported).

When a new Postgres version adds a describe command, its line in `\?` comes with it. The matrix checks that each line of the generated `\?` is one of the reference psql's, in order, and the API tests check which commands are there.

### Tests

With the generated library bundled as `index.js`, the test matrix passes on Postgres 14–19, with help text (2,922 checks), as do the 15 API tests.

## The XML

`code-to-xml.ts` writes the tree-sitter parse trees of code files as one XML document: a `<sources>` element containing a `<translation_unit file="…">` for each C file (or a `<program file="…">`, for JS, as for `runtime.mjs`). Within that, each named node becomes an element, and a node in a field gets a `field` attribute. Each unnamed token (punctuation, keywords, operators) becomes a `<token>` element, so the only text between elements is whitespace. Each file's element has exactly the file's source as its text content (after preprocessing, for C). That's all `code-to-xml.ts` does. (`c-syntax.xsl` describes the XML too, and has functions for reading it.)

For example:

```c
if (!x->ok)
	goto error_return;
```

becomes:

```xml
<if_statement>
  <token>if</token>
  <parenthesized_expression field="condition">
    <token>(</token>
    <unary_expression>
      <token field="operator">!</token>
      <field_expression field="argument">
        <identifier field="argument">x</identifier>
        <token field="operator">-&gt;</token>
        <field_identifier field="field">ok</field_identifier>
      </field_expression>
    </unary_expression>
    <token>)</token>
  </parenthesized_expression>
  <goto_statement field="consequence">
    <token>goto</token> <statement_identifier field="label">error_return</statement_identifier><token>;</token>
  </goto_statement>
</if_statement>
```

## Preprocessing

Tree-sitter parses C without preprocessing it, which mostly works, but not always. For example, in `"... != " CppAsString2(RELKIND_RELATION) " AND ..."`, it reads `CppAsString2` as a macro that expands to a string (like `PRId64` in `"%" PRId64`), which makes the concatenated string the function in a call, and the parse goes wrong from there.

So `preprocess.py` first runs each file through a real C preprocessor, [pcpp](https://github.com/ned14/pcpp) (written in Python), set up to expand only a few macros and to leave everything else alone: `#include`s, comments, and any `#if` logic it can't evaluate. It expands:

- the annotations `PGDLLIMPORT`, `pg_nodiscard`, `pg_attribute_printf(f, a)`, `pg_attribute_format_arg(a)`, `pg_attribute_no_sanitize_address()` and `pg_noreturn`, to nothing (as `c.h` defines them when the compiler doesn't support them), since they otherwise spoil the parse of declarations;
- `CppAsString(x)`, which is C's `#` operator, and `CppAsString2(x)`, which expands `x` first (both as in `c.h`);
- macros `#define`d in the file itself (e.g. `WHEREAND()` in `processSQLNamePattern`), and in the catalog headers it includes, which are the only `#include`s it reads, apart from `parser/kwlist.h` (see the runtime, above), which it pastes in. So `CppAsString2(RELKIND_RELATION)` is `"'r'"`, and `RELKIND_RELATION` elsewhere is `'r'`.

and it drops `#ifdef NOT_USED` blocks, since by convention Postgres never defines `NOT_USED`.

`preprocess.py` is pcpp's command-line tool, plus two small changes: it reads only the catalog headers and the keyword list (saying other `#include`d files aren't there, so they're passed through), and it removes comments from `#define` values, as C does. (Otherwise, keeping comments, pcpp stringizes `#define RELKIND_PARTITIONED_TABLE 'p' /* partitioned table */` as `"'p' /* partitioned table */"`.) In headers, it leaves the `#define`s in place (after expanding their uses), so that constants the runtime uses can be translated; in `.c` files, it removes them.

An earlier version of this did the preprocessing in XSLT, on the tokens in tree-sitter's parse. But tree-sitter lexes only the tokens that make sense where it is in its parse, so where the parse goes wrong, the tokens after it can be wrong too: after one misparsed `CppAsString2(...)`, `describe.c` has another that's lexed as part of a string. So it had to expand, parse again, and repeat until nothing changed. A real preprocessor's lexer doesn't depend on parsing, so one pass is enough. Also, reimplementing parts of a C preprocessor was very much a non-goal here!

## The stylesheets

`c-to-js.xsl` declares `<mode on-no-match="text-only-copy"/>`, which copies text and descends into elements by default. So a stylesheet with no templates would reproduce the C exactly (for `describe.c`, 226 KB of C as 1.9 MB of XML, in under a second). Each template then rewrites one construct.

Since it makes no difference where a template is, the rules are arranged as a story. `c-to-js.xsl` itself is just an overview (with a primer on XSLT and XPath, and the bands of template priorities) and the root template, which puts the runtime, constants and translation together. The rules are in `c-to-js/`, one file for each part of the story, commented for readers new to XSLT, and best read in this order. (`c-syntax.xsl` has the functions for reading the XML that `c-to-js.xsl` shares with `add-types.xsl`, such as `c:name`, the name a declarator declares, and `c:arguments`, a call's arguments.)

1. **`runtime.xsl`, the runtime:** where the translation goes, and what the runtime provides (see above). Constants go here too, as does the version.

2. **`reach.xsl`, what we translate:** only the functions and global variables that the entry points need. The entry points are the names the runtime uses but doesn't provide, which is just `HandleSlashCmds` (so the runtime's call to it decides what's translated). A `key` indexes definitions by name: of functions, and of global variables (other than `extern` declarations). Then a recursive function looks up every identifier in the definitions reached so far (`key()` takes a whole sequence of names at once) until nothing new turns up:

   ```xml
   <variable name="new" select="key('definition', $found//identifier[not(. = $provided)][exists(key('definition', ., $sources))]
     [not(c:is-dropped(.))], $sources) except $found"/>
   <sequence select="if (exists($new)) then c:reached($found | $new) else $found"/>
   ```

   Because `|` and `except` treat nodes as sets in document order, the result comes out in source order, ready to group by file. From `exec_command_d`, `exec_command_list` and `exec_command_sf_sv`, this reaches the same 77 functions, in the same order, as `translate/`.

   Names in C that isn't translated aren't followed, and don't count as externals: `c:is-dropped` says which C that is, in one place, for both. It's dropped branches (below), statements that only free memory (e.g. `printTableCleanup(&cont);`), array allocations, and array sizes in declarators.

   `HandleSlashCmds` calls `exec_command`, which has a branch for every backslash command, e.g. `else if (cmd[0] == 'd') status = exec_command_d(...);`. Only the branches for the functions in the `commands` parameter stay (`exec_command_d`, `exec_command_list`, `exec_command_sf_sv`, `exec_command_lo`, `exec_command_z`, `exec_command_help` and `exec_command_slash_command_help`). The others are `$dropped-branches`, and an `if` whose branch is dropped is replaced by its `else`:

   ```xml
   <template match="if_statement[*[@field = 'consequence'] intersect $dropped-branches]">
     <apply-templates select="c:inner(*[@field = 'alternative'])"/>
   </template>
   ```

   Global variables are translated where the functions are, in `main()`, which therefore runs the command last, once everything is declared. They are `restricted` (used by `HandleSlashCmds`), and `quote_all_identifiers`, `ScanKeywordNames` and `ScanKeywordCategories` (used by the runtime's `fmtId`). To make this possible, `add-types.xsl` types the names of global variables, as well as everything in functions.

3. **`async.xsl`, async functions:** a function that calls `PSQLexec` or `PQexec` (provided by the JS runtime, and returning a Promise) is `async`, and so is any function that calls an `async` function. This is the same fixed point, run backwards: a second `key` indexes calls by the function called, and each round adds the functions containing calls to those found so far:

   ```xml
   <variable name="new" select="key('call', $found, $sources)/ancestor::function_definition
     ! c:function-name(.)[not(. = ($found, $provided))]"/>
   <sequence select="if (exists($new)) then c:async(distinct-values(($found, $new))) else $found"/>
   ```

   A function in the result gets `async`, and a call to it gets `await` (in parentheses where it's the function in another call, or what's accessed in `f()->x` or `f()[i]`). As in `translate/`, that's 57 `async` functions and 141 `await`s, exactly the same ones.

4. **`syntax.xsl`, what's the same apart from syntax:** a declaration's types are replaced by `let`, and a function keeps only its name and its parameters' names. The name in a declarator (`*x`, `**x`, `x[10]`, `(*x)(void)`, …) is simply its first identifier, `c:name`. Tree-sitter queries can't express this, because they can't recurse. `a->b` is `a.b`, an initialiser list `{a, b}` is an array, `[a, b]`, a cast `(type) x` is just `x`, and `snprintf(buf, size, format, ...)`, as a statement, is `buf = sprintf(format, ...)`:

   ```xml
   <template match="field_expression/token[@field = 'operator'][. = '->']">.</template>
   <template match="initializer_list/token[. = '{']">[</template>
   <template match="initializer_list/token[. = '}']">]</template>
   ```

   This file also has functions about expressions in general, for the files that follow: e.g. which assignment last set a variable before some point (`c:last-set`).

5. **`memory.xsl`, what goes:** a statement that only frees memory goes, along with the whitespace before it. So does a block, an `if` or a loop whose body only frees memory, as long as its condition makes no calls: e.g. `for (p = list; *p; p++) free(*p);`. Where a statement can't just go, because it's the body of an `if` or loop that stays, it becomes `{}`. (So `while ((arg = next_option(...)) != NULL) free(arg);` keeps its loop: `translate/` deletes it, which would skip the calls.) The recursion is in a `function`, `c:is-freeing`, which a template's match pattern can call. `pg_malloc_array(type, n)` is `[]`.

   And if a label is followed only by frees and a `return`, then `goto label` is that `return`, which needs the sibling axes:

   ```xml
   <variable name="rest" select="($label/*[last()], $label/following-sibling::*)[not(self::token or self::comment or c:is-freeing(.))]"/>
   <sequence select="$rest[self::return_statement][count($rest) = 1][$label/../parent::function_definition]"/>
   ```

   On `describe.c`, this turns all 64 `goto error_return`s into `return`s, and removes all 15 labels. Where a label can only be reached by `goto` (because the statement before it is a `return`), the `return` after it is then dead, and goes too.

6. **`types.xsl`, where types make a difference:** before translating, a separate stylesheet, `add-types.xsl`, copies the document, giving each expression in a function a `type` attribute where its type can be worked out, and each identifier a `declared` attribute naming its declaration. For example, `if (pattern)`, where `pattern` is a `const char *` parameter of `describeAggregates`, becomes:

   ```xml
   <if_statement>if <parenthesized_expression field="condition">(<identifier type="char*"
     declared="describeAggregates.pattern">pattern</identifier>)...
   ```

   Rules in `c-to-js/` then just test the attributes. A type is written as its base type (with `const`, if it's declared `const`) plus a suffix for each declarator, as C would write them: `char *s` is `char*`, `const char *s` is `const char*`, `char *s[10]` is `char*[]`, and `char *f(int i)` is `char*()`. Typedefs are replaced by what they stand for, and a struct type is `struct` plus the struct's tag (or, if it has none, its typedef name, or a made-up name such as `describeOneTableDetails.tableinfo`). In `add-types.xsl`, each kind of expression has a template in mode `type` that gives its type, e.g. for `s.f` and `p->f`:

   ```xml
   <template mode="type" match="field_expression" as="xs:string?">
     <variable name="type" select="c:type(*[@field = 'argument'])"/>
     <variable name="struct" select="(if (c:operator(.) = '->') then c:pointee($type) else $type) ! replace(., '^const ', '')"/>
     <variable name="field" select="*[@field = 'field']"/>
     <variable name="declarator" select="(key('struct', $struct, root())/*[@field = 'body']/field_declaration
       /*[@field = 'declarator'][c:name(.) = $field])[1]"/>
     <sequence select="c:declared-type($declarator)"/>
   </template>
   ```

   Each `parameter_declaration` also gets a `type`, even in a prototype outside a function (e.g. `const char*` for the `const char *` in `int f(const char *, int)`), so that rules can see what a function's parameters are.

   An identifier's declaration is found by looking in each enclosing scope (block, `for` loop, function parameters), where the innermost scope's declaration is just the last one in document order, and otherwise among top-level declarations in any file (using a `key`). A declaration in a function is named by the function plus the name declared, e.g. `describeAggregates.pattern`, or `describeFunctions.i#2` for the second `i` declared in `describeFunctions`.

   The first rule to use types gives a string (`char*` or `char[]`) used as a condition an explicit `NULL` test, because an empty string is false in JS but not in C. So `if (pattern)` becomes `if (pattern != NULL)`, and `!pattern` becomes `pattern == NULL`:

   ```xml
   <template match="*[c:is-string(.)][c:is-condition(.)]" priority="10">
     <variable name="js"><next-match/></variable>
     <value-of select="c:operand(., $js) || ' != NULL'"/>
   </template>
   ```

   (`next-match` is how one rule wraps another: here, e.g., an `await`.) This adds 91 `NULL` tests, on identifiers, struct fields, calls (e.g. `strchr(cmd, 'x')`) and dereferences, and they are exactly the same as `translate/`'s. The one exception is in a loop that only frees memory, which `translate/` deletes.

   Types are written as JS sees them, which keeps the rules that use them simple. Every integer type is `int`, whether it's made of C's integer type words (e.g. `unsigned short int`) or is one of the C library's (e.g. `size_t` or `int16_t`), except those with 64 bits (`long`, `long long`, `int64_t` and `uint64_t`), which are `int64`. Every floating-point type is `double`. A `char` (signed or unsigned) stays `char`, since it's part of a string, and `bool` stays `bool`. And `const` goes, except on `char`, where it says that a string can't be written to: `const char *s` is `const char*`, but `const printTableOpt *opt` is `struct printTableOpt*`. This works because `c.h` is among the inputs, so Postgres's own typedefs are resolved (e.g. `int64` to `int64_t`, and `float4` to `float`).

   The other rule is integer division: `a / b`, where `a` and `b` are `int`s (or `int64`s), is `Math.trunc(a / b)` (again wrapping whatever else applies).

   JS numbers are exact for integers up to 2⁵³, which is enough for everything but 64-bit integers, and JS's bitwise operators work on 32-bit signed integers. So any `int64`, or bitwise operator, in the translated C is reported, like the externals. There are none in the C we translate now (its numbers are small, e.g. check counts and connection limits, and OIDs, which fit easily), but a new Postgres version could add some. For example, translating `do_watch` would report `do_watch: (long) (sleep * 1000); ...`.

7. **`pointers.xsl`, pointers:** JS objects and arrays are already references, so a pointer to a struct or array is just the struct or array: `&buf` is `buf`, and `*p` is `p`. Other pointers are to variables that a function is passed to set, such as `obj_oid` in `lookup_object_oid(..., &obj_oid)`, so a local variable whose address is taken is boxed, as `{ value }`. Then `&obj_oid` is the box, any other `obj_oid` is `obj_oid.value`, and in `lookup_object_oid`, `*obj_oid` is `obj_oid.value` too. Thanks to the `declared` attributes, finding the boxed variables is a single expression:

   ```xml
   <variable name="boxed" select="distinct-values($sources//pointer_expression[c:operator(.) = '&amp;']
     /identifier[@field = 'argument'][not(c:is-object(.))][key('local-declaration', @declared)]/@declared)"/>
   ```

   The boxes and `.value`s are exactly the same as `translate/`'s.

   And a pointer (other than a string) that only ever points into one array is an index into it. In `patternToSQLRegex`, `curbuf` and `maxbuf` point into `PQExpBufferData buf[3]`: `curbuf = &buf[0]` is `curbuf = 0`, `curbuf++`, `curbuf < maxbuf` and `curbuf >= buf` (`curbuf >= 0`) are as they are, and `appendPQExpBufferStr(curbuf, ...)` is `appendPQExpBufferStr(buf[curbuf], ...)`. That's only if the pointer is used in no other way. The array can be any expression that always gives the same array (with no side effects, and neither it nor its variables set in the function): in `printQuery`, `for (footer = opt->footers; *footer; footer++)` is `for (footer = 0; opt.footers[footer] != NULL; footer++)`.

8. **`strings.xsl`, strings:** a `char *` is modelled as the JS string that's the rest of the C string from where it points. So `*s` is `s[0]`, `&s[i]` and `s + i` are `s.slice(i)`, `s++` is `s = s.slice(1)`, `s[i] = '\0'` is `s = s.slice(0, i)`, and `'\0'`, which ends a C string, is `undefined`, which is what reading past the end of a JS string gives. That only works for reading, with two exceptions:

   - `*p = '\0'`, where `p` was set by `p = strchr(s, c)` (or `strrchr` or `strstr`), ends `s` where `p` is: `s = s.slice(0, s.length - p.length)`. Each copy of `s` (a variable last set to `s` itself) is ended too, since in C it's the same string: so in `appendReloptionsArray`, `name = option; separator = strchr(option, '='); *separator = '\0';` ends both, as `option = option.slice(0, option.length - separator.length), name = option`. (Copies made in other ways, e.g. in arrays or structs, aren't found.)
   - `*s++`, which reads `s[0]` and moves `s` on, is `s[0]`, with `s = s.slice(1)` after it, in a statement that doesn't otherwise use `s`: `appendPQExpBufferChar(curbuf, *cp++);` is `appendPQExpBufferChar(curbuf, cp[0]), cp = cp.slice(1);`. (C only requires that `s` has moved by the next statement, and the comma expression keeps it one statement.)

   Otherwise, writing through a `char *` (`*s = c`, `*s++ = c`), other pointer arithmetic and comparisons, and passing a slice to a function whose parameter is a (writable) `char *`, are marked `⟦like this⟧` for porting by hand. That last check looks up the function's parameter's `type`:

   ```xml
   <variable name="call" select="$expr/parent::argument_list/parent::call_expression"/>
   <variable name="function" select="key('function', $call/*[@field = 'function'], $sources)[1]"/>
   <variable name="position" select="count($expr/preceding-sibling::*[not(self::token | self::comment)]) + 1"/>
   <variable name="parameter" select="c:parameters($function)[$position]"/>
   <sequence select="empty($call) or (exists($function) and not($parameter/@type = ('char*', 'char[]')))"/>
   ```

   The slices, `[0]`s, `undefined`s and refusals (other than the exceptions) are exactly the same as `translate/`'s.

9. **`structs.xsl`, struct copies:** assigning a C struct copies it, but assigning a JS object doesn't, so `printQueryOpt myopt = pset.popt;` is `myopt = { ...pset.popt }`. A C struct also contains its structs and arrays, so a struct type with some gets a copy function, output after everything else:

   ```js
   function copy_printQueryOpt(s) {
     return { ...s, topt: copy_printTableOpt(s.topt) };
   }
   ```

   To make this possible, `add-types.xsl` gives each struct definition its type, and each field declarator the type it declares. The copies and copy functions are exactly the same as `translate/`'s.

10. **`values.xsl`, initial values:** a C variable declared without a value is still something, so in JS it starts with a value that's the same. A struct starts with its nested structs and arrays (`printTableOpt opt;` is `opt = { fieldSep: {}, recordSep: {} }`), an array of structs with its structs (`PQExpBufferData buf[3]` is `buf = [{}, {}, {}]`), a box with `{}`, and a global variable with zero, as in C (`static bool restricted;` is `let restricted = false;`, and a pointer would be `NULL`). The initial values are exactly the same as `translate/`'s.

11. **`help.xsl`, the `\?` text:** the lines for the commands we have (see above).

## Results

`node translate/compare.ts translated.js xslt/out` compares the translation with the hand-maintained port. Of the 70 translated functions that are in the port, 64 are now valid JS (3 identical to the port), as for `translate/`. Of the other 6, 5 have C marked for porting by hand (writing through a `char *`, pointer comparisons, or passing a slice to a function that might write to it), as in `translate/`, and 1 has `sizeof(char *)`.

Normalised by `compare.ts` and compared function by function, this translation now differs from `translate/`'s only where it should: catalog constants are expanded by pcpp (`relkind == 'r'`, not `relkind == RELKIND_RELATION`), `WHEREAND()` is expanded where it's used (not turned into an arrow function), and `ignore_slash_options` keeps its loop (see 4, above). It also has the struct copy functions as functions of their own.

Five bugs in the hand-maintained port don't happen in the generated library, and each now has a test:

- `\du` and `\dg` fail with "ERROR: ngettext is not defined" whenever a role has a connection limit (the port calls `ngettext`, for "1 connection" or "3 connections", but never defines it). This is now in the test matrix, with roles limited to 1 and 3 connections.
- On a Postgres 10 server, `\dfp` says "\df does not take a "p" option with server version 10.0005", not "10": the port lost an integer division (`Math.floor`) in `formatPGVersionNumber`. This is now in the API tests (with `sversion` 100005).
- Identifiers named for keywords added in Postgres 17 (`json_exists`, `json_query`, `json_table`, `json_value` and `merge_action`) aren't quoted, e.g. `\sv "json_table"` gives `CREATE OR REPLACE VIEW public.json_table`, not `public."json_table"`: the port's keyword list was from Postgres 16. The generated library's list comes from `kwlist.h`. This is now in the test matrix, with a view named `json_table`.
- Quotes in a command's arguments don't work as in psql, because the port's `psql_scan_slash_option` treats every `'` and `"` as opening or closing a quote. So `\dt "o'x"` (where `'` should be literal) has an unbalanced quote, and silently lists all tables, and `\dt 'o''x'` looks for `ox`, not `o'x`. The runtime's version now follows the rules in `psqlscanslash.l`: double-quoted text is kept as it is, quotes included, and in single-quoted text, `''` is a quote, and backslash sequences (`\n`, `\047`, `\x27`, `\'`, ...) work. A trailing semicolon is stripped only if it's unquoted, and an unterminated quote is an error.
- Then, with a quote in a pattern, the SQL is wrong: the port's `appendStringLiteral` escapes a quote as `\'`, which is a syntax error with `standard_conforming_strings` on. psql doubles it, as the runtime now does (and doubles backslashes, with `standard_conforming_strings` off).

  These two are in the test matrix, with a table named `o'x`, and in the API tests.
