<?xml version="1.0" encoding="UTF-8"?>
<!--
  ASYNC FUNCTIONS

  The SQL query functions that the C calls are provided by the JS runtime, and return a Promise. A function that
  calls one of these, or calls a function that does (and so on), is async, and each call to it needs an await.
  Finding these works like following names from the entry points (see reach.xsl), but backwards: from callees
  to callers.
-->
<stylesheet
  version="3.0"
  expand-text="yes"
  xmlns="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:c="urn:c-to-js"
  exclude-result-prefixes="#all">

  <!-- Names of async functions the runtime provides, e.g. PSQLexec in `const PSQLexec = async (sql) => ...`, and
       PQexec in `async function PQexec(conn, query) { ... }`. (Without a runtime, there are none, so no awaits.) -->
  <variable name="provided-async" select="
    $runtime-statements/(
      self::function_declaration[token = 'async']/*[@field = 'name'],
      (self::lexical_declaration | self::variable_declaration)/variable_declarator
        [*[@field = 'value'][self::arrow_function | self::function_expression][token = 'async']]/*[@field = 'name']
    )"/>

  <!-- An index of function calls by the name of the function called -->
  <key name="call" match="call_expression" use="*[@field = 'function']"/>

  <!-- The async function names found so far, plus the names of the functions that call them, and so on, until there
       are no more -->
  <function name="c:async" as="xs:string*">
    <param name="found" as="xs:string*"/>
    <!-- The names of the functions containing calls to any of $found, except those we've already got, and those the
         runtime provides (which are async only if the runtime says so) -->
    <variable name="new" select="
      key('call', $found, $sources)/ancestor::function_definition ! c:function-name(.)[not(. = ($found, $provided))]"/>
    <sequence select="
      if (exists($new)) then c:async(distinct-values(($found, $new)))
      else $found"/>
  </function>

  <!-- This list gets used by the template that matches function_definition in syntax.xsl -->
  <variable name="async" select="c:async($provided-async)"/>

  <!-- A call to an async function, e.g. PSQLexec(buf.data): output await PSQLexec(buf.data). That's in parentheses
       if it's the function in another call, or what's accessed in f()->x or f()[i], since e.g. await f().x would
       mean await (f().x). This wraps what the call would otherwise output (inside != NULL, if that applies too: see
       the priorities in c-to-js.xsl). (An async function's definition gets async: see syntax.xsl.) -->
  <template match="call_expression[*[@field = 'function'] = $async]" priority="9">
    <choose>
      <when test="@field = 'function' or @field = 'argument' and (parent::field_expression | parent::subscript_expression)">(await <next-match/>)</when>
      <otherwise>await <next-match/></otherwise>
    </choose>
  </template>

</stylesheet>
