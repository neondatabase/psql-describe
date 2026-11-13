<?xml version="1.0" encoding="UTF-8"?>
<!--
  STRUCT COPIES

  Assigning a C struct copies it, but assigning a JS object doesn't. So `printQueryOpt myopt = pset.popt;` is
  myopt = { ...pset.popt }. A C struct also contains its structs and arrays, which need copying too: so a struct
  type with some has a function that does that, which is output after everything else, e.g.

    function copy_printQueryOpt(s) {
      return { ...s, topt: copy_printTableOpt(s.topt) };
    }

  To know what a struct contains, add-types.xsl gives each struct definition its type, and each field declarator
  the type it declares.
-->
<stylesheet version="3.0" expand-text="yes"
  xmlns="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:c="urn:c-to-js">

  <!-- An index of struct definitions, by type, e.g. struct printTableOpt -->
  <key name="struct" match="(struct_specifier | union_specifier)[@type]" use="@type"/>

  <!-- The declarators of a struct type's fields, e.g. for `char *a, *b;`, the pointer_declarators *a and *b (whose
       names are their field_identifiers: see c:name, in c-syntax.xsl) -->
  <function name="c:fields" as="element()*">
    <param name="type" as="xs:string?"/>
    <sequence select="key('struct', $type, $sources)[1]/*[@field = 'body']/field_declaration/*[@field = 'declarator']"/>
  </function>

  <!-- Does a type need copying, along with the struct it's in? It does if it's a struct, or an array (other than a
       string, which can't change) -->
  <function name="c:is-copied-type" as="xs:boolean">
    <param name="type" as="xs:string?"/>
    <sequence select="c:is-struct-type($type) or (c:is-array-type($type) and not(c:is-string-type($type)))"/>
  </function>

  <!-- A copy of $js, a value of type $type: [...js] for an array (unless it's a string), and for a struct,
       { ...js }, or if it contains structs or arrays, e.g. copy_printQueryOpt(js) -->
  <function name="c:copy" as="xs:string">
    <param name="js" as="xs:string"/>
    <param name="type" as="xs:string?"/>
    <sequence select="if (c:is-array-type($type) and not(c:is-string-type($type))) then '[...' || $js || ']'
      else if (not(c:is-struct-type($type))) then $js
      else if (empty(c:nested-copies($type))) then '{ ...' || $js || ' }'
      else c:copier-name($type) || '(' || $js || ')'"/>
  </function>

  <!-- For a struct type, copies of the fields of s that need copying, e.g. topt: copy_printTableOpt(s.topt) -->
  <function name="c:nested-copies" as="xs:string*">
    <param name="type" as="xs:string?"/>
    <sequence select="c:fields($type)[c:is-copied-type(@type)] ! (c:name(.) || ': ' || c:copy('s.' || c:name(.), @type))"/>
  </function>

  <!-- The name of a struct type's copy function, e.g. copy_printQueryOpt -->
  <function name="c:copier-name" as="xs:string">
    <param name="type" as="xs:string"/>
    <sequence select="'copy_' || replace(replace($type, '^(struct|union) ', ''), '\W', '_')"/>
  </function>

  <!-- A struct type's copy function -->
  <function name="c:copier" as="xs:string">
    <param name="type" as="xs:string"/>
    <sequence select="'function ' || c:copier-name($type) || '(s) {&#10;  return { ...s, ' || string-join(c:nested-copies($type), ', ') || ' };&#10;}'"/>
  </function>

  <!-- Can an expression be copied? It can if it's a variable, field or array element (not e.g. a function's result,
       which is already new), and has no side effects -->
  <function name="c:is-copyable" as="xs:boolean">
    <param name="expr" as="element()?"/>
    <sequence select="exists($expr[self::identifier | self::field_expression | self::subscript_expression][not(c:has-side-effects(.))]
      | $expr/self::parenthesized_expression ! c:inner(.)[c:is-copyable(.)])"/>
  </function>

  <!-- If an element copies a struct, the struct's type: it does if it's a declarator (in a declaration) with a value,
       or an assignment, of a struct, where the value is copyable -->
  <function name="c:copied-type" as="xs:string?">
    <param name="node" as="element()"/>
    <sequence select="(
      $node/self::init_declarator[parent::declaration][*[@field = 'value'] => c:is-copyable()]/descendant-or-self::identifier[1],
      $node/self::assignment_expression[c:operator(.) = '='][*[@field = 'right'] => c:is-copyable()]/*[@field = 'left']
      )[c:is-struct(.)]/string(@type)"/>
  </function>

  <!-- The struct types that need a copy function: those copied in the definitions we translate, and those copied by
       those copy functions, and so on (like c:reached, in reach.xsl), that contain structs or arrays -->
  <variable name="copier-types" select="c:copier-types(distinct-values(
    $translated//(init_declarator | assignment_expression) ! c:copied-type(.)))[exists(c:nested-copies(.))]"/>

  <function name="c:copier-types" as="xs:string*">
    <param name="found" as="xs:string*"/>
    <variable name="new" select="distinct-values($found ! c:fields(.)[c:is-struct-type(@type)]/string(@type))[not(. = $found)]"/>
    <sequence select="if (exists($new)) then c:copier-types(($found, $new)) else $found"/>
  </function>

  <!-- A declarator copying a struct, e.g. myopt = pset.popt: myopt = { ...pset.popt } -->
  <template match="init_declarator[c:copied-type(.)]">
    <apply-templates select="*[@field = 'declarator']"/> = {c:copy(c:js(*[@field = 'value']), c:copied-type(.))}</template>

  <!-- An assignment copying a struct, e.g. a = b: a = { ...b } -->
  <template match="assignment_expression[c:copied-type(.)]">
    <apply-templates select="*[@field = 'left']"/> = {c:copy(c:js(*[@field = 'right']), c:copied-type(.))}</template>

</stylesheet>
