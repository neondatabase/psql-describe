<?xml version="1.0" encoding="UTF-8"?>
<!--
  WHAT'S THE SAME, APART FROM SYNTAX

  Much of C is JS already, given that the default outputs C as it is (see c-to-js.xsl). Here's what's the same apart
  from its syntax: functions, declarations, a->b, and so on.
-->
<stylesheet version="3.0" expand-text="yes"
  xmlns="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:c="urn:c-to-js">

  <!--
    * FUNCTIONS AND DECLARATIONS

    A function keeps only its name and its parameters' names, and a declaration's types are replaced with let. (The
    name in a declarator is c:name, in c-syntax.xsl.)
  -->

  <!-- `bool describeAggregates(const char *pattern, bool verbose)` becomes: `[async] function describeAggregates(pattern, verbose)` -->
  <template match="function_definition">
    <variable name="comment" select="preceding-sibling::*[1][self::comment]"/>
    <variable name="name" select="c:function-name(.)"/>
    <!-- Each parameter's declarator: e.g. the <pointer_declarator> holding pattern, and the <identifier> verbose -->
    <variable name="params" select="c:parameters(.)/*[@field = 'declarator']"/>
    <text>{$comment}&#10;{if ($name = $async) then 'async ' else ''}function {$name}({string-join($params ! c:name(.), ', ')})</text>
    <!-- Continue with the whitespace before the body (the newline before {), then the body itself -->
    <apply-templates select="*[@field = 'body']/(preceding-sibling::node()[1], .)"/>
    <text>&#10;&#10;</text>
  </template>

  <!-- `const char *a, *b = "x";` becomes: `let a, b = "x";` -->
  <template match="declaration">
    <!-- The first declarator: here, the pointer_declarator *a -->
    <variable name="first" select="*[@field = 'declarator'][1]"/>
    <text>let </text>
    <!-- Continue with the first declarator and everything after it (skipping the types before it): here, *a, then
         the text `, `, then the init_declarator *b = "x", then the text `;` -->
    <apply-templates select="$first, $first/following-sibling::node()"/>
  </template>

  <!-- A global variable's declaration, like a function's definition, comes after its comment (if any), and before a
       blank line -->
  <template match="translation_unit/declaration">
    <text>{preceding-sibling::*[1][self::comment]}&#10;</text>
    <next-match/>
    <text>&#10;&#10;</text>
  </template>

  <!-- *a or a[10]: output only the declarator within, e.g. the identifier a (so dropping the * and the [10]) -->
  <template match="pointer_declarator | array_declarator">
    <apply-templates select="*[@field = 'declarator']"/>
  </template>

  <!--
    * EXPRESSIONS

    a->b is a.b. In the XML, a->b is:

      <field_expression>
        <identifier field="argument">a</identifier>
        <token field="operator">-&gt;</token>
        <field_identifier field="field">b</field_identifier>
      </field_expression>
  -->

  <!-- Matches the -> token in a field_expression, and outputs . instead -->
  <template match="field_expression/token[@field = 'operator'][. = '->']">.</template>

  <!-- Explicitly concatenate adjacent string literals -->
  <template match="concatenated_string/string_literal[following-sibling::string_literal]">
    <next-match/><text> +</text>
  </template>

  <!-- {a, b, c}, an array's initial value, is [a, b, c]: the { and } tokens in the initializer_list become [ and ] -->
  <template match="initializer_list/token[. = '{']">[</template>
  <template match="initializer_list/token[. = '}']">]</template>

  <!-- (type) x: just x -->
  <template match="cast_expression">
    <apply-templates select="*[@field = 'value']"/>
  </template>

  <!-- snprintf(buf, size, format, ...), as a statement: buf = sprintf(format, ...) -->
  <template match="call_expression[*[@field = 'function'] = 'snprintf'][c:is-statement(.)]">
    <variable name="arguments" select="c:arguments(.)"/>
    <text>{c:js($arguments[1])} = sprintf(</text>
    <apply-templates select="$arguments[3], $arguments[3]/following-sibling::node()"/>
  </template>

  <!--
    * ABOUT EXPRESSIONS
    For the rules here and in the files that follow.
  -->

  <!-- An expression's JS, as an operand of an operator (or of .slice(...), and so on): in parentheses, unless it's a
       simple expression -->
  <function name="c:operand" as="xs:string">
    <param name="expr" as="element()"/>
    <sequence select="c:operand($expr, c:js($expr))"/>
  </function>

  <!-- The same, given the JS, e.g. from next-match -->
  <function name="c:operand" as="xs:string">
    <param name="expr" as="element()"/>
    <param name="js" as="xs:string"/>
    <sequence select="if ($expr/(self::identifier | self::field_expression | self::subscript_expression | self::call_expression |
      self::parenthesized_expression | self::string_literal)) then $js else '(' || $js || ')'"/>
  </function>

  <!-- Does an expression have side effects (so that it can't be repeated, e.g. in s = s.slice(1))? -->
  <function name="c:has-side-effects" as="xs:boolean">
    <param name="expr" as="element()"/>
    <sequence select="exists($expr/descendant-or-self::*[self::call_expression | self::assignment_expression | self::update_expression])"/>
  </function>

  <!-- Is an expression's value unused? It is if it's a statement, a for loop's update, or either side of a comma
       expression whose value is unused -->
  <function name="c:is-statement" as="xs:boolean">
    <param name="expr" as="element()"/>
    <sequence select="exists($expr/parent::expression_statement | $expr[@field = 'update']/parent::for_statement)
      or exists($expr/parent::comma_expression[c:is-statement(.)])"/>
  </function>

  <!--
    * SETTING VARIABLES
    A variable is set by an assignment (p = ...) or by a declaration with a value (char *p = ...).
  -->

  <!-- The variable that an assignment or declarator sets, if any: e.g. p in p = ... (but not *p = ... or p += ...) or
       char *p = ... -->
  <function name="c:set-variable" as="element(identifier)?">
    <param name="set" as="element()"/>
    <sequence select="$set/self::assignment_expression[c:operator(.) = '=']/*[@field = 'left']/self::identifier,
      $set/self::init_declarator/*[@field = 'declarator']/descendant-or-self::identifier[1]"/>
  </function>

  <!-- The value that an assignment or declarator sets its variable to -->
  <function name="c:value" as="element()?">
    <param name="set" as="element()?"/>
    <sequence select="$set/*[@field = ('right', 'value')]"/>
  </function>

  <!-- The assignment or declarator that sets an identifier, if it's the variable that one sets -->
  <function name="c:setter" as="element()?">
    <param name="id" as="element(identifier)"/>
    <sequence select="($id/parent::assignment_expression, $id/ancestor::init_declarator[1])[c:set-variable(.) is $id]"/>
  </function>

  <!-- Is an identifier the variable that an assignment or declarator sets? -->
  <function name="c:is-set" as="xs:boolean">
    <param name="id" as="element(identifier)"/>
    <sequence select="exists(c:setter($id))"/>
  </function>

  <!-- The assignments and declarators that set a variable, in its function -->
  <function name="c:sets" as="element()*">
    <param name="var" as="element(identifier)?"/>
    <sequence select="$var/ancestor::function_definition//(assignment_expression | init_declarator)
      [c:set-variable(.)/@declared = $var/@declared]"/>
  </function>

  <!-- The assignment or declarator that last set a variable before $node -->
  <function name="c:last-set" as="element()?">
    <param name="var" as="element(identifier)?"/>
    <param name="node" as="node()"/>
    <sequence select="c:sets($var)[. &lt;&lt; $node][last()]"/>
  </function>

  <!-- Is a variable set after $after and before $before? -->
  <function name="c:is-set-between" as="xs:boolean">
    <param name="var" as="element(identifier)"/>
    <param name="after" as="node()?"/>
    <param name="before" as="node()"/>
    <sequence select="exists(c:sets($var)[. >> $after][. &lt;&lt; $before])"/>
  </function>

</stylesheet>
