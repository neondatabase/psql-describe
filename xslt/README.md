# Translating psql from C to JS with XSLT

A proof of concept for an alternative to `translate/`: turn the C parse tree into XML, add types, and translate it with XSLT 3 stylesheets (run by SaxonJS).

```bash
PG=../postgres/src
node xslt/c-to-xml.ts $PG/bin/psql/command.c $PG/bin/psql/describe.c $PG/fe_utils/string_utils.c \
  xslt/libc.h $PG/include/common/*.h $PG/include/fe_utils/*.h $PG/interfaces/libpq/*.h $PG/bin/psql/*.h > tmp/sources.xml
npx xslt3 -xsl:xslt/add-types.xsl -s:tmp/sources.xml -o:tmp/typed.xml
npx xslt3 -xsl:xslt/c-to-js.xsl -s:tmp/typed.xml -o:tmp/translated.js
node translate/compare.ts tmp/translated.js xslt/out
```

The headers (and `libc.h`, a few libc prototypes) are there for their types. Adding types takes about 8s, and translating about 3s. So while working on `c-to-js.xsl`, only the last two lines need rerunning, and `typed.xml` is there to look at. The last line compares the translation with the hand-maintained port, as for `translate/`, writing `xslt/out/residual.diff`.

## The XML

`c-to-xml.ts` writes the tree-sitter parse trees of the C files as one XML document: a `<sources>` element containing a `<translation_unit file="…">` for each file. Within that, each named node becomes an element, and a node in a field gets a `field` attribute. Unnamed tokens (punctuation, keywords) are plain text, except those in a field, such as operators, which become `<token>` elements. Everything else between nodes, such as whitespace, is text too, so each `translation_unit`'s text content is exactly the C source. For example:

```c
if (!x->ok)
	goto error_return;
```

becomes:

```xml
<if_statement>
  if
  <parenthesized_expression field="condition">(
    <unary_expression>
      <token field="operator">!</token>
      <field_expression field="argument">
        <identifier field="argument">x</identifier>
        <token field="operator">-&gt;</token>
        <field_identifier field="field">ok</field_identifier>
      </field_expression>
    </unary_expression>
  )</parenthesized_expression>
  <goto_statement field="consequence">goto <statement_identifier field="label">error_return</statement_identifier>;</goto_statement>
</if_statement>
```

## The stylesheet

`c-to-js.xsl` declares `<mode on-no-match="text-only-copy"/>`, which copies text and descends into elements by default. So a stylesheet with no templates would reproduce the C exactly (for `describe.c`, 221 KB of C as 1.5 MB of XML, in under a second). Each template then rewrites one construct.

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

2. **A fixed pattern:** `a->b` is `a.b`.

   ```xml
   <template match="field_expression/token[@field = 'operator'][. = '->']">.</template>
   ```

3. **Declarators, however deep:** a declaration's types are replaced by `let`, and a function keeps only its name and its parameters' names. The name in a declarator (`*x`, `**x`, `x[10]`, `(*x)(void)`, …) is simply its first identifier: `$declarator/descendant-or-self::identifier[1]`. Tree-sitter queries can't express this, because they can't recurse.

4. **Context:** a statement that only frees memory goes, as do the whitespace before it and an `if` whose body only frees memory. The recursion is in a `function`, `c:is-freeing`, which a template's match pattern can call.

5. **Sibling axes:** if a label is followed only by frees and a `return`, then `goto label` is that `return`:

   ```xml
   <variable name="rest" select="($label/*[last()], $label/following-sibling::*)[not(self::comment or c:is-freeing(.))]"/>
   <sequence select="$rest[self::return_statement][count($rest) = 1][$label/../parent::function_definition]"/>
   ```

   On `describe.c`, this turns all 64 `goto error_return`s into `return`s, and removes all 15 labels.

6. **Types:** before translating, a separate stylesheet, `add-types.xsl`, copies the document, giving each expression in a function a `type` attribute where its type can be worked out. For example, `if (pattern)`, where `pattern` is a `const char *`, becomes:

   ```xml
   <if_statement>if <parenthesized_expression field="condition">(<identifier type="char*">pattern</identifier>)...
   ```

   Rules in `c-to-js.xsl` then just test the attribute. A type is written as its base type plus a suffix for each declarator, as C would write them: `char *s` is `char*`, `char *s[10]` is `char*[]`, and `char *f(int i)` is `char*()`. Typedefs are replaced by what they stand for, and a struct is named by its tag (or a made-up name, if it has none). In `add-types.xsl`, each kind of expression has a template in mode `type` that gives its type, e.g. for `s.f` and `p->f`:

   ```xml
   <template mode="type" match="field_expression" as="xs:string?">
     <variable name="type" select="c:type(*[@field = 'argument'])"/>
     <variable name="struct" select="if (token[@field = 'operator'] = '->') then c:pointee($type) else $type"/>
     <variable name="field" select="*[@field = 'field']"/>
     <sequence select="(key('struct', $struct, root())/*[@field = 'body']/field_declaration
       /*[@field = 'declarator'][c:name(.) = $field])[1] => c:declared-type()"/>
   </template>
   ```

   An identifier's declaration is found by looking in each enclosing scope (block, `for` loop, function parameters), where the innermost scope's declaration is just the last one in document order, and otherwise among top-level declarations in any file (using a `key`).

   The first rule to use types gives a string (`char*` or `char[]`) used as a condition an explicit `NULL` test, because an empty string is false in JS but not in C. So `if (pattern)` becomes `if (pattern != NULL)`, and `!pattern` becomes `pattern == NULL`:

   ```xml
   <template match="*[c:is-string(.)][c:is-condition(.)]" priority="1">
     <variable name="js"><next-match/></variable>
     <value-of select="c:operand(., $js) || ' != NULL'"/>
   </template>
   ```

   (`next-match` is how one rule wraps another: here, e.g., an `await`.) This adds 91 `NULL` tests, on identifiers, struct fields, calls (e.g. `strchr(cmd, 'x')`) and dereferences, and they are exactly the same as `translate/`'s. The one exception is in a loop that only frees memory, which `translate/` deletes.

## Not yet done

- Everything else in `translate/`: the rules that need types (boxing, string suffixes, struct copies, integer division), the preprocessor (for now, a few header declarations with annotations such as `pg_attribute_printf` don't parse, so they go untyped), and slicing in globals and header constants (not just functions).
- Tidying the blank lines left where a deleted label and its frees used to be.
