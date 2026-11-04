<?xml version="1.0" encoding="UTF-8"?>
<!--
  Adds C types to C as XML from c-to-xml.ts, for c-to-js.xsl. The output is the same XML, plus type attributes, so
  its text is still exactly the C source.

  Usage: npx xslt3 -xsl:xslt/add-types.xsl -s:sources.xml -o:typed.xml

  (For how XSLT works, and XPath in brief, see the comments at the top of c-to-js.xsl.)

  WHAT IT DOES

  Some of c-to-js.xsl's rules depend on the C types of expressions. So we copy the whole document, giving each
  expression in a function a type attribute, where we can work out its type. For example, if pattern is declared
  as `const char *pattern`, then `if (pattern)` becomes:

    <if_statement>if <parenthesized_expression field="condition">(<identifier type="char*">pattern</identifier>)...

  and c-to-js.xsl's rules then just test the attribute, e.g. identifier[@type = 'char*'].

  A type is written as its base type (char, int, a struct name, ...), followed by what the declarators make of it,
  in the order C would write them: * for a pointer, [] for an array, () for a function. So `char *s` is char*,
  `char *s[10]` (an array of char*) is char*[], and `char *f(int i)` (a function returning char*) is char*().
  A typedef is replaced by what it stands for, so `PQExpBuffer buf` is PQExpBufferData*.

  HOW

  There are three questions, each answered by a section below:

    1. What type does an expression have? That depends on what kind of expression it is: e.g. &x is a pointer to
       x's type. Each kind has a template, and for an identifier, we ask:
    2. Where is the name declared? We look in the enclosing scopes, and then in other files. Then:
    3. What type does that declaration give the name? A declaration has a type plus a declarator that names what's
       declared, and may make it a pointer, array or function. For example, `const char *pattern` is:

         <parameter_declaration>
           <type_qualifier>const</type_qualifier> 
           <primitive_type field="type">char</primitive_type>
           <pointer_declarator field="declarator">*<identifier field="declarator">pattern</identifier></pointer_declarator>
         </parameter_declaration>

       So pattern's type is the base type in the type field, char, plus * for the pointer_declarator: char*.

  For example, in describeOneTableDetails, tableinfo.reloftype gets type char* like this:

    - It's a field_expression, so its type is the type of the field reloftype in tableinfo's struct (section 1).
    - tableinfo is an identifier, so we look for its declaration (section 2), and find it in the function's body:
      `struct { ... char *reloftype; ... } tableinfo;`.
    - That declaration's type is a struct with no name, so it gets a made-up name, describeOneTableDetails.tableinfo,
      and that's tableinfo's type (section 3).
    - So we look up the struct with that name, and in it, find the declarator *reloftype. The base type in its
      declaration is char, and it's a pointer_declarator, so its type is char* (section 3 again).
