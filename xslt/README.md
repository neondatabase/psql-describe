# Translating psql from C to JS with XSLT

A proof of concept for an alternative to `translate/`: turn the C parse tree into XML, add types, and translate it with XSLT 3 stylesheets (run by SaxonJS).

```bash
python3 -m venv tmp/venv && tmp/venv/bin/pip install -r xslt/requirements.txt  # once
npm run build:xslt -- ../postgres tmp/lib
```

This builds the whole JS library from a Postgres source tree: `tmp/lib/describe.mjs`, which is `runtime.mjs` with the translated C in it, and `tmp/lib/sql-help.generated.mjs` (for `\h`). It takes about 30s. The steps, in `xslt/build.sh`, are:

1. `preprocess.py` preprocesses the C files and headers (see below), and `c-to-xml.ts` parses them as XML (`tmp/build/sources.xml`).
2. `add-types.xsl` adds types (`tmp/build/typed.xml`, which is there to look at).
3. `c-to-xml.ts` parses `runtime.mjs` too, and `c-to-js.xsl` translates the C into it.
4. `generate/create-help.mjs` generates the SQL help from the docs.

`node translate/compare.ts tmp/lib/describe.mjs xslt/out` compares the translated functions with the hand-maintained port, as for `translate/`, writing `xslt/out/residual.diff`.

## The runtime

`runtime.mjs` is the hand-written part of the library: the hand-maintained port (`src/describe.mjs`) without the functions that are now translated. It has the exported `describe()` function, which parses the command and dispatches it, and `PSQLexec`, `pset`, output and cancellation; the C library functions the translation calls (`PQExpBuffer`, `PQgetvalue`, `sprintf`, …); and its own versions of a few C functions, which it either can't translate (because they write through a `char *`, such as `fmtId` and `appendStringLiteral`) or deliberately does differently (`\sf` and `\sv` without a pager, in `exec_command_sf_sv`, `lookup_object_oid` and `get_create_object_cmd`).

The translation goes in place of the comment `/* TRANSLATED FROM C */`, in `describe()`'s `main()`. Any name visible there (declared in an enclosing scope, or a parameter of an enclosing function) is provided by the runtime, so it isn't translated: the runtime's version wins. Like `c:declarator`, this walks up the scopes, but in the runtime's JS parse tree:

```xml
<variable name="provided" select="distinct-values((
  $marker/ancestor::*[self::statement_block | self::program] ! c:js-declared(.),
  $marker/ancestor::*/*[@field = 'parameters']/descendant::identifier[not(ancestor::*[@field = 'right'])]))"/>
```

A function the runtime provides is `async` if the runtime declares it so (like `PSQLexec`). Enum constants used by the translation or the runtime (e.g. `PSQL_CMD_UNKNOWN`, `OT_NORMAL`) are translated as `const`s, in place of `/* CONSTANTS TRANSLATED FROM C */` at the top level. Any other name the translation uses but no one provides is reported as an external, so that a new Postgres version can't silently produce a library that fails at run time.

A few runtime functions changed to match the C API, which the port had adapted at each call site instead: `strstr` returns the rest of the string (or `NULL`), as in C, not an index; and a table's last footer is a `printTableFooter`, `{ data }`. And the runtime defines `ngettext` and `pg_log_error_internal`, which the port used but never defined.

With the generated library bundled as `index.js`, the test matrix passes on Postgres 14–19, with help text, as do the API tests: the same 2,789 checks as the hand-maintained port.

## The XML

`c-to-xml.ts` writes the tree-sitter parse trees of the C files as one XML document: a `<sources>` element containing a `<translation_unit file="…">` for each file. Within that, each named node becomes an element, and a node in a field gets a `field` attribute. Each unnamed token (punctuation, keywords, operators) becomes a `<token>` element, so the only text between elements is whitespace. Each `translation_unit`'s text content is exactly the C source (after preprocessing). That's all `c-to-xml.ts` does.

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

