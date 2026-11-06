<?xml version="1.0" encoding="UTF-8"?>
<!--
  INITIAL VALUES

  A C variable declared without a value is still something: a struct or array has its fields or elements (and a
  struct contains its structs and arrays), and a global variable is zero. So in JS, it starts with a value that's
  the same: e.g. `PQExpBufferData buf;` is `let buf = {};`, and `static bool restricted;` is
  `let restricted = false;`. A box (see pointers.xsl) starts as {}.
-->
<stylesheet
  version="3.0"
  expand-text="yes"
  xmlns="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:c="urn:c-to-js"
  exclude-result-prefixes="#all">

  <!-- The value that a variable declared without one starts with, if any: {} for a box; an array of n empty values for
       an array of n structs, e.g. [{}, {}, {}] for `PQExpBufferData buf[3]`; otherwise, the empty value of its type,
       if it has one; and otherwise, for a global variable, zero -->
  <function name="c:initial-value" as="xs:string?">
    <param name="id" as="element()"/>
    <variable name="size" select="$id/parent::array_declarator/*[@field = 'size']/self::number_literal"/>
    <variable name="element-type" select="substring-before($id/@type, '[]')"/>
    <sequence select="(
      if ($id/@declared = $boxed) then '{}'
      else if (exists($size) and c:is-struct-type($element-type))
        then '[' || string-join((1 to xs:integer($size)) ! c:empty-value($element-type), ', ') || ']'
      else c:empty-value($id/@type),
      $id[ancestor::declaration[1]/parent::translation_unit] ! c:zero-value(@type))[1]"/>
  </function>

  <!-- The empty value of a type: '' for a char array (which is a string), [] for another array, and for a struct, an
       object with the empty values of the fields that have them: e.g. { fieldSep: {}, recordSep: {} } for struct
       printTableOpt. Otherwise, none. -->
  <function name="c:empty-value" as="xs:string?">
    <param name="type" as="xs:string?"/>
    <variable name="fields" select="c:fields($type) ! (c:empty-value(@type) ! (c:name(..) || ': ' || .))"/>
    <sequence select="if (c:is-string-type($type) and c:is-array-type($type)) then &quot;''&quot;
      else if (c:is-array-type($type)) then '[]'
      else if (c:is-struct-type($type)) then (if (exists($fields)) then '{ ' || string-join($fields, ', ') || ' }' else '{}')
      else ()"/>
  </function>

  <!-- The zero value of a type: false for a bool, NULL for a pointer, and otherwise 0 -->
  <function name="c:zero-value" as="xs:string">
    <param name="type" as="xs:string?"/>
    <sequence select="if ($type = 'bool') then 'false' else if (ends-with($type, '*')) then 'NULL' else '0'"/>
  </function>

  <!-- A declarator without a value, e.g. buf in `PQExpBufferData buf;`: add its initial value, if it has one, so
       buf = {}. (next-match outputs the declarator as usual.) -->
  <template match="declaration/*[@field = 'declarator'][not(self::init_declarator)][exists(c:initial-value(c:id(.)))]">
    <next-match/><text> = {c:initial-value(c:id(.))}</text>
  </template>

</stylesheet>
