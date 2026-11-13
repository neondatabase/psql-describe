<?xml version="1.0" encoding="UTF-8"?>
<!--
  Reading C as XML: simple XSLT functions shared by add-types.xsl and c-to-js.xsl

  * See code-to-xml.ts for an explanation of the XML input we're processing.
  * The parts of a node are mostly its children in fields: e.g. `*[@field = 'function']` is a function being called.
  * Remember that XPath indexes count from 1, so `[1]` means the first match.
-->
<stylesheet version="3.0" expand-text="yes"
  xmlns="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:c="urn:c-to-js">

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

  <!-- Is a type an array? -->
  <function name="c:is-array-type" as="xs:boolean">
    <param name="type" as="xs:string?"/>
    <sequence select="ends-with($type, '[]')"/>
  </function>

  <!-- Is a type a pointer (or array)? -->
  <function name="c:is-pointer-type" as="xs:boolean">
    <param name="type" as="xs:string?"/>
    <sequence select="c:is-array-type($type) or ends-with($type, '*')"/>
  </function>

</stylesheet>
