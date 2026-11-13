<?xml version="1.0" encoding="UTF-8"?>
<!--
  WHAT WE TRANSLATE

  We translate only the C that the runtime needs: its entry points, which are the names it uses but doesn't provide
  (now just HandleSlashCmds), and the functions and global variables they use, and those that those use, and so on.

  That includes exec_command, which calls a function for each backslash command, in a chain of if statements such as
  `else if (cmd[0] == 'd') status = exec_command_d(...);`. We want only some commands, and the branches for others go
  (with everything only they would reach).
-->
<stylesheet
  version="3.0"
  expand-text="yes"
  xmlns="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:c="urn:c-to-js"
  exclude-result-prefixes="#all">

  <param name="entry-points" select="distinct-values($runtime-doc//identifier)[not(. = $provided)]"/>
  <param name="commands" select="
    'exec_command_d',
    'exec_command_help',
    'exec_command_list',
    'exec_command_lo',
    'exec_command_sf_sv',
    'exec_command_slash_command_help',
    'exec_command_z'
  "/>

  <!-- The branches that go: in exec_command, those that set status to the result of a call to a function that isn't
       one of $commands -->
  <variable name="dropped-branches" select="
    key('definition', 'exec_command', $sources)//if_statement
      /*[@field = 'consequence'][assignment_expression[*[@field = 'left'] = 'status']
      /*[@field = 'right']/self::call_expression[not(*[@field = 'function'] = $commands)]]"/>

  <!-- An if statement whose branch goes is replaced by what comes after its else, if anything -->
  <template match="if_statement[*[@field = 'consequence'] intersect $dropped-branches]">
    <apply-templates select="c:inner(*[@field = 'alternative'])"/>
  </template>

  <!-- Is this a node in C that isn't translated, so that the names in it don't count? It is if it's in a dropped branch, a
       statement that only frees memory or an array allocation (see memory.xsl), or an array's size in a declarator (see syntax.xsl) -->
  <function name="c:is-dropped" as="xs:boolean">
    <param name="node" as="node()"/>
    <sequence select="
      exists($node/ancestor-or-self::* intersect $dropped-branches)
      or exists($node/ancestor-or-self::*[
        c:is-freeing(.)
        or c:is-array-allocation(.)
        or @field = 'size' and parent::array_declarator
      ])"/>
  </function>

  <!--
    * FOLLOWING NAMES FROM THE ENTRY POINTS
  -->

  <!-- An index of top-level definitions by name: of functions, and of global variables (declarations, other than
       those of functions, and those that are extern, which say that a variable is defined elsewhere) -->
  <key name="definition" match="
    translation_unit/function_definition
    | translation_unit/declaration[not(.//function_declarator)][not(storage_class_specifier = 'extern')]"
    use="c:defined-names(.)"/>

  <!-- The names a definition defines: a function's name, or the names of the variables in a declaration -->
  <function name="c:defined-names" as="xs:string*">
    <param name="definition" as="element()"/>
    <sequence select="
      if ($definition/self::function_definition) then c:function-name($definition)
      else $definition/*[@field = 'declarator'] ! c:name(.)"/>
  </function>

  <!-- The definitions reached so far, plus the definitions of every name they mention, and so on, until there are no
       more. (Like except, | treats nodes as a set, so a definition is never included twice.) -->
  <function name="c:reached" as="element()*">
    <param name="found" as="element()*"/>
    <!-- The definitions of the names of all identifiers anywhere in $found, other than names the runtime provides,
         names in C that isn't translated, and names we've already got -->
    <variable name="new" select="
      key('definition', $found//identifier[not(. = $provided)][exists(key('definition', ., $sources))][not(c:is-dropped(.))], $sources)
      except $found"/>
    <sequence select="
      if (exists($new)) then c:reached($found | $new)
      else $found"/>
  </function>

  <!-- The definitions to translate: those reached from the entry points (other than those the runtime provides) -->
  <variable name="translated" select="c:reached(key('definition', $entry-points[not(. = $provided)], $sources))"/>

  <!-- The externals: names that the translation uses, but that are neither declared in it, nor translated, nor
       provided by the runtime, nor constants (see runtime.xsl), apart from names in C that isn't translated, and
       snprintf (see syntax.xsl). There should be none. (A name declared in a function has a declared attribute such
       as describeAggregates.pattern, with a dot.) -->
  <variable name="externals" select="distinct-values(
    $translated//identifier
      [not(contains(@declared, '.'))]
      [not(. = ($provided, $translated ! c:defined-names(.), $constants/*[@field = 'name']))]
      [not(. = 'snprintf' and ../self::call_expression[c:is-statement(.)])]
      [not(c:is-dropped(.))]
  )"/>

</stylesheet>
