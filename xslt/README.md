# Translating psql from C to JS with XSLT

A proof of concept for an alternative to `translate/`: turn the C parse tree into XML, and translate it with an XSLT 3 stylesheet (run by SaxonJS).

```bash
node xslt/c-to-xml.ts ../postgres/src/bin/psql/describe.c > describe.xml
npx xslt3 -xsl:xslt/c-to-js.xsl -s:describe.xml -o:describe.js
```

## The XML

`c-to-xml.ts` writes the tree-sitter parse tree as XML. Each named node becomes an element, and a node in a field gets a `field` attribute. Unnamed tokens (punctuation, keywords) are plain text, except those in a field, such as operators, which become `<token>` elements. Everything else between nodes, such as whitespace, is text too, so the XML's text content is exactly the C source. For example:

```c
if (!x->ok)
	goto error_return;
```

becomes:

```xml
<if_statement>if <parenthesized_expression field="condition">(<unary_expression><token field="operator">!</token><field_expression field="argument"><identifier field="argument">x</identifier><token field="operator">-&gt;</token><field_identifier field="field">ok</field_identifier></field_expression></unary_expression>)</parenthesized_expression>
	<goto_statement field="consequence">goto <statement_identifier field="label">error_return</statement_identifier>;</goto_statement></if_statement>
```

## The stylesheet

`c-to-js.xsl` declares `<xsl:mode on-no-match="text-only-copy"/>`, which copies text and descends into elements by default. So a stylesheet with no templates reproduces the C exactly (for `describe.c`, 221 KB of C as 1.5 MB of XML, in under a second). Each template then rewrites one construct.

There are four groups of templates, one for each kind of rule:

1. **A fixed pattern:** `a->b` is `a.b`.

   ```xml
   <xsl:template match="field_expression/token[@field = 'operator'][. = '->']">.</xsl:template>
   ```

2. **Declarators, however deep:** a declaration's types are replaced by `let`, and a function keeps only its name and its parameters' names. The name in a declarator (`*x`, `**x`, `x[10]`, `(*x)(void)`, …) is simply its first identifier: `$declarator/descendant-or-self::identifier[1]`. Tree-sitter queries can't express this, because they can't recurse.

3. **Context:** a statement that only frees memory goes, as do the whitespace before it and an `if` whose body only frees memory. The recursion is in an `xsl:function`, `c:is-freeing`, which a template's match pattern can call.

4. **Sibling axes:** if a label is followed only by frees and a `return`, then `goto label` is that `return`:

   ```xml
   <xsl:variable name="rest" select="($label/*[last()], $label/following-sibling::*)[not(self::comment or c:is-freeing(.))]"/>
   <xsl:sequence select="$rest[self::return_statement][count($rest) = 1][$label/../parent::function_definition]"/>
   ```

   On `describe.c`, this turns all 64 `goto error_return`s into `return`s, and removes all 15 labels.

## Not yet done

- Everything else in `translate/`: types and the rules that need them (boxing, string suffixes, `NULL` tests, struct copies), `async`, string concatenation, the preprocessor, and slicing from the entry points.
- Tidying the blank lines left where a deleted label and its frees used to be.
