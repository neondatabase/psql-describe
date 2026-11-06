<?xml version="1.0" encoding="UTF-8"?>
<!--
  Reading C as XML: functions shared by add-types.xsl and c-to-js.xsl, which include this.

  THE XML

  c-to-xml.ts writes C as a <sources> element, containing a <translation_unit file="..."> for each C file. Within
  that, each tree-sitter node is an element named after its type, and a node in one of its parent's fields has a field
  attribute. Unnamed tokens (punctuation, keywords, operators) are <token> elements, and the only text between
  elements is whitespace. So the text of the XML is exactly the C source (after preprocess.py). For example,
  `f(&buf);` is:

    <expression_statement>
      <call_expression>
        <identifier field="function">f</identifier>
        <argument_list field="arguments">
          <token>(</token>
          <pointer_expression>
            <token field="operator">&amp;</token>
            <identifier field="argument">buf</identifier>
          </pointer_expression>
          <token>)</token>
        </argument_list>
      </call_expression>
      <token>;</token>
    </expression_statement>

  So the parts of a node are mostly its children in fields: e.g. *[@field = 'function'] is the function called. The
  functions here get at the parts that aren't so simple.
-->
<stylesheet
  version="3.0"
  expand-text="yes"
  xmlns="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:c="urn:c-to-js"
  exclude-result-prefixes="#all">

  <!--
    * NAMES

    In C, the name being declared is wrapped in declarators that make it a pointer, array or function: e.g.
    `char **items` is <pointer_declarator> containing <pointer_declarator> containing <identifier>items</identifier>.
    However deep the wrapping, the name is the declarator's first identifier.
  -->

  <!-- The element in a declarator that has its name: e.g. the identifier in `char **items`, or (in a typedef) the
       type_identifier in `typedef PQExpBufferData *PQExpBuffer`, or (in a struct) the field_identifier in
       `char *data`. It's the first of these, in document order, that's $declarator itself or anywhere inside it. -->
  <function name="c:id" as="element()?">
    <param name="declarator" as="element()?"/>
    <sequence select="$declarator/descendant-or-self::*[self::identifier | self::type_identifier | self::field_identifier][1]"/>
  </function>

  <!-- The name a declarator declares -->
  <function name="c:name" as="xs:string">
    <param name="declarator" as="element()"/>
    <sequence select="string(c:id($declarator))"/>
  </function>

  <!-- A function's name: that of the (first) function_declarator in its definition, which may be inside a
       pointer_declarator, as in `char *f(int i)` -->
  <function name="c:function-name" as="xs:string">
    <param name="definition" as="element(function_definition)"/>
    <sequence select="c:name($definition/descendant::function_declarator[1])"/>
  </function>

  <!-- A function's parameter declarations, given its definition or its function_declarator -->
  <function name="c:parameters" as="element(parameter_declaration)*">
    <param name="function" as="element()?"/>
    <sequence select="$function/descendant-or-self::function_declarator[1]/*[@field = 'parameters']/parameter_declaration"/>
  </function>

  <!--
    * PARTS
  -->

  <!-- An expression's operator, e.g. + or ++ -->
  <function name="c:operator" as="xs:string">
    <param name="expr" as="element()"/>
    <sequence select="string($expr/token[@field = 'operator'])"/>
  </function>

  <!-- The elements inside a node, other than tokens and comments: e.g. the expression in a parenthesized_expression,
       (e), or the statement in an else_clause -->
  <function name="c:inner" as="element()*">
    <param name="node" as="element()?"/>
    <sequence select="$node/*[not(self::token | self::comment)]"/>
  </function>

  <!-- A call's arguments -->
  <function name="c:arguments" as="element()*">
    <param name="call" as="element(call_expression)?"/>
    <sequence select="c:inner($call/*[@field = 'arguments'])"/>
  </function>

  <!--
    * TYPES

    add-types.xsl writes a type as a string: its base type, then * for a pointer, [] for an array, and () for a
    function, e.g. char*[] for an array of strings.
  -->

  <!-- Is a type a pointer (or array)? -->
  <function name="c:is-pointer-type" as="xs:boolean">
    <param name="type" as="xs:string?"/>
    <sequence select="matches($type, '(\*|\[\])$')"/>
  </function>

  <!-- Is a type an array? -->
  <function name="c:is-array-type" as="xs:boolean">
    <param name="type" as="xs:string?"/>
    <sequence select="ends-with($type, '[]')"/>
  </function>

</stylesheet>
