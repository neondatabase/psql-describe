<?xml version="1.0" encoding="UTF-8"?>
<!--
  Translates C to JS, given C as XML from c-to-xml.ts. The text of that XML is the C source, so by default
  (on-no-match="text-only-copy") we copy text and descend into elements, which reproduces the C unchanged.
  Each template then rewrites one C construct.

  Usage: npx xslt3 -xsl:xslt/c-to-js.xsl -s:file.xml -o:file.js
-->
<xsl:stylesheet version="3.0" expand-text="yes"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:c="urn:c-to-js"
  exclude-result-prefixes="#all">

  <xsl:output method="text"/>
  <xsl:mode on-no-match="text-only-copy"/>

  <!-- 1. A fixed pattern: a->b is a.b -->

  <xsl:template match="field_expression/token[@field = 'operator'][. = '->']">.</xsl:template>

  <!-- 2. Declarators, however deep: a declaration's types are replaced with let, and a function keeps only its
       name and its parameters' names. The name in a declarator (*x, x[10], (*x)(void), ...) is its first identifier. -->

  <xsl:function name="c:name" as="xs:string">
    <xsl:param name="declarator" as="element()"/>
    <xsl:sequence select="string($declarator/descendant-or-self::identifier[1])"/>
  </xsl:function>

  <xsl:template match="function_definition">
    <xsl:variable name="signature" select="descendant::function_declarator[1]"/>
    <xsl:variable name="params" select="$signature/*[@field = 'parameters']/parameter_declaration/*[@field = 'declarator']"/>
    <xsl:text>function {c:name($signature)}({string-join($params ! c:name(.), ', ')})</xsl:text>
    <xsl:apply-templates select="*[@field = 'body']/(preceding-sibling::node()[1], .)"/>
  </xsl:template>

  <xsl:template match="declaration">
    <xsl:variable name="first" select="*[@field = 'declarator'][1]"/>
    <xsl:text>let </xsl:text>
    <xsl:apply-templates select="$first, $first/following-sibling::node()"/>
  </xsl:template>

  <xsl:template match="pointer_declarator | array_declarator">
    <xsl:apply-templates select="*[@field = 'declarator']"/>
  </xsl:template>

  <!-- 3. Context: a statement that only frees memory goes, along with the whitespace before it. That includes an if
       statement whose body only frees memory (and whose condition has no side effects). -->

  <xsl:variable name="freeing-functions" select="'free', 'pg_free', 'PQclear', 'termPQExpBuffer', 'destroyPQExpBuffer', 'printTableCleanup'"/>

  <xsl:function name="c:is-freeing" as="xs:boolean">
    <xsl:param name="statement" as="node()"/>
    <xsl:sequence select="exists($statement/self::expression_statement/call_expression/*[@field = 'function'][. = $freeing-functions])
      or exists($statement/self::if_statement[not(*[@field = 'alternative'])]
        [not(*[@field = 'condition']//(call_expression | assignment_expression | update_expression))]
        [c:is-freeing(*[@field = 'consequence'])])"/>
  </xsl:function>

  <xsl:template match="(expression_statement | if_statement)[c:is-freeing(.)]"/>
  <xsl:template match="text()[following-sibling::node()[1][c:is-freeing(.)]]">{replace(., '\s+$', '')}</xsl:template>

  <!-- 4. Sibling axes: if a label at the top level of a function is followed only by frees and a return, then
       goto label is that return, and the label itself goes -->

  <xsl:function name="c:return-after" as="element(return_statement)?">
    <xsl:param name="label" as="element(labeled_statement)?"/>
    <xsl:variable name="rest" select="($label/*[last()], $label/following-sibling::*)[not(self::comment or c:is-freeing(.))]"/>
    <xsl:sequence select="$rest[self::return_statement][count($rest) = 1][$label/../parent::function_definition]"/>
  </xsl:function>

  <xsl:function name="c:label" as="element(labeled_statement)?">
    <xsl:param name="goto" as="element(goto_statement)"/>
    <xsl:sequence select="$goto/ancestor::function_definition//labeled_statement[*[@field = 'label'] = $goto/*[@field = 'label']]"/>
  </xsl:function>

  <xsl:template match="goto_statement[c:label(.) => c:return-after()]">
    <xsl:apply-templates select="c:label(.) => c:return-after()"/>
  </xsl:template>

  <xsl:template match="labeled_statement[c:return-after(.)]">
    <xsl:apply-templates select="*[last()]"/>
  </xsl:template>

</xsl:stylesheet>
