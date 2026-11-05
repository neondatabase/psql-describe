<?xml version="1.0" encoding="UTF-8"?>
<!--
  Adds C types to C as XML from c-to-xml.ts, for c-to-js.xsl. The output is the same XML, plus type attributes, so
  its text is still exactly the (preprocessed) C source.

  Usage: npx xslt3 -xsl:xslt/add-types.xsl -s:sources.xml -o:typed.xml

  (For how XSLT works, and XPath in brief, see the comments at the top of c-to-js.xsl.)

  WHAT IT DOES

  Some of c-to-js.xsl's rules depend on the C types of expressions, or on which declaration a name refers to. So we
  copy the whole document, giving each expression in a function a type attribute, where we can work out its type,
  and each identifier a declared attribute, naming its declaration. For example, if pattern is a parameter of
  describeAggregates, declared as `const char *pattern`, then `if (pattern)` becomes:

    <if_statement>if <parenthesized_expression field="condition">(<identifier type="char*"
      declared="describeAggregates.pattern">pattern</identifier>)...

  and c-to-js.xsl's rules then just test the attributes, e.g. identifier[@type = 'char*'].

  A type is written as its base type (char, int, struct PQExpBufferData, ...), with const if it's declared const,
  followed by what the declarators make of it, in the order C would write them: * for a pointer, [] for an array, ()
  for a function. So `char *s` is char*, `const char *s` is const char*, `char *s[10]` (an array of char*) is
  char*[], and `char *f(int i)` (a function returning char*) is char*(). A typedef is replaced by what it stands
  for, so `PQExpBuffer buf` is struct PQExpBufferData*.

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
      and tableinfo's type is struct describeOneTableDetails.tableinfo (section 3).
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

  <!-- Copy everything, adding the types of elements in functions (if they have one) -->
  <mode on-no-match="shallow-copy"/>

  <template match="function_definition//*">
    <copy>
      <for-each select="c:type(.)"><attribute name="type" select="."/></for-each>
      <apply-templates select="@*, node()"/>
    </copy>
  </template>

  <!-- A parameter declaration, e.g. `const char *pattern`, or just `const char *` in a prototype, gets the type it
       declares, wherever it is (so that c-to-js.xsl can see what a function's parameters are) -->
  <template match="parameter_declaration" priority="1">
    <copy>
      <for-each select="c:parameter-type(.)"><attribute name="type" select="."/></for-each>
      <apply-templates select="@*, node()"/>
    </copy>
  </template>

  <!-- A struct (or union) definition gets its type, e.g. struct printTableOpt, and each of its fields' declarators
       gets the type it declares, wherever they are (so that c-to-js.xsl can see what a struct contains) -->
  <template match="(struct_specifier | union_specifier)[*[@field = 'body']]" priority="1">
    <copy>
      <attribute name="type" select="c:struct-type(.)"/>
      <apply-templates select="@*, node()"/>
    </copy>
  </template>

  <template match="field_declaration/*[@field = 'declarator']" priority="1">
    <copy>
      <for-each select="c:declared-type(.)"><attribute name="type" select="."/></for-each>
      <apply-templates select="@*, node()"/>
    </copy>
  </template>

  <!-- An identifier in a function, or the name of a global variable (not one in its value), gets its type, and the
       name of its declaration (see c:declaration-name, in section 2), from the declarator that declares it -->
  <template match="function_definition//identifier | translation_unit/declaration//identifier[not(ancestor::*[@field = 'value'])]"
    priority="1">
    <variable name="declarator" select="c:declarator(.)"/>
    <copy>
      <for-each select="c:declared-type($declarator)"><attribute name="type" select="."/></for-each>
      <for-each select="$declarator ! c:declaration-name(.)"><attribute name="declared" select="."/></for-each>
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

  <!-- (e): the type of e, the one child element other than the ( and ) tokens (and any comments) -->
  <template mode="type" match="parenthesized_expression" as="xs:string?">
    <sequence select="c:type(*[not(self::token | self::comment)])"/>
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
      else c:qualified-base-type($descriptor)"/>
  </template>

  <!-- s.f or p->f: the type that f is declared with, in the struct that's the type of s, or that p points to -->
  <template mode="type" match="field_expression" as="xs:string?">
    <variable name="type" select="c:type(*[@field = 'argument'])"/>
    <variable name="struct" select="(if (token[@field = 'operator'] = '->') then c:pointee($type) else $type) ! replace(., '^const ', '')"/>
    <variable name="field" select="*[@field = 'field']"/>
    <!-- The struct's definition (see c:struct-name, below), then the declarator in it that declares $field -->
    <variable name="declarator" select="(key('struct', $struct, root())/*[@field = 'body']/field_declaration
      /*[@field = 'declarator'][c:name(.) = $field])[1]"/>
    <sequence select="c:declared-type($declarator)"/>
  </template>

  <!-- s++, s += n, and so on: the type of s -->
  <template mode="type" match="update_expression | assignment_expression" as="xs:string?">
    <sequence select="c:type((*[@field = ('argument', 'left')])[1])"/>
  </template>

  <!-- !x: int (C's boolean); -x, ~x: x's type -->
  <template mode="type" match="unary_expression" as="xs:string?">
    <sequence select="if (token[@field = 'operator'] = '!') then 'int' else c:type(*[@field = 'argument'])"/>
  </template>

  <!-- c ? a : b: the type of a and b, if they're known, and the same (so e.g. `c ? s : NULL` is s's type) -->
  <template mode="type" match="conditional_expression" as="xs:string?">
    <variable name="types" select="distinct-values(*[@field = ('consequence', 'alternative')] ! c:type(.))"/>
    <sequence select="$types[count($types) = 1]"/>
  </template>

  <!-- a op b. A comparison or logical operator gives an int (C's boolean), as does subtracting one pointer from
       another. Adding or subtracting a number to or from a pointer gives the pointer's type: e.g. char* for s + 1.
       Otherwise (for arithmetic on numbers whose types are known), double or float gives double, and anything else
       int (ignoring wider integer types). -->
  <template mode="type" match="binary_expression" as="xs:string?">
    <variable name="operator" select="string(token[@field = 'operator'])"/>
    <variable name="left" select="c:type(*[@field = 'left'])"/>
    <variable name="right" select="c:type(*[@field = 'right'])"/>
    <variable name="pointers" select="($left, $right)[c:is-pointer(.)]"/>
    <sequence select="
      if ($operator = ('==', '!=', '&lt;', '&lt;=', '&gt;', '&gt;=', '&amp;&amp;', '||')) then 'int'
      else if ($operator = '-' and count($pointers) = 2) then 'int'
      else if ($operator = ('+', '-') and count($pointers) = 1) then $pointers
      else if (exists($pointers) or empty($left) or empty($right)) then ()
      else if (($left, $right) = ('double', 'float')) then 'double'
      else 'int'"/>
  </template>

  <!-- Literals: e.g. int for 10, double for 1.5, char for 'x', bool for true, and size_t for sizeof(x) -->
  <template mode="type" match="number_literal" as="xs:string">
    <sequence select="if (matches(., '^0[xX]') or not(matches(., '[.eE]'))) then 'int' else 'double'"/>
  </template>

  <template mode="type" match="char_literal" as="xs:string">
    <sequence select="'char'"/>
  </template>

  <template mode="type" match="*[self::true or self::false]" as="xs:string">
    <sequence select="'bool'"/>
  </template>

  <template mode="type" match="sizeof_expression" as="xs:string">
    <sequence select="'size_t'"/>
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

  <!-- A name for the declaration that a declarator is in. Outside functions, names are unique, so it's just the name
       declared. In a function (other than the function's own name), it's the function's name plus the name declared:
       e.g. describeAggregates.pattern. If the function declares that name more than once (in different blocks), the
       second is e.g. describeFunctions.i#2, and so on. -->
  <function name="c:declaration-name" as="xs:string">
    <param name="declarator" as="element()"/>
    <variable name="local-name" select="c:local-name($declarator)"/>
    <!-- The declarators in the function with the same name, before this one -->
    <variable name="before" select="key('local', $local-name, root($declarator))[. &lt;&lt; $declarator]"/>
    <sequence select="if (empty($local-name)) then c:name($declarator)
      else $local-name || (if ($before) then '#' || count($before) + 1 else '')"/>
  </function>

  <!-- For a declarator in a function, the function's name plus the name declared, e.g. describeAggregates.pattern -->
  <function name="c:local-name" as="xs:string?">
    <param name="declarator" as="element()"/>
    <sequence select="$declarator[not(parent::function_definition)]/ancestor::function_definition
      ! (c:name(descendant::function_declarator[1]) || '.' || c:name($declarator))"/>
  </function>

  <!-- An index of the declarators in functions, by function name plus name declared -->
  <key name="local" match="function_definition//declaration/*[@field = 'declarator'] |
    function_definition//parameter_declaration/*[@field = 'declarator']" use="c:local-name(.)"/>

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
    <variable name="base" select="$declarator/.. ! c:qualified-base-type(.)"/>
    <variable name="suffixes" as="xs:string*"><apply-templates mode="suffix" select="$path"/></variable>
    <sequence select="$base ! (. || string-join($suffixes))"/>
  </function>

  <!-- The base type in a declaration (or parameter, field, typedef or type descriptor, as in a cast), with const
       if it has that qualifier, e.g. const char for `const char *s` -->
  <function name="c:qualified-base-type" as="xs:string?">
    <param name="declaration" as="element()"/>
    <sequence select="c:base-type($declaration/*[@field = 'type']) ! (if ($declaration/type_qualifier = 'const') then 'const ' || . else .)"/>
  </function>

  <!-- A parameter's type: its declarator's type, or if it has none (e.g. `int` in a prototype), its base type -->
  <function name="c:parameter-type" as="xs:string?">
    <param name="parameter" as="element(parameter_declaration)"/>
    <sequence select="if ($parameter/*[@field = 'declarator']) then $parameter/*[@field = 'declarator'] => c:declared-type()
      else c:qualified-base-type($parameter)"/>
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

  <!-- A struct or union: e.g. struct printTableOpt, or union PGresAttValue (see c:struct-type, below) -->
  <template mode="base-type" match="struct_specifier | union_specifier" as="xs:string">
    <sequence select="c:struct-type(.)"/>
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

  <!-- A struct's type: struct (or union), plus its name -->
  <function name="c:struct-type" as="xs:string">
    <param name="struct" as="element()"/>
    <sequence select="substring-before(local-name($struct), '_') || ' ' || c:struct-name($struct)"/>
  </function>

  <!-- An index of struct (and union) definitions, by type -->
  <key name="struct" match="(struct_specifier | union_specifier)[*[@field = 'body']]" use="c:struct-type(.)"/>

  <!--
    * TYPES AS STRINGS
  -->

  <!-- Is a type a pointer (or array)? -->
  <function name="c:is-pointer" as="xs:boolean">
    <param name="type" as="xs:string?"/>
    <sequence select="matches($type, '(\*|\[\])$')"/>
  </function>

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