- the annotations `PGDLLIMPORT`, `pg_nodiscard`, `pg_attribute_printf(f, a)`, `pg_attribute_format_arg(a)` and `pg_attribute_no_sanitize_address()`, to nothing (as `c.h` defines them when the compiler doesn't support them), since they otherwise spoil the parse of declarations;
- `CppAsString(x)`, which is C's `#` operator, and `CppAsString2(x)`, which expands `x` first (both as in `c.h`);
- macros `#define`d in the file itself (e.g. `WHEREAND()` in `processSQLNamePattern`), and in the catalog headers it includes, which are the only `#include`s it reads. So `CppAsString2(RELKIND_RELATION)` is `"'r'"`, and `RELKIND_RELATION` elsewhere is `'r'`.

and it drops `#ifdef NOT_USED` blocks, since by convention Postgres never defines `NOT_USED`.

`preprocess.py` is pcpp's command-line tool, plus two small changes: it reads only the catalog headers (saying other `#include`d files aren't there, so they're passed through), and it removes comments from `#define` values, as C does. (Otherwise, keeping comments, pcpp stringizes `#define RELKIND_PARTITIONED_TABLE 'p' /* partitioned table */` as `"'p' /* partitioned table */"`.)

An earlier version of this did the preprocessing in XSLT, on the tokens in tree-sitter's parse. But tree-sitter lexes only the tokens that make sense where it is in its parse, so where the parse goes wrong, the tokens after it can be wrong too: after one misparsed `CppAsString2(...)`, `describe.c` has another that's lexed as part of a string. So it had to expand, parse again, and repeat until nothing changed. A real preprocessor's lexer doesn't depend on parsing, so one pass is enough. Also, reimplementing parts of a C preprocessor was very much a non-goal here!

## The stylesheet

`c-to-js.xsl` declares `<mode on-no-match="text-only-copy"/>`, which copies text and descends into elements by default. So a stylesheet with no templates would reproduce the C exactly (for `describe.c`, 226 KB of C as 1.9 MB of XML, in under a second). Each template then rewrites one construct.

The stylesheets are commented for readers new to XSLT. The parts of `c-to-js.xsl` (and, for types, `add-types.xsl`) are:

0. **Following calls from the entry points:** only the functions that the entry points need are translated. A `key` indexes function definitions by name. Then a recursive function looks up every identifier in the definitions reached so far (`key()` takes a whole sequence of names at once) until nothing new turns up:

   ```xml
   <variable name="new" select="key('definition', $found//identifier, $sources) except $found"/>
   <sequence select="if (exists($new)) then c:reached($found | $new) else $found"/>
   ```

   Because `|` and `except` treat nodes as sets in document order, the result comes out in source order, ready to group by file. From `exec_command_d`, `exec_command_list` and `exec_command_sf_sv`, this reaches the same 77 functions, in the same order, as `translate/`.

1. **Following calls back to the async seeds:** a function that calls `PSQLexec` or `PQexec` (provided by the JS runtime, and returning a Promise) is `async`, and so is any function that calls an `async` function. This is the same fixed point, run backwards: a second `key` indexes calls by the function called, and each round adds the functions containing calls to those found so far:

   ```xml
   <variable name="new" select="key('call', $found, $sources)/ancestor::function_definition
     ! c:name(descendant::function_declarator[1])[not(. = $found)]"/>
   <sequence select="if (exists($new)) then c:async(distinct-values(($found, $new))) else $found"/>
   ```

   A function in the result gets `async`, and a call to it gets `await` (in parentheses where it's the function in another call, or what's accessed in `f()->x` or `f()[i]`). As in `translate/`, that's 57 `async` functions and 141 `await`s, exactly the same ones.

2. **Fixed patterns:** `a->b` is `a.b`, and an initialiser list `{a, b}` is an array, `[a, b]`, and `pg_malloc_array(type, n)` is `[]`.

   ```xml
   <template match="field_expression/token[@field = 'operator'][. = '->']">.</template>
   <template match="initializer_list/text()">{translate(., '{}', '[]')}</template>
   ```

3. **Declarators, however deep:** a declaration's types are replaced by `let`, and a function keeps only its name and its parameters' names. The name in a declarator (`*x`, `**x`, `x[10]`, `(*x)(void)`, …) is simply its first identifier: `$declarator/descendant-or-self::identifier[1]`. Tree-sitter queries can't express this, because they can't recurse.

4. **Context:** a statement that only frees memory goes, along with the whitespace before it. So does a block, an `if` or a loop whose body only frees memory, as long as its condition makes no calls: e.g. `for (p = list; *p; p++) free(*p);`. Where a statement can't just go, because it's the body of an `if` or loop that stays, it becomes `{}`. (So `while ((arg = next_option(...)) != NULL) free(arg);` keeps its loop: `translate/` deletes it, which would skip the calls.) The recursion is in a `function`, `c:is-freeing`, which a template's match pattern can call.

5. **Sibling axes:** if a label is followed only by frees and a `return`, then `goto label` is that `return`:

   ```xml
   <variable name="rest" select="($label/*[last()], $label/following-sibling::*)[not(self::comment or c:is-freeing(.))]"/>
   <sequence select="$rest[self::return_statement][count($rest) = 1][$label/../parent::function_definition]"/>
   ```

   On `describe.c`, this turns all 64 `goto error_return`s into `return`s, and removes all 15 labels. Where a label can only be reached by `goto` (because the statement before it is a `return`), the `return` after it is then dead, and goes too.

6. **Types:** before translating, a separate stylesheet, `add-types.xsl`, copies the document, giving each expression in a function a `type` attribute where its type can be worked out, and each identifier a `declared` attribute naming its declaration. For example, `if (pattern)`, where `pattern` is a `const char *` parameter of `describeAggregates`, becomes:

   ```xml
   <if_statement>if <parenthesized_expression field="condition">(<identifier type="char*"
     declared="describeAggregates.pattern">pattern</identifier>)...
   ```

   Rules in `c-to-js.xsl` then just test the attributes. A type is written as its base type (with `const`, if it's declared `const`) plus a suffix for each declarator, as C would write them: `char *s` is `char*`, `const char *s` is `const char*`, `char *s[10]` is `char*[]`, and `char *f(int i)` is `char*()`. Typedefs are replaced by what they stand for, and a struct type is `struct` plus the struct's tag (or, if it has none, its typedef name, or a made-up name such as `describeOneTableDetails.tableinfo`). In `add-types.xsl`, each kind of expression has a template in mode `type` that gives its type, e.g. for `s.f` and `p->f`:

   ```xml
   <template mode="type" match="field_expression" as="xs:string?">
     <variable name="type" select="c:type(*[@field = 'argument'])"/>
     <variable name="struct" select="if (token[@field = 'operator'] = '->') then c:pointee($type) else $type"/>
     <variable name="field" select="*[@field = 'field']"/>
     <sequence select="(key('struct', $struct, root())/*[@field = 'body']/field_declaration
       /*[@field = 'declarator'][c:name(.) = $field])[1] => c:declared-type()"/>
   </template>
   ```

   Each `parameter_declaration` also gets a `type`, even in a prototype outside a function (e.g. `const char*` for the `const char *` in `int f(const char *, int)`), so that rules can see what a function's parameters are.

   An identifier's declaration is found by looking in each enclosing scope (block, `for` loop, function parameters), where the innermost scope's declaration is just the last one in document order, and otherwise among top-level declarations in any file (using a `key`). A declaration in a function is named by the function plus the name declared, e.g. `describeAggregates.pattern`, or `describeFunctions.i#2` for the second `i` declared in `describeFunctions`.

   The first rule to use types gives a string (`char*` or `char[]`) used as a condition an explicit `NULL` test, because an empty string is false in JS but not in C. So `if (pattern)` becomes `if (pattern != NULL)`, and `!pattern` becomes `pattern == NULL`:

   ```xml
   <template match="*[c:is-string(.)][c:is-condition(.)]" priority="1">
     <variable name="js"><next-match/></variable>
     <value-of select="c:operand(., $js) || ' != NULL'"/>
   </template>
   ```

   (`next-match` is how one rule wraps another: here, e.g., an `await`.) This adds 91 `NULL` tests, on identifiers, struct fields, calls (e.g. `strchr(cmd, 'x')`) and dereferences, and they are exactly the same as `translate/`'s. The one exception is in a loop that only frees memory, which `translate/` deletes.

7. **Pointers:** JS objects and arrays are already references, so a pointer to a struct or array is just the struct or array: `&buf` is `buf`, and `*p` is `p`. Other pointers are to variables that a function is passed to set, such as `obj_oid` in `lookup_object_oid(..., &obj_oid)`, so a local variable whose address is taken is boxed, as `{ value }`. Then `&obj_oid` is the box, any other `obj_oid` is `obj_oid.value`, and in `lookup_object_oid`, `*obj_oid` is `obj_oid.value` too. A struct or box declared without a value starts as `{}`, and an array as `[]`. Thanks to the `declared` attributes, finding the boxed variables is a single expression:

   ```xml
   <variable name="boxed" select="distinct-values($sources//pointer_expression[token[@field = 'operator'] = '&amp;']
     /identifier[@field = 'argument'][not(c:is-object(.))][key('local-declaration', @declared)]/@declared)"/>
   ```

   The boxes, `.value`s and initial values are exactly the same as `translate/`'s.

8. **Strings:** a `char *` is modelled as the JS string that's the rest of the C string from where it points. So `*s` is `s[0]`, `&s[i]` and `s + i` are `s.slice(i)`, `s++` is `s = s.slice(1)`, `s[i] = '\0'` is `s = s.slice(0, i)`, and `'\0'`, which ends a C string, is `undefined`, which is what reading past the end of a JS string gives. That only works for reading, so writing through a `char *` (`*s = c`, `*s++`), other pointer arithmetic and comparisons, and passing a slice to a function whose parameter is a (writable) `char *`, are marked `⟦like this⟧` for porting by hand. That last check looks up the function's parameter's `type`:

   ```xml
   <variable name="call" select="$expr/parent::argument_list/parent::call_expression"/>
   <variable name="function" select="key('function', $call/*[@field = 'function'], $sources)[1]"/>
   <variable name="position" select="count($expr/preceding-sibling::*[not(self::token | self::comment)]) + 1"/>
   <variable name="parameter" select="$function/*[@field = 'parameters']/parameter_declaration[$position]"/>
   <sequence select="empty($call) or (exists($function) and not($parameter/@type = ('char*', 'char[]')))"/>
   ```

   The slices, `[0]`s, `undefined`s and refusals are exactly the same as `translate/`'s.

9. **Struct copies:** assigning a C struct copies it, but assigning a JS object doesn't, so `printQueryOpt myopt = pset.popt;` is `myopt = { ...pset.popt }`. A C struct also contains its structs and arrays, so a struct type with some gets a copy function, output after everything else:

   ```js
   function copy_printQueryOpt(s) {
     return { ...s, topt: copy_printTableOpt(s.topt) };
   }
   ```

   Likewise, a struct declared without a value starts with its nested structs and arrays: `printTableOpt opt;` is `opt = { fieldSep: {}, recordSep: {} }`. To make this possible, `add-types.xsl` gives each struct definition its type, and each field declarator the type it declares. The copies, copy functions and initial values are exactly the same as `translate/`'s.

10. **Other expressions:** a cast `(type) x` is just `x`; `a / b`, where `a` and `b` are integers, is `Math.trunc(a / b)` (wrapping whatever else applies, using `next-match`); and `snprintf(buf, size, format, ...)`, as a statement, is `buf = sprintf(format, ...)`. These too are exactly the same as `translate/`'s.

## Results

`node translate/compare.ts translated.js xslt/out` compares the translation with the hand-maintained port. Of the 70 translated functions that are in the port, 64 are now valid JS (3 identical to the port), as for `translate/`. Of the other 6, 5 have C marked for porting by hand (writing through a `char *`, pointer comparisons, or passing a slice to a function that might write to it), as in `translate/`, and 1 has `sizeof(char *)`.

Normalised by `compare.ts` and compared function by function, this translation now differs from `translate/`'s only where it should: catalog constants are expanded by pcpp (`relkind == 'r'`, not `relkind == RELKIND_RELATION`), `WHEREAND()` is expanded where it's used (not turned into an arrow function), and `ignore_slash_options` keeps its loop (see 4, above). It also has the struct copy functions as functions of their own.

Two bugs in the hand-maintained port don't happen in the generated library, and each now has a test:

- `\du` and `\dg` fail with "ERROR: ngettext is not defined" whenever a role has a connection limit (the port calls `ngettext`, for "1 connection" or "3 connections", but never defines it). This is now in the test matrix, with roles limited to 1 and 3 connections.
- On a Postgres 10 server, `\dfp` says "\df does not take a "p" option with server version 10.0005", not "10": the port lost an integer division (`Math.floor`) in `formatPGVersionNumber`. This is now in the API tests (with `sversion` 100005).

## Not yet done

- Slicing in globals (not just functions).
