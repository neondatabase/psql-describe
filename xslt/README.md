# Translating psql from C to JS with XSLT

A proof of concept for an alternative to `translate/`: turn the C parse tree into XML, and translate it with an XSLT 3 stylesheet (run by SaxonJS).

```bash
PG=../postgres/src
node xslt/c-to-xml.ts $PG/bin/psql/command.c $PG/bin/psql/describe.c $PG/fe_utils/string_utils.c > sources.xml
npx xslt3 -xsl:xslt/c-to-js.xsl -s:sources.xml -o:translated.js
```

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

The stylesheet is commented for readers new to XSLT. Its parts are:

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

6. **Types:** a string (`char *`) used as a condition gets an explicit `NULL` test, because an empty string is false in JS but not in C. So `if (pattern)` becomes `if (pattern != NULL)`, and `!pattern` becomes `pattern == NULL`. An identifier's declaration is found by looking in each enclosing scope (block, `for` loop, function parameters, file), and the innermost scope's declaration is just the last one in document order:

   ```xml
   <variable name="declarations" select="$id/ancestor::*/(
       self::compound_statement/declaration,
       self::for_statement/declaration,
       self::function_definition/descendant::function_declarator[1]/*[@field = 'parameters']/parameter_declaration,
       self::translation_unit/declaration)"/>
   <sequence select="($declarations/*[@field = 'declarator'][c:name(.) = $id])[last()]"/>
   ```

   This adds 81 `NULL` tests, exactly the same ones (on identifiers) as `translate/`, and changes nothing else. `translate/` also adds 2 on struct fields, which this doesn't yet handle.

## Not yet done

- Everything else in `translate/`: the rest of the type system (struct fields, function return types, typedefs, headers) and the rules that need it (boxing, string suffixes, struct copies), the preprocessor, and slicing in globals and header constants (not just functions).
- Tidying the blank lines left where a deleted label and its frees used to be.
