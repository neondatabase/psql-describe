<?xml version="1.0" encoding="UTF-8"?>
<!--
  WHERE TYPES MAKE A DIFFERENCE

  Expressions have type attributes, added by add-types.xsl (e.g. <identifier type="char*">pattern</identifier>), and
  some C needs them to be translated: strings used as conditions, and integer division. The files that follow use
  them too.
-->
<stylesheet
  version="3.0"
  expand-text="yes"
  xmlns="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:c="urn:c-to-js"
  exclude-result-prefixes="#all">

  <!--
    * KINDS OF TYPE
  -->

  <!-- Is an expression a pointer (or array)? -->
  <function name="c:is-pointer" as="xs:boolean">
    <param name="expr" as="element()?"/>
    <sequence select="c:is-pointer-type($expr/@type)"/>
  </function>

  <!-- Is an expression an array? -->
  <function name="c:is-array" as="xs:boolean">
    <param name="expr" as="element()?"/>
    <sequence select="c:is-array-type($expr/@type)"/>
  </function>

  <!-- Is an expression a string (a pointer to or array of char, or const char)? -->
  <function name="c:is-string" as="xs:boolean">
    <param name="expr" as="element()"/>
    <sequence select="c:is-string-type($expr/@type)"/>
  </function>

  <function name="c:is-string-type" as="xs:boolean">
    <param name="type" as="xs:string?"/>
    <sequence select="matches($type, '^(const )?char(\*|\[\])$')"/>
  </function>

  <!-- Is an expression's type a struct (or union), e.g. struct PQExpBufferData, rather than e.g. a pointer to one? -->
  <function name="c:is-struct" as="xs:boolean">
    <param name="expr" as="element()"/>
    <sequence select="c:is-struct-type($expr/@type)"/>
  </function>

  <function name="c:is-struct-type" as="xs:boolean">
    <param name="type" as="xs:string?"/>
    <sequence select="matches($type, '^(struct|union) [^*()\[\]]+$')"/>
  </function>

  <!-- Is an expression a struct or an array (e.g. char*[]), which are objects in JS? -->
  <function name="c:is-object" as="xs:boolean">
    <param name="expr" as="element()"/>
    <sequence select="c:is-struct($expr) or c:is-array($expr)"/>
  </function>

  <!-- Is an expression an integer? (add-types.xsl makes every C integer type int or int64) -->
  <function name="c:is-int" as="xs:boolean">
    <param name="expr" as="element()"/>
    <sequence select="$expr/@type = ('int', 'int64')"/>
  </function>

  <!--
    * STRINGS AS CONDITIONS

    In C, a string (char *) used as a condition is true unless it's NULL. In JS, an empty string is false too. So a
    string used as a condition gets an explicit NULL test: `if (pattern)` becomes `if (pattern != NULL)`, and
    `if (!pattern)` becomes `if (pattern == NULL)`.
  -->

  <!-- Is an expression used as a condition? It is if it's the condition of an if, while or do (inside the
       parentheses), or of a for or ?:, or an operand of && or || -->
  <function name="c:is-condition" as="xs:boolean">
    <param name="expr" as="element()"/>
    <sequence select="exists(
      $expr/parent::parenthesized_expression[@field = 'condition'][parent::if_statement | parent::while_statement | parent::do_statement] |
      $expr[@field = 'condition'][parent::for_statement | parent::conditional_expression] |
      $expr[@field = ('left', 'right')]/parent::binary_expression[c:operator(.) = ('&amp;&amp;', '||')])"/>
  </function>

  <!-- A string used as a condition, e.g. the identifier in `if (pattern)`: output it, plus != NULL. The string may
       match other templates too (e.g. an async call): next-match outputs what the best of those would output (so
       this template's priority is higher than theirs). -->
  <template match="*[c:is-string(.)][c:is-condition(.)]" priority="10">
    <variable name="js"><next-match/></variable>
    <text>{c:operand(., $js)} != NULL</text>
  </template>

  <!-- !s, where s is a string, e.g. in `if (!pattern)`: output s == NULL instead, in parentheses unless it's itself
       a condition (so `if (!pattern)` becomes `if (pattern == NULL)`, but `x = !pattern` becomes
       `x = (pattern == NULL)`) -->
  <template match="unary_expression[c:operator(.) = '!'][*[@field = 'argument'] => c:is-string()]">
    <variable name="test">{c:operand(*[@field = 'argument'])} == NULL</variable>
    <value-of select="if (c:is-condition(.)) then $test else '(' || $test || ')'"/>
  </template>

  <!--
    * INTEGER DIVISION
  -->

  <!-- `a / b`, where a and b are integers, becomes `Math.trunc(a / b)`
       (see formatPGVersionNumber) -->
  <template
    match="binary_expression
      [c:operator(.) = '/']
      [c:is-int(*[@field = 'left'])]
      [c:is-int(*[@field = 'right'])]"
    priority="10"
  >
    <text>Math.trunc(</text>
    <next-match/>
    <text>)</text>
  </template>

  <!--
    * WHAT JS NUMBERS CAN'T DO

    A JS number is exact for integers up to 2^53, which is enough for C's integers, other than those of 64 bits. And
    JS's bitwise operators work on 32-bit signed integers, so they would differ from C's for an unsigned int with its
    top bit set, or a 64-bit integer. None of these are in the C we translate, but a new Postgres version could add
    some, so they're reported, like the externals (see reach.xsl), for porting by hand.
  -->

  <!-- The C that JS numbers can't do: 64-bit integers, and bitwise operators (other than in C that isn't translated,
       and inside others of these, which are reported already) -->
  <variable name="number-hazards" select="let $hazards := $translated//(*[@type = 'int64']
      | binary_expression[c:operator(.) = ('&amp;', '|', '^', '&lt;&lt;', '&gt;&gt;')] | unary_expression[c:operator(.) = '~']
      | assignment_expression[c:operator(.) = ('&amp;=', '|=', '^=', '&lt;&lt;=', '&gt;&gt;=')])[not(c:is-dropped(.))]
    return $hazards[not(ancestor::* intersect $hazards)]"/>

</stylesheet>
