# Translating psql from C to JS with XSLT

A proof of concept for an alternative to `translate/`: turn the C parse tree into XML, add types, and translate it with XSLT 3 stylesheets (run by SaxonJS).

```bash
python3 -m venv tmp/venv && tmp/venv/bin/pip install -r xslt/requirements.txt  # once

PG=../postgres/src
tmp/venv/bin/python xslt/preprocess.py tmp/pp $PG/include \
  $PG/bin/psql/command.c $PG/bin/psql/describe.c $PG/fe_utils/string_utils.c xslt/libc.h \
  $PG/include/catalog/*.h $PG/include/common/*.h $PG/include/fe_utils/*.h $PG/interfaces/libpq/*.h $PG/bin/psql/*.h |
  xargs node xslt/c-to-xml.ts > tmp/sources.xml
npx xslt3 -xsl:xslt/add-types.xsl -s:tmp/sources.xml -o:tmp/typed.xml
npx xslt3 -xsl:xslt/c-to-js.xsl -s:tmp/typed.xml -o:tmp/translated.js
node translate/compare.ts tmp/translated.js xslt/out
```

The headers (and `libc.h`, a few libc prototypes) are there for their types and `#define`s. Preprocessing (see below) and parsing take about 5s. Adding types then takes about 12s, and translating about 6s. So while working on `c-to-js.xsl`, only the last two lines need rerunning, and `typed.xml` is there to look at. The last line compares the translation with the hand-maintained port, as for `translate/`, writing `xslt/out/residual.diff`.

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

   On `describe.c`, this turns all 64 `goto error_return`s into `return`s, and removes all 15 labels.

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

## Results

`node translate/compare.ts translated.js xslt/out` compares the translation with the hand-maintained port. Of the 70 translated functions that are in the port, 64 are now valid JS (3 identical to the port), as for `translate/`. Of the other 6, 4 have C marked for porting by hand (writing through a `char *`, or passing a slice to a function that might write to it), and 2 have casts, which aren't ported yet.

## Not yet done

- Everything else in `translate/`: casts, `snprintf`, integer division, struct copies and nested initial values, and slicing in globals and header constants (not just functions).
- Tidying the blank lines left where a deleted label and its frees used to be.
