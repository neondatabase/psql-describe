<?xml version="1.0" encoding="UTF-8"?>
<!--
  ASYNC FUNCTIONS

  Some functions that the C calls are provided by the JS runtime, and return a Promise: those that run queries. A
  function that calls one of these, or calls a function that does (and so on), is async, and each call to it needs an
  await. Finding these works like following names from the entry points (see reach.xsl), but backwards: from callees
  to callers.
-->
<stylesheet
  version="3.0"
  expand-text="yes"
  xmlns="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:c="urn:c-to-js"
  exclude-result-prefixes="#all">

  <param name="async-seeds" select="'PSQLexec', 'PQexec'"/>

  <!-- The names of the async functions the runtime provides, e.g. PSQLexec in `const PSQLexec = async (sql) => ...` -->
  <variable name="provided-async" select="$runtime-statements/(
    self::function_declaration[token = 'async']/*[@field = 'name'],
    (self::lexical_declaration | self::variable_declaration)/variable_declarator
      [*[@field = 'value'][self::arrow_function | self::function_expression][token = 'async']]/*[@field = 'name'])"/>

  <!-- An index of function calls by the name of the function called -->
  <key name="call" match="call_expression" use="*[@field = 'function']"/>

  <!-- The async function names found so far, plus the names of the functions that call them, and so on, until there
       are no more -->
  <function name="c:async" as="xs:string*">
    <param name="found" as="xs:string*"/>
    <!-- The names of the functions containing calls to any of $found, except those we've already got, and those the
         runtime provides (which are async only if the runtime says so) -->
    <variable name="new" select="key('call', $found, $sources)/ancestor::function_definition
      ! c:function-name(.)[not(. = ($found, $provided))]"/>
    <sequence select="if (exists($new)) then c:async(distinct-values(($found, $new))) else $found"/>
  </function>

  <variable name="async" select="c:async(distinct-values(($async-seeds, $provided-async)))"/>

  <!-- A call to an async function, e.g. PSQLexec(buf.data): output await PSQLexec(buf.data). That's in parentheses
       if it's the function in another call, or what's accessed in f()->x or f()[i], since e.g. await f().x would
       mean await (f().x). (An async function's definition gets async: see syntax.xsl.) -->
  <template match="call_expression[*[@field = 'function'] = $async]">
    <choose>
      <when test="@field = 'function' or @field = 'argument' and (parent::field_expression | parent::subscript_expression)">(await <apply-templates/>)</when>
      <otherwise>await <apply-templates/></otherwise>
    </choose>
  </template>

</stylesheet>