-->
<stylesheet
  version="3.0"
  expand-text="yes"
  xmlns="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:c="urn:c-to-js"
  exclude-result-prefixes="#all">

  <output method="xml" indent="no"/>

  <!-- Copy everything, adding the types of elements in functions -->
  <mode on-no-match="shallow-copy"/>

  <template match="function_definition//*">
    <variable name="type" select="c:type(.)"/>
    <copy>
      <if test="exists($type)"><attribute name="type" select="$type"/></if>
      <apply-templates select="@*, node()"/>
    </copy>
  </template>

  <!--
    * 1. WHAT TYPE DOES AN EXPRESSION HAVE?
    Each kind of expression has a template in mode "type", below. Other elements (e.g. statements) have no type.
  -->

  <mode name="type" on-no-match="deep-skip"/>

  <function name="c:type" as="xs:string?">
    <param name="expr" as="element()?"/>
    <apply-templates mode="type" select="$expr"/>
  </function>

  <!-- A variable, parameter or function: the type it's declared with (see sections 2 and 3) -->
  <template mode="type" match="identifier" as="xs:string?">
    <sequence select="c:declarator(.) => c:declared-type()"/>
  </template>

  <!-- A string literal, e.g. "abc" or "abc" "def" -->
  <template mode="type" match="string_literal | concatenated_string" as="xs:string">
    <sequence select="'char*'"/>
  </template>

  <!-- (e): the type of e, the one child element (other than any comments: the parentheses themselves are text) -->
  <template mode="type" match="parenthesized_expression" as="xs:string?">
    <sequence select="c:type(*[not(self::comment)])"/>
  </template>

  <!-- &x: a pointer to x's type -->
  <template mode="type" match="pointer_expression[token = '&amp;']" as="xs:string?">
    <sequence select="c:type(*[@field = 'argument']) => c:pointer-to()"/>
  </template>

  <!-- *p or p[i]: the type that p points to -->
  <template mode="type" match="pointer_expression[token = '*'] | subscript_expression" as="xs:string?">
    <sequence select="c:type(*[@field = 'argument']) => c:pointee()"/>
  </template>

  <!-- f(...): the type that f returns -->
  <template mode="type" match="call_expression" as="xs:string?">
    <sequence select="c:type(*[@field = 'function']) => c:return-type()"/>
  </template>

  <!-- (char *) x: the type in the parentheses, which is a type_descriptor, with a type and maybe a declarator (here,
       an abstract_pointer_declarator) -->
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
    <!-- The struct's definition (see c:struct-name, below), then the declarator in it that declares $field -->
    <variable name="declarator" select="(key('struct', $struct, root())/*[@field = 'body']/field_declaration
      /*[@field = 'declarator'][c:name(.) = $field])[1]"/>
    <sequence select="c:declared-type($declarator)"/>
  </template>

  <!--
    * 2. WHERE IS A NAME DECLARED?
  -->

  <!-- The element in a declarator that has its name: e.g. the identifier in `char **items`, or (in a typedef) the
       type_identifier in `typedef PQExpBufferData *PQExpBuffer`, or (in a struct) the field_identifier in
       `char *data`. However deep the wrapping, it's the first of these, in document order, that's $declarator itself
       or anywhere inside it. -->
  <function name="c:id" as="element()?">
    <param name="declarator" as="element()?"/>
    <sequence select="$declarator/descendant-or-self::*[self::identifier | self::type_identifier | self::field_identifier][1]"/>
  </function>

  <function name="c:name" as="xs:string">
    <param name="declarator" as="element()"/>
    <sequence select="string(c:id($declarator))"/>
  </function>

  <!-- An index of the declarators in declarations outside functions (e.g. in headers), and in function definitions,
       by name -->
  <key name="global" match="declaration[not(ancestor::function_definition)]/*[@field = 'declarator'] |
    function_definition/*[@field = 'declarator']" use="c:name(.)"/>

  <!-- The declarator that declares an identifier, if there is one -->
  <function name="c:declarator" as="element()?">
    <param name="id" as="element(identifier)"/>
    <!-- The declarations in each enclosing element that's a scope: in a block, its declarations; in a for loop, its
         initializer; and in a function, its parameters -->
    <variable name="declarations" select="$id/ancestor::*/(
        self::compound_statement/declaration,
        self::for_statement/declaration,
        self::function_definition/descendant::function_declarator[1]/*[@field = 'parameters']/parameter_declaration)"/>
    <!-- Of their declarators, the last one with the right name. Inner scopes come later in the document, so that's
         the one from the innermost scope. -->
    <variable name="local" select="($declarations/*[@field = 'declarator'][c:name(.) = $id])[last()]"/>
    <!-- If there's no local declaration, the first global one -->
    <variable name="global" select="key('global', $id, root($id))[1]"/>
    <sequence select="($local, $global)[1]"/>
  </function>

  <!--
    * 3. WHAT TYPE DOES A DECLARATION GIVE?
  -->

  <!-- The type that a declarator declares: the base type in the declaration (or parameter, field, typedef or cast),
       plus a suffix for each declarator from here to the name -->
  <function name="c:declared-type" as="xs:string?">
    <param name="declarator" as="element()?"/>
    <variable name="id" select="c:id($declarator)"/>
    <!-- The declarators from here down to the name: e.g. for `*s[10]`, the pointer_declarator, then the
         array_declarator. (A cast's declarator has no name, e.g. `(char *) x`, so then it's all of them.) -->
    <variable name="path" select="if ($id) then $declarator/descendant-or-self::* intersect $id/ancestor::*
      else $declarator/descendant-or-self::*"/>
    <variable name="base" select="$declarator/../*[@field = 'type'] => c:base-type()"/>
    <variable name="suffixes" as="xs:string*"><apply-templates mode="suffix" select="$path"/></variable>
    <sequence select="$base ! (. || string-join($suffixes))"/>
  </function>

  <!-- The suffix for each kind of declarator (and abstract declarator, in a cast). Others, such as the
       init_declarator in `char *s = NULL`, have none. -->
  <mode name="suffix" on-no-match="deep-skip"/>

  <template mode="suffix" match="pointer_declarator | abstract_pointer_declarator" as="xs:string">
    <sequence select="'*'"/>
  </template>

  <template mode="suffix" match="array_declarator | abstract_array_declarator" as="xs:string">
    <sequence select="'[]'"/>
  </template>

  <template mode="suffix" match="function_declarator | abstract_function_declarator" as="xs:string">
    <sequence select="'()'"/>
  </template>

  <!-- The type named by the type part of a declaration. The cases are templates in mode base-type, below. -->
  <mode name="base-type"/>

  <function name="c:base-type" as="xs:string?">
    <param name="type" as="element()?"/>
    <apply-templates mode="base-type" select="$type"/>
  </function>

  <!-- E.g. char (in `const char`) or unsigned int: the type's own text -->
  <template mode="base-type" match="*" as="xs:string">
    <sequence select="normalize-space(.)"/>
  </template>

  <!-- An enum: int -->
  <template mode="base-type" match="enum_specifier" as="xs:string">
    <sequence select="'int'"/>
  </template>

  <!-- A struct or union: its name (see c:struct-name, below) -->
  <template mode="base-type" match="struct_specifier | union_specifier" as="xs:string">
    <sequence select="c:struct-name(.)"/>
  </template>

  <!-- An index of typedefs, by name -->
  <key name="typedef" match="type_definition" use="*[@field = 'declarator'] ! c:name(.)"/>

  <!-- A name defined by a typedef, e.g. PQExpBuffer: the type that the typedef declares, e.g. PQExpBufferData* for
       `typedef PQExpBufferData *PQExpBuffer` -->
  <template mode="base-type" match="type_identifier[key('typedef', ., root())]" as="xs:string?">
    <variable name="name" select="."/>
    <variable name="typedef" select="key('typedef', $name, root())[1]"/>
    <sequence select="$typedef/*[@field = 'declarator'][c:name(.) = $name] => c:declared-type()"/>
  </template>

  <!-- A struct's name: its tag, if it has one (`struct printTableOpt {...}`), or else the name a typedef gives it
       (`typedef struct {...} printTableOpt`), or else a made-up name: the name of what it's declared in (a function,
       another struct, or else a file), plus the name it's declared as. So `struct {...} tableinfo;`, in the function
       describeOneTableDetails, is describeOneTableDetails.tableinfo. -->
  <function name="c:struct-name" as="xs:string">
    <param name="struct" as="element()"/>
    <variable name="tag" select="$struct/*[@field = 'name']"/>
    <variable name="typedef-names" select="$struct/parent::type_definition/*[@field = 'declarator'] ! c:name(.)"/>
    <variable name="owner" select="$struct/ancestor::*[self::function_definition | self::struct_specifier | self::union_specifier][1]"/>
    <variable name="owner-name" select="
      if ($owner/self::function_definition) then c:name($owner/descendant::function_declarator[1])
      else if ($owner) then c:struct-name($owner)
      else tokenize($struct/ancestor::translation_unit/@file, '/')[last()]"/>
    <variable name="made-up" select="$owner-name || '.' || ($struct/../*[@field = 'declarator'])[1] ! c:name(.)"/>
    <sequence select="string(($tag, $typedef-names, $made-up)[1])"/>
  </function>

  <!-- An index of struct (and union) definitions, by name -->
  <key name="struct" match="(struct_specifier | union_specifier)[*[@field = 'body']]" use="c:struct-name(.)"/>

  <!--
    * TYPES AS STRINGS
  -->

  <!-- A pointer to a type: e.g. char* for char -->
  <function name="c:pointer-to" as="xs:string?">
    <param name="type" as="xs:string?"/>
    <sequence select="$type ! (. || '*')"/>
  </function>

  <!-- What a pointer or array type points to: e.g. char for char*, and char* for char*[] -->
  <function name="c:pointee" as="xs:string?">
    <param name="type" as="xs:string?"/>
    <sequence select="$type[matches(., '(\*|\[\])$')] ! replace(., '(\*|\[\])$', '')"/>
  </function>

  <!-- What a function type returns: e.g. char* for char*(). Also for a pointer to a function: char* for char*()*. -->
  <function name="c:return-type" as="xs:string?">
    <param name="type" as="xs:string?"/>
    <sequence select="$type[matches(., '\(\)\*?$')] ! replace(., '\(\)\*?$', '')"/>
  </function>

</stylesheet>
