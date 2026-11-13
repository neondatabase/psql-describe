<stylesheet
  version="3.0"
  expand-text="yes"
  xmlns="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:c="urn:c-to-js"
  exclude-result-prefixes="#all">
  
  <!-- Identify all names that get assigned the `noop` function as their value -->
  <variable
    name="noop-functions"
    select="$runtime-doc//variable_declarator/identifier[@field='name']
            [following-sibling::*[@field = 'value'][. = 'noop']]"/>
  
  <!-- Comment out all no-op functions with exactly one argument (esbuild will subsequently eliminate redundant parentheses) -->
  <template match="call_expression[count(c:arguments(.)) = 1]/identifier[@field = 'function'][. = $noop-functions]">/* <next-match/> */</template>

</stylesheet>
