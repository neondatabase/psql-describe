<?xml version="1.0" encoding="UTF-8"?>
<!--
  Adds C types to C as XML from c-to-xml.ts, for c-to-js.xsl. The output is the same XML, plus type attributes, so
  its text is still exactly the C source.

  Usage: npx xslt3 -xsl:xslt/add-types.xsl -s:sources.xml -o:typed.xml

  (For how XSLT works, and XPath in brief, see the comments at the top of c-to-js.xsl.)
-->
<stylesheet
  version="3.0"
  expand-text="yes"
  xmlns="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:c="urn:c-to-js"
  exclude-result-prefixes="#all">

  <output method="xml" indent="no"/>

  <!--
    Some of c-to-js.xsl's rules depend on the C types of expressions. So before translating, we copy the whole
    document, giving each expression in a function a type attribute, where we can work out its type. For example, if pattern is declared as `const char *pattern`, then `if (pattern)` becomes:

      <if_statement>if <parenthesized_expression field="condition">(<identifier type="char*">pattern</identifier>)...

    and c-to-js.xsl's rules then just test the attribute, e.g. identifier[@type = 'char*'].

    A type is written as its base type (char, int, a struct name, ...), followed by what the declarators make of it,
    in the order C would write them: * for a pointer, [] for an array, () for a function. So `char *s` is char*,
    `char *s[10]` (an array of char*) is char*[], and `char *f(int i)` (a function returning char*) is char*().
    A typedef is replaced by what it stands for, so `PQExpBuffer buf` is PQExpBufferData*.
  -->

  <!-- Copy everything, adding the types of elements in functions -->
  <mode on-no-match="shallow-copy"/>

  <template match="function_definition//*">
    <variable name="type" select="c:type(.)"/>
    <copy>
      <if test="exists($type)"><attribute name="type" select="$type"/></if>
      <apply-templates select="@*, node()"/>
    </copy>
  </template>

  <!-- A declarator's name: e.g. the identifier in `char **items`, or (in a typedef) the type_identifier in
       `typedef PQExpBufferData *PQExpBuffer`, or (in a struct) the field_identifier in `char *data`. However deep
       the wrapping, it's the first of these, in document order, that's $declarator itself or anywhere inside it. -->
  <function name="c:id" as="element()?">
    <param name="declarator" as="element()?"/>
    <sequence select="$declarator/descendant-or-self::*[self::identifier | self::type_identifier | self::field_identifier][1]"/>
  </function>

  <function name="c:name" as="xs:string">
    <param name="declarator" as="element()"/>
    <sequence select="string(c:id($declarator))"/>
  </function>

  <!-- Indexes of typedefs, struct (and union) definitions, and declarations outside functions (including function
       definitions), by name -->
  <key name="typedef" match="type_definition" use="*[@field = 'declarator'] ! c:name(.)"/>
  <key name="struct" match="(struct_specifier | union_specifier)[*[@field = 'body']]" use="c:struct-name(.)"/>
  <key name="global" match="declaration[not(ancestor::function_definition)]/*[@field = 'declarator'] |
    function_definition/*[@field = 'declarator']" use="c:name(.)"/>

  <!-- The declarator that declares an identifier, if there is one. Each enclosing element that's a scope (a block,
       a for loop, a function, or a whole file) may declare names: in a block or file, in its declarations; in a for
       loop, in its initializer; and in a function, in its parameters. Inner scopes come later in the document, so
       the last matching declarator is from the innermost scope. If there isn't one, the name may be declared in
       another file (e.g. a header). -->
  <function name="c:declarator" as="element()?">
    <param name="id" as="element(identifier)"/>
    <variable name="declarations" select="$id/ancestor::*/(
        self::compound_statement/declaration,
        self::for_statement/declaration,
        self::function_definition/descendant::function_declarator[1]/*[@field = 'parameters']/parameter_declaration)"/>
    <sequence select="(($declarations/*[@field = 'declarator'][c:name(.) = $id])[last()], key('global', $id, root($id)))[1]"/>
  </function>

  <!-- The type that a declarator declares: the base type in the declaration (or parameter, field or typedef), plus a
       suffix for each declarator from here to the name, e.g. * for the pointer_declarator in `char *s`. (A cast's
       declarator has no name, e.g. the abstract_pointer_declarator in `(char *) x`, so then it's all of them.) -->
  <variable name="suffixes" select="map { 'pointer_declarator': '*', 'array_declarator': '[]', 'function_declarator': '()' }"/>

  <function name="c:declared-type" as="xs:string?">
    <param name="declarator" as="element()?"/>
    <variable name="id" select="c:id($declarator)"/>
    <variable name="path" select="if ($id) then $declarator/descendant-or-self::* intersect $id/ancestor::* else $declarator/descendant-or-self::*"/>
    <sequence select="$declarator/../*[@field = 'type'] ! (c:base-type(.) || string-join($path ! $suffixes(replace(local-name(), '^abstract_', ''))))"/>
  </function>

  <!-- The type named by the type part of a declaration: e.g. char for `const char`, int for an enum, and for a
       typedef'd name, the type the typedef declares -->
  <function name="c:base-type" as="xs:string">
    <param name="type" as="element()"/>
    <variable name="typedef" select="$type/self::type_identifier ! key('typedef', ., root(.))[1]"/>
    <sequence select="
      if ($type/(self::struct_specifier | self::union_specifier)) then c:struct-name($type)
      else if ($type/self::enum_specifier) then 'int'
      else if ($typedef) then $typedef/*[@field = 'declarator'][c:name(.) = $type] => c:declared-type()
      else normalize-space($type)"/>
  </function>

  <!-- A struct's name: its tag, if it has one (`struct printTableOpt {...}`), or else the name a typedef gives it
       (`typedef struct {...} printTableOpt`), or else (e.g. for `struct {...} tableinfo`) a unique made-up name -->
  <function name="c:struct-name" as="xs:string">
    <param name="struct" as="element()"/>
    <sequence select="string(($struct/*[@field = 'name'], $struct/parent::type_definition/*[@field = 'declarator'] ! c:name(.),
      'struct-' || generate-id($struct))[1])"/>
  </function>

  <!-- What a pointer or array type points to: e.g. char for char*, and char* for char*[] -->
  <function name="c:pointee" as="xs:string?">
    <param name="type" as="xs:string?"/>
    <sequence select="$type[matches(., '(\*|\[\])$')] ! replace(., '(\*|\[\])$', '')"/>
  </function>

  <!-- The type of an expression. The cases are templates in mode type, below. -->
  <mode name="type" on-no-match="deep-skip"/>

  <function name="c:type" as="xs:string?">
    <param name="expr" as="element()?"/>
    <apply-templates mode="type" select="$expr"/>
  </function>

  <!-- A variable, parameter or function: the type it's declared with -->
  <template mode="type" match="identifier" as="xs:string?">
    <sequence select="c:declarator(.) => c:declared-type()"/>
  </template>

  <!-- A string literal, e.g. "abc" or "abc" "def" -->
  <template mode="type" match="string_literal | concatenated_string" as="xs:string">
    <sequence select="'char*'"/>
  </template>

  <!-- (e): the type of e -->
  <template mode="type" match="parenthesized_expression" as="xs:string?">
    <sequence select="c:type(*[not(self::comment)][1])"/>
  </template>

  <!-- &x: a pointer to x's type -->
  <template mode="type" match="pointer_expression[token = '&amp;']" as="xs:string?">
    <sequence select="c:type(*[@field = 'argument']) ! (. || '*')"/>
  </template>

  <!-- *p or p[i]: the type that p points to -->
  <template mode="type" match="pointer_expression[token = '*'] | subscript_expression" as="xs:string?">
    <sequence select="c:type(*[@field = 'argument']) => c:pointee()"/>
  </template>

  <!-- f(...): the type that f returns, i.e. f's type without the () (and the * if f is a pointer to a function) -->
  <template mode="type" match="call_expression" as="xs:string?">
    <sequence select="c:type(*[@field = 'function'])[matches(., '\(\)\*?$')] ! replace(., '\(\)\*?$', '')"/>
  </template>

  <!-- (char *) x: the type in the parentheses -->
  <template mode="type" match="cast_expression" as="xs:string?">
    <variable name="descriptor" select="*[@field = 'type']"/>
    <sequence select="if ($descriptor/*[@field = 'declarator']) then $descriptor/*[@field = 'declarator'] => c:declared-type()
      else $descriptor/*[@field = 'type'] => c:base-type()"/>
  </template>

  <!-- s.f or p->f: the type that f is declared with, in the struct that's the type of s, or that p points to -->
  <template mode="type" match="field_expression" as="xs:string?">
    <variable name="type" select="c:type(*[@field = 'argument'])"/>
    <variable name="struct" select="if (token[@field = 'operator'] = '->') then c:pointee($type) else $type"/>
    <variable name="field" select="*[@field = 'field']"/>
    <sequence select="(key('struct', $struct, root())/*[@field = 'body']/field_declaration
      /*[@field = 'declarator'][c:name(.) = $field])[1] => c:declared-type()"/>
  </template>

</stylesheet>
