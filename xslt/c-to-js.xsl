<?xml version="1.0" encoding="UTF-8"?>
<!--
  Translates C to JS, given C as XML from c-to-xml.ts.

  Usage: npx xslt3 -xsl:xslt/c-to-js.xsl -s:file.xml -o:file.js

  THE XML

  Each tree-sitter node is an element named after its type, and a node in one of its parent's fields has a field
  attribute. Operators are <token> elements, and everything else (other punctuation, whitespace, comments' text)
  is text. So the text of the XML is exactly the C source. For example, `f(&buf);` is:

    <expression_statement><call_expression><identifier field="function">f</identifier><argument_list
      field="arguments">(<pointer_expression><token field="operator">&amp;</token><identifier
      field="argument">buf</identifier></pointer_expression>)</argument_list></call_expression>;</expression_statement>

  HOW XSLT PROCESSES IT

  Processing starts at the root, and for each node it visits, XSLT runs the template whose match pattern fits that
  node best. If no template matches, the default here (on-no-match="text-only-copy") outputs text nodes as they
  are, and visits an element's children in order. So with no templates at all, the output is the C, unchanged.

  A template outputs whatever it contains: literal text, the values of {expressions} (in xsl:text), and the result
  of <xsl:apply-templates select="..."/>, which visits the selected nodes in the same way. Selecting nothing (or
  having an empty template) drops a node and everything in it.

  XPATH IN BRIEF

    *[@field = 'body']        the child element in the body field
    $x/following-sibling::*   elements after $x with the same parent (also: preceding-sibling, ancestor, ...)
    $x//identifier            identifier elements anywhere inside $x (descendant::identifier is the same)
    (a, b)                    a sequence: a, then b
    $xs ! f(.)                f applied to each item of $xs
    x => f()                  f(x)
    [1], [last()]             the first, last
-->
<xsl:stylesheet version="3.0" expand-text="yes"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:c="urn:c-to-js"
  exclude-result-prefixes="#all">

  <xsl:output method="text"/>
  <xsl:mode on-no-match="text-only-copy"/>

  <!--
    1. A FIXED PATTERN

    a->b is a.b. In the XML, a->b is:
      <field_expression><identifier field="argument">a</identifier><token field="operator">-&gt;</token><field_identifier
        field="field">b</field_identifier></field_expression>
  -->

  <!-- Matches the -> token in a field_expression, and outputs . instead -->
  <xsl:template match="field_expression/token[@field = 'operator'][. = '->']">.</xsl:template>

  <!--
    2. DECLARATORS, HOWEVER DEEP

    A function keeps only its name and its parameters' names, and a declaration's types are replaced with let.

    In C, the name being declared is wrapped in declarators that make it a pointer, array or function: e.g.
    `char **items` is <pointer_declarator> containing <pointer_declarator> containing <identifier>items</identifier>.
    However deep the wrapping, the name is the declarator's first identifier.
  -->

  <xsl:function name="c:name" as="xs:string">
    <xsl:param name="declarator" as="element()"/>
    <!-- The first identifier element, in document order, that is $declarator itself or anywhere inside it -->
    <xsl:sequence select="string($declarator/descendant-or-self::identifier[1])"/>
  </xsl:function>

  <!-- bool
       describeAggregates(const char *pattern, bool verbose)
       {...}

     is:

       <function_definition><primitive_type field="type">bool</primitive_type>
       <function_declarator field="declarator"><identifier field="declarator">describeAggregates</identifier><parameter_list
         field="parameters">(<parameter_declaration>...<pointer_declarator field="declarator">*<identifier ...>pattern</identifier>
         </pointer_declarator></parameter_declaration>, <parameter_declaration>...</parameter_declaration>)</parameter_list></function_declarator>
       <compound_statement field="body">{...}</compound_statement></function_definition>

     and becomes:

       function describeAggregates(pattern, verbose)
       {...}
  -->
  <xsl:template match="function_definition">
    <!-- The function_declarator, which has the function's name and parameters (and may be inside a pointer_declarator,
         if the function returns a pointer) -->
    <xsl:variable name="signature" select="descendant::function_declarator[1]"/>
    <!-- Each parameter's declarator: e.g. the <pointer_declarator> holding pattern, and the <identifier> verbose -->
    <xsl:variable name="params" select="$signature/*[@field = 'parameters']/parameter_declaration/*[@field = 'declarator']"/>
    <xsl:text>function {c:name($signature)}({string-join($params ! c:name(.), ', ')})</xsl:text>
    <!-- Continue with the whitespace before the body (the newline before {), then the body itself -->
    <xsl:apply-templates select="*[@field = 'body']/(preceding-sibling::node()[1], .)"/>
  </xsl:template>

  <!-- const char *a, *b = "x";

     is:

       <declaration><type_qualifier>const</type_qualifier> <primitive_type field="type">char</primitive_type> <pointer_declarator
         field="declarator">*<identifier ...>a</identifier></pointer_declarator>, <init_declarator field="declarator"><pointer_declarator
         field="declarator">*<identifier ...>b</identifier></pointer_declarator> = <string_literal field="value">"<string_content>x</string_content>"</string_literal></init_declarator>;</declaration>

     and becomes:

       let a, b = "x";
  -->
  <xsl:template match="declaration">
    <!-- The first declarator: here, the pointer_declarator *a -->
    <xsl:variable name="first" select="*[@field = 'declarator'][1]"/>
    <xsl:text>let </xsl:text>
    <!-- Continue with the first declarator and everything after it (skipping the types before it): here, *a, then
         the text `, `, then the init_declarator *b = "x", then the text `;` -->
    <xsl:apply-templates select="$first, $first/following-sibling::node()"/>
  </xsl:template>

  <!-- *a or a[10]: output only the declarator within, e.g. the identifier a (so dropping the * and the [10]) -->
  <xsl:template match="pointer_declarator | array_declarator">
    <xsl:apply-templates select="*[@field = 'declarator']"/>
  </xsl:template>

  <!--
    3. CONTEXT

    A statement that only frees memory goes, along with the whitespace before it. That includes an if statement whose
    body only frees memory (and whose condition has no side effects), e.g. `if (x) PQclear(res);`.
  -->

  <xsl:variable name="freeing-functions" select="'free', 'pg_free', 'PQclear', 'termPQExpBuffer', 'destroyPQExpBuffer', 'printTableCleanup'"/>

  <!-- Does a node only free memory? It does if it's:
         - an expression_statement whose call_expression's function name is in $freeing-functions, e.g. `free(x);`, or
         - an if_statement with no else, whose condition contains no calls, assignments, increments or decrements, and whose
           consequence (its body) only frees memory -->
  <xsl:function name="c:is-freeing" as="xs:boolean">
    <xsl:param name="statement" as="node()"/>
    <xsl:sequence select="exists($statement/self::expression_statement/call_expression/*[@field = 'function'][. = $freeing-functions])
      or exists($statement/self::if_statement[not(*[@field = 'alternative'])]
        [not(*[@field = 'condition']//(call_expression | assignment_expression | update_expression))]
        [c:is-freeing(*[@field = 'consequence'])])"/>
  </xsl:function>

  <!-- A statement that only frees memory: output nothing -->
  <xsl:template match="(expression_statement | if_statement)[c:is-freeing(.)]"/>

  <!-- The text just before such a statement, e.g. `{` plus a newline and indent: output it without its trailing
       whitespace, so that the deleted statement doesn't leave a blank line -->
  <xsl:template match="text()[following-sibling::node()[1][c:is-freeing(.)]]">{replace(., '\s+$', '')}</xsl:template>

  <!--
    4. SIBLING AXES

    If a label at the top level of a function is followed only by frees and a return, then `goto label;` is that
    return, and the label itself goes. For example:

      if (!res)
        goto error_return;
      ...
      return true;

    error_return:
      termPQExpBuffer(&buf);
      return false;

    becomes:

      if (!res)
        return false;
      ...
      return true;

      return false;

    A labelled statement's label and statement are both inside it, so error_return: and the termPQExpBuffer(&buf);
    after it are:

      <labeled_statement><statement_identifier field="label">error_return</statement_identifier>:
        <expression_statement><call_expression>...</call_expression>;</expression_statement></labeled_statement>

    The statements after that are the labeled_statement's following siblings.
  -->

  <!-- The return that goto $label can become, if there is one -->
  <xsl:function name="c:return-after" as="element(return_statement)?">
    <xsl:param name="label" as="element(labeled_statement)?"/>
    <!-- The statement inside the labeled_statement, then the elements that follow it, except comments and frees -->
    <xsl:variable name="rest" select="($label/*[last()], $label/following-sibling::*)[not(self::comment or c:is-freeing(.))]"/>
    <!-- $rest, if it's a single return_statement, and $label's parent (a compound_statement) is a function body -->
    <xsl:sequence select="$rest[self::return_statement][count($rest) = 1][$label/../parent::function_definition]"/>
  </xsl:function>

  <!-- The labeled_statement that a goto_statement goes to: the one in the same function with the same label -->
  <xsl:function name="c:label" as="element(labeled_statement)?">
    <xsl:param name="goto" as="element(goto_statement)"/>
    <xsl:sequence select="$goto/ancestor::function_definition//labeled_statement[*[@field = 'label'] = $goto/*[@field = 'label']]"/>
  </xsl:function>

  <!-- A goto that can become a return: output the return_statement instead, by continuing with it (it's
       elsewhere in the function, but that doesn't matter) -->
  <xsl:template match="goto_statement[c:label(.) => c:return-after()]">
    <xsl:apply-templates select="c:label(.) => c:return-after()"/>
  </xsl:template>

  <!-- The label of such a goto: continue only with the statement inside it (dropping `error_return:` and the
       whitespace and comments around it). That statement only frees memory, so it outputs nothing too. -->
  <xsl:template match="labeled_statement[c:return-after(.)]">
    <xsl:apply-templates select="*[last()]"/>
  </xsl:template>

</xsl:stylesheet>
