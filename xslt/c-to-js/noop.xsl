<?xml version="1.0" encoding="UTF-8"?>
<!--
  NO-OP FUNCTIONS

  Various psql functions become pass-through no-ops, and these names are all assigned a single `noop` function
  in the JS runtime. Here we identify and comment them out, saving a (very) few bytes and processor cycles. For
  example, `gettext_noop("Schema")` becomes `/* gettext_noop */("Schema")`. esbuild will remove the redundant
  parentheses during build.

  Only functions with a single argument are safe to change. With no arguments, we'd get a JS syntax error: `()`.
  With multiple arguments, the expression value would be different.
-->
<stylesheet version="3.0" expand-text="yes"
  xmlns="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:c="urn:c-to-js">
  
  <!-- Identify all names that get assigned the `noop` function as their value, such as `gettext_noop` -->
  <variable
    name="noop-functions"
    select="$runtime-doc//variable_declarator/identifier[@field='name']
            [following-sibling::*[@field = 'value'][. = 'noop']]"/>
  
  <!-- Comment out all no-op function calls that have exactly one argument -->
  <template match="call_expression[count(c:arguments(.)) = 1]/identifier[@field = 'function'][. = $noop-functions]">/* <next-match/> */</template>

</stylesheet>
