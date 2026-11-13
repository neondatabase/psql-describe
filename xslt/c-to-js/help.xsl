<?xml version="1.0" encoding="UTF-8"?>
<!--
  THE \? TEXT

  The \? text is the lines of slashUsage (in help.c) for the commands we have. It goes with the constants (see
  runtime.xsl). To find which commands we have, we follow each command's name as psql would: through the if-else chain
  in exec_command, which calls the function for it, and on into that function, if it's passed the name. A command is
  one we have if every function its branch calls is translated or provided by the runtime, and isn't one the runtime
  declares unsupported, e.g. `do_lo_export = unsupported('lo_export')`.
-->
<stylesheet version="3.0" expand-text="yes"
  xmlns="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:c="urn:c-to-js">

  <!-- Suppressed (unsupported) lines -->
  <variable name="suppressed-commands" select="'\\? options', '\\? variables'"/>

  <!-- The names the runtime declares unsupported -->
  <variable name="unsupported" select="$runtime-statements/(self::lexical_declaration | self::variable_declaration)/variable_declarator
    [*[@field = 'value']/self::call_expression/*[@field = 'function'] = 'unsupported']/*[@field = 'name']"/>

  <!-- The functions we have: those provided, translated, or freeing memory (which goes: see memory.xsl), but not
       those unsupported -->
  <variable name="available" select="($provided, $translated ! c:defined-names(.),
    $freeing-functions)[not(. = $unsupported)]"/>

  <!--
    * EVALUATING CONDITIONS
  -->

  <!-- The text inside a C string or char literal's quotes, e.g. `\\d[Sx+]` (escapes as they are), or the texts
       inside each of the literals in a concatenated string -->
  <function name="c:literal-text" as="xs:string">
    <param name="literal" as="element()"/>
    <sequence select="string-join($literal/descendant-or-self::*[self::string_literal | self::char_literal]
      /*[not(self::token)])"/>
  </function>

  <!-- The value of a string expression, given that the variable $var holds the command name $name: for `cmd`, $name,
       and for `cmd + 3`, $name after its first 3 characters (or nothing, if it's some other expression) -->
  <function name="c:command-string" as="xs:string?">
    <param name="expr" as="element()"/>
    <param name="var" as="xs:string"/>
    <param name="name" as="xs:string"/>
    <sequence select="if ($expr/self::identifier = $var) then $name
      else $expr/self::binary_expression[c:operator(.) = '+'][*[@field = 'left']/self::identifier = $var]
        /*[@field = 'right']/self::number_literal ! substring($name, xs:integer(.) + 1)"/>
  </function>

  <!-- Whether a condition is true, given that $var holds $name: true(), false(), or () if we can't tell. We can tell for
       comparisons of the name (or part of it) with strcmp, strncmp, pg_strcasecmp or pg_strncasecmp, or of one of its
       characters with ==, and for !, && and || on those -->
  <function name="c:test" as="xs:boolean?">
    <param name="condition" as="element()"/>
    <param name="var" as="xs:string"/>
    <param name="name" as="xs:string"/>
    <variable name="op" select="c:operator($condition)"/>
    <variable name="left" select="$condition/*[@field = 'left']"/>
    <variable name="right" select="$condition/*[@field = 'right']"/>
    <choose>
      <when test="$condition/self::parenthesized_expression">
        <sequence select="c:test(c:inner($condition), $var, $name)"/>
      </when>
      <when test="$condition/self::unary_expression[$op = '!']">
        <sequence select="c:test($condition/*[@field = 'argument'], $var, $name) ! not(.)"/>
      </when>
      <when test="$op = ('&amp;&amp;', '||')">
        <variable name="tests" select="(c:test($left, $var, $name), c:test($right, $var, $name))"/>
        <variable name="decisive" select="$op = '||'"/>  <!-- true decides ||, false decides && -->
        <sequence select="if ($tests = $decisive) then $decisive else if (count($tests) = 2) then not($decisive) else ()"/>
      </when>
      <when test="$op = ('==', '!=') and $left/self::call_expression[*[@field = 'function']
        = ('strcmp', 'strncmp', 'pg_strcasecmp', 'pg_strncasecmp')] and $right = '0'">
        <variable name="function" select="string($left/*[@field = 'function'])"/>
        <variable name="args" select="c:arguments($left)"/>
        <variable name="a" select="c:command-string($args[1], $var, $name)"/>
        <variable name="b" select="$args[2][self::string_literal] ! c:literal-text(.)"/>
        <variable name="n" select="if (contains($function, 'strn')) then xs:integer($args[3]) else 10000"/>
        <variable name="case" select="if (contains($function, 'case')) then lower-case#1 else string#1"/>
        <sequence select="if (exists($a) and exists($b))
          then ($case(substring($a, 1, $n)) = $case(substring($b, 1, $n))) = ($op = '==') else ()"/>
      </when>
      <when test="$op = ('==', '!=') and $left/self::subscript_expression[*[@field = 'argument'] = $var]
        [*[@field = 'index']/self::number_literal] and $right/self::char_literal">
        <sequence select="(substring($name, xs:integer($left/*[@field = 'index']) + 1, 1) = c:literal-text($right))
          = ($op = '==')"/>
      </when>
    </choose>
  </function>

  <!--
    * FOLLOWING A COMMAND
  -->

  <!-- Whether we have a command (named $name, held by the variable $var in $function): we do if the first if statement
       whose condition is true (and isn't in the body of one whose condition is false) calls only functions we have,
       and we have it in any of those that it passes $var to. If no condition is true, we do. -->
  <function name="c:has-command" as="xs:boolean">
    <param name="function" as="element(function_definition)"/>
    <param name="var" as="xs:string"/>
    <param name="name" as="xs:string"/>
    <variable name="ifs" select="$function//if_statement[*[@field = 'condition']//identifier = $var]"/>
    <variable name="branch" select="$ifs[c:test(*[@field = 'condition'], $var, $name)]
      [not(ancestor::*[@field = 'consequence']/parent::if_statement[c:test(*[@field = 'condition'], $var, $name) = false()])]
      [1]/*[@field = 'consequence']"/>
    <sequence select="every $call in $branch//call_expression satisfies c:call-has-command($call, $var, $name)"/>
  </function>

  <!-- Whether we have a command, as far as a call is concerned: we do if we have the function called, and if it's
       passed $var and translated, we have the command there (where $var is the parameter it's passed as) -->
  <function name="c:call-has-command" as="xs:boolean">
    <param name="call" as="element(call_expression)"/>
    <param name="var" as="xs:string"/>
    <param name="name" as="xs:string"/>
    <variable name="callee" select="string($call/*[@field = 'function'])"/>
    <variable name="position" select="index-of(c:arguments($call) ! string(.), $var)[1]"/>
    <variable name="definition" select="$translated[self::function_definition][c:function-name(.) = $callee]"/>
    <sequence select="$callee = $available and (empty($position) or empty($definition)
      or c:has-command($definition, c:name(c:parameters($definition)[$position]/*[@field = 'declarator']), $name))"/>
  </function>

  <!--
    * THE TEXT
  -->

  <!-- The \? text, as a JS expression: slashUsage's lines (as they're added to its buffer: `HELP0("...")` is
       `appendPQExpBufferStr(&buf, _("..."))`, after preprocessing), grouped into sections, each a title, lines, and a
       blank line. A line for a command, e.g. `  \\d[Sx+] ...`, stays if we have the command (here, d), and a section
       stays if any of its commands does. -->
  <function name="c:slash-usage" as="xs:string">
    <variable name="exec-command" select="key('definition', 'exec_command', $sources)"/>
    <variable name="var" select="c:name(c:parameters($exec-command)[1]/*[@field = 'declarator'])"/>
    <variable name="lines" select="key('definition', 'slashUsage', $sources)
      //call_expression[*[@field = 'function'] = '_']/*[@field = 'arguments']/*[self::string_literal | self::concatenated_string]"/>
    <variable name="kept" as="element()*">
      <for-each-group select="$lines" group-starting-with="*[matches(c:literal-text(.), '^[^ \\]')]">
        <variable name="commands" select="current-group()[matches(c:literal-text(.), '^  \\\\')]"/>
        <variable name="have" select="
          $commands
          [c:has-command($exec-command, $var, replace(c:literal-text(.), '^  \\\\([^\s\[{]+).*', '$1', 's'))]
          [not(some $prefix in $suppressed-commands satisfies starts-with(normalize-space(c:literal-text(.)), $prefix))]"/>
        <sequence select="if (exists($have)) then current-group() except ($commands except $have) else ()"/>
      </for-each-group>
    </variable>
    <sequence select="string-join($kept/descendant-or-self::string_literal ! ('&quot;' || c:literal-text(.) || '&quot;'), ' +&#10;  ')"/>
  </function>

</stylesheet>
