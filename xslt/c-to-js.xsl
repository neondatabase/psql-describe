<?xml version="1.0" encoding="UTF-8"?>
<!--
  Translates C to JS, given C as XML from c-to-xml.ts, with types added by add-types.xsl.

  Usage: npx xslt3 -xsl:xslt/c-to-js.xsl -s:typed.xml -o:describe.mjs runtime=/path/to/runtime.xml (see xslt/build.sh)
  Without a runtime, it outputs just the translation, of what you name, e.g. entry-points=HandleSlashCmds.

  THE XML

  The document is a <sources> element, containing a <translation_unit file="..."> for each C file. Within that, each
  tree-sitter node is an element named after its type, and a node in one of its parent's fields has a field
  attribute. Unnamed tokens (punctuation, keywords, operators) are <token> elements, and the only text between
  elements is whitespace. So the text of the XML is exactly the C source (after preprocess.py). For example,
  `f(&buf);` is:

    <expression_statement>
      <call_expression>
        <identifier field="function">f</identifier>
        <argument_list field="arguments">
          <token>(</token>
          <pointer_expression>
            <token field="operator">&amp;</token>
            <identifier field="argument">buf</identifier>
          </pointer_expression>
          <token>)</token>
        </argument_list>
      </call_expression>
      <token>;</token>
    </expression_statement>

  HOW XSLT PROCESSES IT

  Processing starts at the root, and for each node it visits, XSLT runs the template whose match pattern fits that
  node best. If no template matches, the default here (on-no-match="text-only-copy") outputs text nodes as they
  are, and visits an element's children in order. So with no templates at all, the output would be the C, unchanged.
  (In fact, the template for the root, below, visits only the functions we need.)

  A template outputs whatever it contains: literal text, the values of {expressions} (in text), and the result
  of <apply-templates select="..."/>, which visits the selected nodes in the same way. Selecting nothing (or
  having an empty template) drops a node and everything in it.

  XPATH IN BRIEF

    *[@field = 'body']        the child element in the body field
    $x/following-sibling::*   elements after $x with the same parent (also: preceding-sibling, ancestor, ...)
    $x//identifier            identifier elements anywhere inside $x (descendant::identifier is the same)
    (a, b)                    a sequence: a, then b
    $xs ! f(.)                f applied to each item of $xs
    x => f()                  f(x)
    [1], [last()]             the first, last
-->
<stylesheet
  version="3.0"
  expand-text="yes"
  xmlns="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:map="http://www.w3.org/2005/xpath-functions/map"
  xmlns:c="urn:c-to-js"
  exclude-result-prefixes="#all">

  <output method="text"/>
  <mode on-no-match="text-only-copy"/>

  <!-- The source document, so that functions can look things up in it -->
  <variable name="sources" select="/"/>

  <!--
    * FOLLOWING CALLS FROM THE ENTRY POINTS
    We translate only the C that the runtime uses (HandleSlashCmds), and (recursively) the functions and global
    variables that uses. That includes exec_command, which calls a function for each backslash command, in a chain of if statements such as
    `else if (cmd[0] == 'd') status = exec_command_d(...);`. We want only some commands, and the branches for others go
    (with everything only they would reach).
  -->

  <!-- The entry points: the names the runtime uses, but doesn't provide (see THE RUNTIME, below) -->
  <param name="entry-points" select="distinct-values($runtime-doc//identifier)[not(. = $provided)]"/>
  <param name="commands" select="'exec_command_d', 'exec_command_help', 'exec_command_list', 'exec_command_lo',
    'exec_command_sf_sv', 'exec_command_slash_command_help', 'exec_command_z'"/>

  <!-- The branches that go: in exec_command, those that set status to the result of a call to a function that isn't
       one of $commands -->
  <variable name="dropped-branches" select="key('definition', 'exec_command', $sources)//if_statement
    /*[@field = 'consequence'][assignment_expression[*[@field = 'left'] = 'status']
      /*[@field = 'right']/self::call_expression[not(*[@field = 'function'] = $commands)]]"/>

  <!-- An if statement whose branch goes is replaced by what comes after its else, if anything -->
  <template match="if_statement[*[@field = 'consequence'] intersect $dropped-branches]">
    <apply-templates select="*[@field = 'alternative']/*[not(self::token | self::comment)]"/>
  </template>

  <!-- An index of top-level definitions by name: of functions, and of global variables (declarations, other than
       those of functions, and those that are extern, which say that a variable is defined elsewhere) -->
  <key name="definition" match="translation_unit/function_definition
    | translation_unit/declaration[not(.//function_declarator)][not(storage_class_specifier = 'extern')]"
    use="c:defined-names(.)"/>

  <!-- The names a definition defines: a function's name, or the names of the variables in a declaration (see c:name,
       below) -->
  <function name="c:defined-names" as="xs:string*">
    <param name="definition" as="element()"/>
    <sequence select="if ($definition/self::function_definition) then c:name($definition/descendant::function_declarator[1])
      else $definition/*[@field = 'declarator'] ! c:name(.)"/>
  </function>

  <!-- The definitions reached so far, plus the definitions of every name they mention, and so on, until there are no
       more. (Like except, | treats nodes as a set, so a definition is never included twice.) -->
  <function name="c:reached" as="element()*">
    <param name="found" as="element()*"/>
    <!-- The definitions of the names of all identifiers anywhere in $found (other than names the runtime provides),
       except those we've already got -->
    <variable name="new" select="key('definition', ($found//identifier except $dropped-branches//identifier)[not(. = $provided)],
      $sources) except $found"/>
    <sequence select="if (exists($new)) then c:reached($found | $new) else $found"/>
  </function>

  <!-- The definitions to translate: those reached from the entry points (other than those the runtime provides) -->
  <variable name="translated" select="c:reached(key('definition', $entry-points[not(. = $provided)], $sources))"/>

  <!-- At the root: output the runtime, with the translation in place of its marker (or just the translation, if
       there's no runtime) -->
  <template match="/">
    <variable name="translation"><call-template name="translation"/></variable>
    <if test="exists($marker) and exists($externals)">
      <message select="'Not translated or provided by the runtime: ' || string-join($externals, ', ')"/>
    </if>
    <variable name="constants" select="($constants ! ('const ' || *[@field = 'name'] || ' = '
      || (if (self::preproc_def) then normalize-space(*[@field = 'value']) else c:enumerator-value(.)) || ';'),
      'const PG_VERSION = &quot;' || $version || '&quot;;',
      'const PG_MAJORVERSION = &quot;' || replace($version, '^([0-9]+).*', '$1') || '&quot;;',
      '&#10;const helpText =&#10;  ' || c:slash-usage() || ';')"/>
    <value-of select="if (exists($marker)) then string($runtime-doc)
      => replace(string($constants-marker), string-join($constants, '&#10;'), 'q') => replace(string($marker), $translation, 'q')
      else $translation"/>
  </template>

  <!-- The translation: the definitions reached from the entry points, in document order, then the functions that copy
       structs (see STRUCT COPIES, below) -->
  <template name="translation">
    <apply-templates select="$translated"/>
    <value-of select="$copier-types ! (c:copier(.) || '&#10;')" separator="&#10;"/>
    <!-- this more complex alternative only inserts a comment giving the file source -->
    <!-- <for-each-group select="$translated" group-adjacent="ancestor::translation_unit/@file">
      <text>/* from {tokenize(current-grouping-key(), '/')[last()]} */&#10;&#10;</text>
      <for-each select="current-group()">
        <apply-templates select="."/>
        <text>&#10;&#10;</text>
      </for-each>
    </for-each-group> -->
  </template>

  <!--
    * THE RUNTIME
    The translation goes in a hand-written JS runtime (runtime.mjs, as XML from c-to-xml.ts), in place of the comment
    /* TRANSLATED FROM C */. The runtime provides what C gets from elsewhere (e.g. PQExpBuffer functions, and
    PSQLexec), and its own versions of functions that we can't (or don't want to) translate. A name that's
    declared where the comment is (in any enclosing scope) is provided by the runtime, so it isn't translated.
  -->

  <param name="runtime" select="()"/>

  <variable name="runtime-doc" select="$runtime ! doc(.)"/>
  <variable name="marker" select="$runtime-doc//comment[. = '/* TRANSLATED FROM C */']"/>
  <variable name="constants-marker" select="$runtime-doc//comment[. = '/* CONSTANTS TRANSLATED FROM C */']"/>

  <!-- The names declared in a JS scope (a block or the whole program): by functions, classes, variables (including
       those in destructuring patterns, e.g. { a, b } = ...) and imports -->
  <function name="c:js-declared" as="xs:string*">
    <param name="scope" as="element()"/>
    <variable name="statements" select="$scope/(*, export_statement/*)"/>
    <sequence select="$statements/(self::function_declaration | self::class_declaration)/*[@field = 'name'],
      $statements/(self::lexical_declaration | self::variable_declaration)/variable_declarator/*[@field = 'name']
        /descendant-or-self::*[self::identifier | self::shorthand_property_identifier_pattern],
      $statements/self::import_statement//import_specifier/*[@field = ('alias', 'name')][last()]"/>
  </function>

  <!-- The names the runtime provides: those declared in the scopes enclosing the marker, and the parameters of the
       functions enclosing it (not counting default values, e.g. the `false` in echoHidden = false) -->
  <variable name="provided" select="distinct-values((
    $marker/ancestor::*[self::statement_block | self::program] ! c:js-declared(.),
    $marker/ancestor::*/*[@field = 'parameters']/descendant::identifier[not(ancestor::*[@field = 'right'])]))"/>

  <!-- The externals: names that the translated functions use, but that are neither declared in them, nor translated,
       nor provided by the runtime. (A name declared in a function has a declared attribute such as
       describeAggregates.pattern, with a dot.) Names in C that rules drop don't count: in dropped branches, statements
       that only free memory, array allocations, array sizes in declarations, and snprintf statements. -->
  <variable name="externals" select="
    let $reached := $translated return distinct-values(($reached//identifier except ($dropped-branches | $reached//(*[c:is-freeing(.)] | call_expression[*[@field = 'function'] = $array-allocators]
      | array_declarator/*[@field = 'size']))/descendant-or-self::identifier)
      [not(contains(@declared, '.'))]
      [not(. = 'snprintf' and ../self::call_expression[c:is-statement(.)])]
      [not(. = ($provided, $reached ! c:defined-names(.), $constants/*[@field = 'name']))])"/>

  <!--
    * CONSTANTS
    Constants used by the translated functions or by the runtime (and not declared by the runtime) are translated
    too, as consts: enum constants, and constants #defined in headers. They go in place of the runtime's comment
    /* CONSTANTS TRANSLATED FROM C */, at the top level, since the runtime may use them before the functions are
    declared. (In the C, pcpp has expanded the #defines already, but the runtime uses some, e.g. RELKIND_VIEW.)
  -->

  <!-- An index of enum constants by name, e.g. OT_NORMAL in `enum slash_option_type { OT_NORMAL, ... }` -->
  <key name="enumerator" match="enumerator" use="*[@field = 'name']"/>

  <!-- An index of #defines of constants, by name: those whose value is a single number, character or string literal,
       e.g. `#define RELKIND_VIEW 'v'` (tree-sitter doesn't parse a #define's value, which may be any text, such as
       `((Oid) 0)`, so we only take those we know are literals) -->
  <key name="define" match="preproc_def[matches(normalize-space(*[@field = 'value']),
    '^(-?[0-9]+|0[xX][0-9a-fA-F]+|''([^''\\]|\\.)''|&quot;([^&quot;\\]|\\.)*&quot;)$')]" use="*[@field = 'name']"/>

  <variable name="constants" select="(distinct-values(($translated//identifier, $runtime-doc//identifier)[not(. = $provided)])
    ! (key('enumerator', ., $sources), key('define', ., $sources))[1]) / ."/>  <!-- (/ . puts them in document order) -->

  <!-- An enum constant's value: its own, if it has one, or else 1 more than the one before (or 0, if it's first) -->
  <function name="c:enumerator-value" as="xs:string">
    <param name="enumerator" as="element(enumerator)"/>
    <variable name="before" select="$enumerator/preceding-sibling::enumerator[1]"/>
    <sequence select="if ($enumerator/*[@field = 'value']) then c:js($enumerator/*[@field = 'value'])
      else if (empty($before)) then '0'
      else c:enumerator-value($before) ! (if (. castable as xs:integer) then string(xs:integer(.) + 1) else . || ' + 1')"/>
  </function>

  <!--
    * THE VERSION, AND THE \? TEXT
    These go in place of the constants comment too. The version (from configure.ac) is for the docs URLs: psql makes
    the major version from it as configure does, from its leading digits. The \? text is the lines of slashUsage
    (in help.c) for the commands we have. To find those, we follow each command's name as psql would: through the
    if-else chain in exec_command, which calls the function for it, and on into that function, if it's passed the
    name. A command is one we have if every function its branches call is translated or provided by the runtime, and
    isn't one the runtime declares unsupported, e.g. `do_lo_export = unsupported('lo_export')`.
  -->

  <param name="version" as="xs:string" select="'devel'"/>

  <variable name="unsupported" select="$marker/ancestor::*[self::statement_block | self::program]/(*, export_statement/*)
    /(self::lexical_declaration | self::variable_declaration)/variable_declarator
    [*[@field = 'value']/self::call_expression/*[@field = 'function'] = 'unsupported']/*[@field = 'name']"/>

  <variable name="available" select="($provided, $translated ! c:defined-names(.),
    $freeing-functions)[not(. = $unsupported)]"/>

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
      else $expr/self::binary_expression[token = '+'][*[@field = 'left']/self::identifier = $var]
        /*[@field = 'right']/self::number_literal ! substring($name, xs:integer(.) + 1)"/>
  </function>

  <!-- Whether a condition is true, given that $var holds $name: true(), false(), or () if we can't tell. We can tell for
       comparisons of the name (or part of it) with strcmp, strncmp, pg_strcasecmp or pg_strncasecmp, or of one of its
       characters with ==, and for !, && and || on those -->
  <function name="c:test" as="xs:boolean?">
    <param name="condition" as="element()"/>
    <param name="var" as="xs:string"/>
    <param name="name" as="xs:string"/>
    <variable name="op" select="$condition/token[@field = 'operator']"/>
    <variable name="left" select="$condition/*[@field = 'left']"/>
    <variable name="right" select="$condition/*[@field = 'right']"/>
    <choose>
      <when test="$condition/self::parenthesized_expression">
        <sequence select="c:test($condition/*[not(self::token | self::comment)], $var, $name)"/>
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
        <variable name="args" select="$left/*[@field = 'arguments']/*[not(self::token | self::comment)]"/>
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

  <!-- Whether we have a command (named $name, held by the variable $var in $function): we do if the first if statement
       whose condition is true (and isn't in the body of one whose condition is false) calls only available functions,
       and we have it in any of those that it passes $var to. If no condition is true, we do. -->
  <function name="c:has-command" as="xs:boolean">
    <param name="function" as="element(function_definition)"/>
    <param name="var" as="xs:string"/>
    <param name="name" as="xs:string"/>
    <variable name="branch" select="($function//if_statement[*[@field = 'condition']//identifier = $var]
      [c:test(*[@field = 'condition'], $var, $name)]
      [not(ancestor::*[@field = 'consequence']/parent::if_statement[c:test(*[@field = 'condition'], $var, $name) = false()])]
      )[1]/*[@field = 'consequence']"/>
    <sequence select="every $call in $branch//call_expression satisfies
      (let $callee := string($call/*[@field = 'function']),
           $position := index-of($call/*[@field = 'arguments']/*[not(self::token | self::comment)] ! string(.), $var)[1],
           $definition := $translated[self::function_definition][c:defined-names(.) = $callee]
       return $callee = $available and (empty($position) or empty($definition) or c:has-command($definition,
         c:name($definition/descendant::function_declarator[1]/*[@field = 'parameters']/parameter_declaration[$position]),
         $name)))"/>
  </function>

  <!-- The \? text, as a JS expression: slashUsage's lines (as they're added to its buffer: `HELP0("...")` is
       `appendPQExpBufferStr(&buf, _("..."))`, after preprocessing), grouped into sections, each a title, lines, and a
       blank line. A line for a command, e.g. `  \\d[Sx+] ...`, stays if we have the command (here, d), and a section
       stays if any of its commands does. -->
  <function name="c:slash-usage" as="xs:string">
    <variable name="exec-command" select="key('definition', 'exec_command', $sources)"/>
    <variable name="var" select="c:name($exec-command/descendant::function_declarator[1]
      /*[@field = 'parameters']/parameter_declaration[1])"/>
    <variable name="lines" select="key('definition', 'slashUsage', $sources)
      //call_expression[*[@field = 'function'] = '_']/*[@field = 'arguments']/*[self::string_literal | self::concatenated_string]"/>
    <variable name="kept" as="element()*">
      <for-each-group select="$lines" group-starting-with="*[matches(c:literal-text(.), '^[^ \\]')]">
        <variable name="commands" select="current-group()[matches(c:literal-text(.), '^  \\\\')]"/>
        <variable name="have" select="$commands[c:has-command($exec-command, $var,
          replace(c:literal-text(.), '^  \\\\([^\s\[{]+).*', '$1', 's'))]"/>
        <sequence select="if (exists($have)) then current-group() except ($commands except $have) else ()"/>
      </for-each-group>
    </variable>
    <sequence select="string-join($kept/descendant-or-self::string_literal ! ('&quot;' || c:literal-text(.) || '&quot;'), ' +&#10;  ')"/>
  </function>

  <!-- The names of the async functions the runtime provides, e.g. PSQLexec in `const PSQLexec = async (sql) => ...` -->
  <variable name="provided-async" select="$marker/ancestor::*[self::statement_block | self::program]/(*, export_statement/*)/(
    self::function_declaration[token = 'async']/*[@field = 'name'],
    (self::lexical_declaration | self::variable_declaration)/variable_declarator
      [*[@field = 'value'][self::arrow_function | self::function_expression][token = 'async']]/*[@field = 'name'])"/>

  <!--
    * FOLLOWING CALLS BACK TO THE ASYNC SEEDS
    Some functions that the C calls will be provided by the JS runtime, and return a Promise. A function that calls
    one of these, or calls a function that does (and so on), is async, and each call to it needs an await.
  -->

  <param name="async-seeds" select="'PSQLexec', 'PQexec'"/>

  <!-- An index of function calls by the name of the function called -->
  <key name="call" match="call_expression" use="*[@field = 'function']"/>

  <!-- The async function names found so far, plus the names of the functions that call them, and so on, until there
       are no more. This works like c:reached, above, but backwards: from callees to callers. -->
  <function name="c:async" as="xs:string*">
    <param name="found" as="xs:string*"/>
    <!-- The names of the functions containing calls to any of $found, except those we've already got, and those the
         runtime provides (which are async only if the runtime says so) -->
    <variable name="new" select="key('call', $found, $sources)/ancestor::function_definition
      ! c:name(descendant::function_declarator[1])[not(. = ($found, $provided))]"/>
    <sequence select="if (exists($new)) then c:async(distinct-values(($found, $new))) else $found"/>
  </function>

  <variable name="async" select="c:async(distinct-values(($async-seeds, $provided-async)))"/>

  <!-- A call to an async function, e.g. PSQLexec(buf.data): output await PSQLexec(buf.data). That's in parentheses
       if it's the function in another call, or what's accessed in f()->x or f()[i], since e.g. await f().x would
       mean await (f().x). -->
  <template match="call_expression[*[@field = 'function'] = $async]">
    <variable name="call"><apply-templates select="node()"/></variable>
    <value-of select="if (@field = 'function' or @field = 'argument' and (parent::field_expression | parent::subscript_expression))
      then '(await ' || $call || ')' else 'await ' || $call"/>
  </template>

  <!--
    * A FIXED PATTERN

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
    <apply-templates/><text> +</text>
  </template>

  <!-- {a, b, c}, an array's initial value, is [a, b, c]: the { and } tokens in the initializer_list become [ and ] -->
  <template match="initializer_list/token[. = '{']">[</template>
  <template match="initializer_list/token[. = '}']">]</template>

  <!--
    * DECLARATORS, HOWEVER DEEP

    A function keeps only its name and its parameters' names, and a declaration's types are replaced with let.

    In C, the name being declared is wrapped in declarators that make it a pointer, array or function: e.g.
    `char **items` is <pointer_declarator> containing <pointer_declarator> containing <identifier>items</identifier>.
    However deep the wrapping, the name is the declarator's first identifier.
  -->

  <function name="c:name" as="xs:string">
    <param name="declarator" as="element()"/>
    <!-- The first identifier element, in document order, that is $declarator itself or anywhere inside it -->
    <sequence select="string($declarator/descendant-or-self::identifier[1])"/>
  </function>

  <!-- `bool describeAggregates(const char *pattern, bool verbose)` becomes: `[async] function describeAggregates(pattern, verbose)` -->
  <template match="function_definition">
    <variable name="comment" select="preceding-sibling::*[1][self::comment]"/>
    <!-- The function_declarator, which has the function's name and parameters (and may be inside a pointer_declarator) -->
    <variable name="signature" select="descendant::function_declarator[1]"/>
    <!-- Each parameter's declarator: e.g. the <pointer_declarator> holding pattern, and the <identifier> verbose -->
    <variable name="params" select="$signature/*[@field = 'parameters']/parameter_declaration/*[@field = 'declarator']"/>
    <variable name="asyncqual" select="if (c:name($signature) = $async) then 'async ' else ''"/>
    <text>{$comment}&#10;{$asyncqual}function {c:name($signature)}({string-join($params ! c:name(.), ', ')})</text>
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
    * CONTEXT

    A statement that only frees memory goes, along with the whitespace before it. That includes an if statement whose
    body only frees memory (and whose condition has no side effects), e.g. `if (x) PQclear(res);`, and a loop whose
    body only frees memory, such as `for (p = list; *p; p++) free(*p);`. Where a statement can't just go, because
    it's the body of an if or loop that stays, it becomes {}.
  -->

  <param name="freeing-functions" select="'free', 'pg_free', 'PQclear', 'termPQExpBuffer', 'destroyPQExpBuffer', 'printTableCleanup'"/>

  <!-- Does a node only free memory? It does if it's:
       - an expression_statement whose call_expression's function name is in $freeing-functions, e.g. `free(x);`
       - a block whose statements (other than comments) all only free memory, apart from declarations without side
         effects (e.g. of a loop variable)
       - an if_statement with no else, whose condition contains no calls, assignments, increments or decrements, and
         whose consequence (its body) only frees memory
       - a for or while loop whose condition (and a for loop's initializer and update) contains no calls, and whose
         body only frees memory (so assignments and increments are allowed, which can only set up and advance the
         loop, e.g. p = list and p++) -->
  <function name="c:is-freeing" as="xs:boolean">
    <param name="statement" as="node()"/>
    <variable name="statements" select="$statement/self::compound_statement/*[not(self::token | self::comment)]"/>
    <sequence select="exists($statement/self::expression_statement/call_expression/*[@field = 'function'][. = $freeing-functions])
      or (some $s in $statements satisfies c:is-freeing($s))
        and (every $s in $statements satisfies c:is-freeing($s) or $s/self::declaration[not(c:has-side-effects(.))])
      or exists($statement/self::if_statement[not(*[@field = 'alternative'])]
        [not(*[@field = 'condition']//(call_expression | assignment_expression | update_expression))]
        [c:is-freeing(*[@field = 'consequence'])])
      or exists($statement/(self::for_statement | self::while_statement)
        [not(*[@field = ('initializer', 'condition', 'update')]/descendant-or-self::call_expression)]
        [c:is-freeing(*[@field = 'body'])])"/>
  </function>

  <!-- A statement that only frees memory: {} -->
  <template match="(expression_statement | compound_statement | if_statement | for_statement | while_statement)[c:is-freeing(.)]">{{}}</template>

  <!-- But in a block or case, where it's one of a list of statements: output nothing -->
  <template match="(compound_statement | case_statement)/*[c:is-freeing(.)]" priority="1"/>

  <!-- The whitespace just before such a statement (e.g. a newline and indent): output nothing, so that the deleted
       statement doesn't leave a blank line. Likewise for the other statements that go, below: labels whose statement
       goes, and dead returns. -->
  <template match="(compound_statement | case_statement)/text()[following-sibling::node()[1][c:is-freeing(.) or c:is-dead-return(.)
    or self::labeled_statement[c:return-after(.)][c:is-freeing(*[last()]) or c:is-unreachable(.)]]]"/>

  <!-- pg_malloc_array(type, count) and pg_malloc0_array(type, count) allocate an array, which in JS is just [] (and
       the type, which isn't an expression, doesn't parse) -->
  <param name="array-allocators" select="'pg_malloc_array', 'pg_malloc0_array'"/>

  <template match="call_expression[*[@field = 'function'] = $array-allocators]">[]</template>

  <!--
    * SIBLING AXES

    If a label at the top level of a function is followed only by frees and a return, then `goto label;` is that
    return, and the label itself goes. For example:

      if (!res)
        goto error_return;
      ...
      return true;

    error_return:
      termPQExpBuffer(&buf);
      return false;

    becomes:

      if (!res)
        return false;
      ...
      return true;

      return false;

    A labelled statement's label and statement are both inside it, so error_return: and the termPQExpBuffer(&buf);
    after it are:

      <labeled_statement><statement_identifier field="label">error_return</statement_identifier>:
        <expression_statement><call_expression>...</call_expression>;</expression_statement></labeled_statement>

    The statements after that are the labeled_statement's following siblings.
  -->

  <!-- The return that goto $label can become, if there is one -->
  <function name="c:return-after" as="element(return_statement)?">
    <param name="label" as="element(labeled_statement)?"/>
    <!-- The statement inside the labeled_statement, then the elements that follow it, except tokens (the block's
         closing }), comments and frees -->
    <variable name="rest" select="($label/*[last()], $label/following-sibling::*)[not(self::token or self::comment or c:is-freeing(.))]"/>
    <!-- $rest, if it's a single return_statement, and $label's parent (a compound_statement) is a function body -->
    <sequence select="$rest[self::return_statement][count($rest) = 1][$label/../parent::function_definition]"/>
  </function>

  <!-- The labeled_statement that a goto_statement goes to: the one in the same function with the same label -->
  <function name="c:label" as="element(labeled_statement)?">
    <param name="goto" as="element(goto_statement)"/>
    <sequence select="$goto/ancestor::function_definition//labeled_statement[*[@field = 'label'] = $goto/*[@field = 'label']]"/>
  </function>

  <!-- A goto that can become a return: output the return_statement instead, by continuing with what's in it (it's
       elsewhere in the function, but that doesn't matter) -->
  <template match="goto_statement[c:label(.) => c:return-after()]">
    <apply-templates select="(c:label(.) => c:return-after())/node()"/>
  </template>

  <!-- Is a label unreachable, other than by goto? It is if the statement before it is a return. -->
  <function name="c:is-unreachable" as="xs:boolean">
    <param name="label" as="element(labeled_statement)"/>
    <sequence select="exists($label/preceding-sibling::*[not(self::token or self::comment)][1]/self::return_statement)"/>
  </function>

  <!-- The label of such a goto: continue only with the statement inside it (dropping `error_return:` and the
       whitespace and comments around it), unless that only frees memory, or the label is unreachable (so that
       statement can only be reached by the gotos, which are now returns) -->
  <template match="labeled_statement[c:return-after(.)]">
    <apply-templates select="*[last()][not(c:is-freeing(.))][not(c:is-unreachable(..))]"/>
  </template>

  <!-- Is a return dead? It is if it's the return after an unreachable label -->
  <function name="c:is-dead-return" as="xs:boolean">
    <param name="return" as="element()"/>
    <variable name="label" select="$return/self::return_statement/preceding-sibling::labeled_statement[1]"/>
    <sequence select="exists($label[c:is-unreachable(.)][c:return-after(.) is $return])"/>
  </function>

  <!-- A dead return: output nothing -->
  <template match="return_statement[c:is-dead-return(.)]"/>


  <!--
    * TYPES

    Expressions have type attributes, added by add-types.xsl (e.g. <identifier type="char*">pattern</identifier>).

    In C, a string (char *) used as a condition is true unless it's NULL. In JS, an empty string is false too. So a
    string used as a condition gets an explicit NULL test: `if (pattern)` becomes `if (pattern != NULL)`, and
    `if (!pattern)` becomes `if (pattern == NULL)`.
  -->

  <!-- Is an expression a string (a pointer to or array of char, or const char)? -->
  <function name="c:is-string" as="xs:boolean">
    <param name="expr" as="element()"/>
    <sequence select="c:is-string-type($expr/@type)"/>
  </function>

  <function name="c:is-string-type" as="xs:boolean">
    <param name="type" as="xs:string?"/>
    <sequence select="matches($type, '^(const )?char(\*|\[\])$')"/>
  </function>

  <!-- Is an expression used as a condition? It is if it's the condition of an if, while or do (inside the
       parentheses), or of a for or ?:, or an operand of && or || -->
  <function name="c:is-condition" as="xs:boolean">
    <param name="expr" as="element()"/>
    <sequence select="exists(
      $expr/parent::parenthesized_expression[@field = 'condition'][parent::if_statement | parent::while_statement | parent::do_statement] |
      $expr[@field = 'condition'][parent::for_statement | parent::conditional_expression] |
      $expr[@field = ('left', 'right')]/parent::binary_expression[token[@field = 'operator'] = ('&amp;&amp;', '||')])"/>
  </function>

  <!-- An expression's JS, $js, as an operand of == or !=: in parentheses, unless it's a simple expression -->
  <function name="c:operand" as="xs:string">
    <param name="expr" as="element()"/>
    <param name="js" as="xs:string"/>
    <sequence select="if ($expr/(self::identifier | self::field_expression | self::subscript_expression | self::call_expression |
      self::parenthesized_expression | self::string_literal)) then $js else '(' || $js || ')'"/>
  </function>

  <!-- A string used as a condition, e.g. the identifier in `if (pattern)`: output it, plus != NULL. The string may
       match other templates too (e.g. an async call): next-match outputs what the best of those would output (so
       this template's priority is higher than theirs). -->
  <template match="*[c:is-string(.)][c:is-condition(.)]" priority="10">
    <variable name="js"><next-match/></variable>
    <value-of select="c:operand(., $js) || ' != NULL'"/>
  </template>

  <!-- !s, where s is a string, e.g. in `if (!pattern)`: output s == NULL instead, in parentheses unless it's itself
       a condition (so `if (!pattern)` becomes `if (pattern == NULL)`, but `x = !pattern` becomes
       `x = (pattern == NULL)`) -->
  <template match="unary_expression[token[@field = 'operator'] = '!'][*[@field = 'argument'] => c:is-string()]">
    <variable name="argument" select="*[@field = 'argument']"/>
    <variable name="js"><apply-templates select="$argument"/></variable>
    <variable name="test" select="c:operand($argument, $js) || ' == NULL'"/>
    <value-of select="if (c:is-condition(.)) then $test else '(' || $test || ')'"/>
  </template>

  <!--
    * POINTERS

    In JS, objects and arrays are already references, so a pointer to a struct or array is just the struct or array:
    &buf is buf, and *p is p.

    Other pointers are to variables, which are passed to a function to set them: e.g. exec_command_sf_sv calls
    lookup_object_oid(..., &obj_oid), which does `*obj_oid = ...`. So a variable whose address is taken is boxed, as
    an object { value }. In exec_command_sf_sv, obj_oid is declared as obj_oid = {}, &obj_oid is the box, obj_oid,
    and otherwise obj_oid is obj_oid.value. Then in lookup_object_oid, *obj_oid is obj_oid.value too.

    To tell which identifiers are the same variable, add-types.xsl gives each one a declared attribute, naming its
    declaration: e.g. <identifier declared="exec_command_sf_sv.obj_oid">obj_oid</identifier>.
  -->

  <!-- Is an expression's type a struct (or union), e.g. struct PQExpBufferData, rather than e.g. a pointer to one? -->
  <function name="c:is-struct" as="xs:boolean">
    <param name="expr" as="element()"/>
    <sequence select="c:is-struct-type($expr/@type)"/>
  </function>

  <function name="c:is-struct-type" as="xs:boolean">
    <param name="type" as="xs:string?"/>
    <sequence select="matches($type, '^(const )?(struct|union) [^*()\[\]]+$')"/>
  </function>

  <!-- Is an expression a struct or an array (e.g. char*[]), which are objects in JS? -->
  <function name="c:is-object" as="xs:boolean">
    <param name="expr" as="element()"/>
    <sequence select="c:is-struct($expr) or ends-with($expr/@type, '[]')"/>
  </function>

  <!-- An index of the names declared in functions (outside their parameters), by declared attribute -->
  <key name="local-declaration" match="function_definition//declaration//identifier[@field = 'declarator']" use="@declared"/>

  <!-- The boxed variables: the (declared attributes of) variables declared in functions, other than structs and
       arrays, that x is in some &x -->
  <variable name="boxed" select="distinct-values($sources//pointer_expression[token[@field = 'operator'] = '&amp;']
    /identifier[@field = 'argument'][not(c:is-object(.))][key('local-declaration', @declared)]/@declared)"/>

  <!-- &x, where x is a struct, an array or a box: just x -->
  <template match="pointer_expression[token[@field = 'operator'] = '&amp;'][*[@field = 'argument'] ! (c:is-object(.) or @declared = $boxed)]">
    <apply-templates select="*[@field = 'argument']"/>
  </template>

  <!-- A boxed variable x, other than where it's declared or in &x: x.value -->
  <template match="identifier[@declared = $boxed][not(@field = 'declarator' or ../token[@field = 'operator'] = '&amp;')]">{.}.value</template>

  <!-- *p, where p points to a struct: just p -->
  <template match="pointer_expression[token[@field = 'operator'] = '*'][c:is-struct(.)]">
    <apply-templates select="*[@field = 'argument']"/>
  </template>

  <!-- *p, where p points to something else (but not a char: then p is a string, which is another matter): p is a box,
       so p.value -->
  <template match="pointer_expression[token[@field = 'operator'] = '*'][not(c:is-struct(.))]
      [*[@field = 'argument'][ends-with(@type, '*')][not(c:is-string(.))]]">
    <variable name="p" select="*[@field = 'argument']"/>
    <variable name="js"><apply-templates select="$p"/></variable>
    <value-of select="c:operand($p, $js) || '.value'"/>
  </template>

  <!--
    A pointer that only ever points into one array is an index into it: e.g. curbuf, in `PQExpBufferData buf[3];` and
    `curbuf = &buf[0];`, is curbuf = 0. Then it moves and compares as it is (curbuf++, curbuf < maxbuf, and curbuf >= buf
    as curbuf >= 0), and anything else it's used for uses the element it points to, buf[curbuf] (so curbuf->data is
    buf[curbuf].data). That works if those are all it's used for: so it's declared, set only to &a[i] (or a) for the same
    array a, and otherwise only moved (++ or \-\-), compared (with another such pointer into a, or with a), passed to a
    function, or followed (*p or p->x).
  -->

  <!-- The uses of a variable that set it (p in p = ..., or char *p = ...), and the values they set it to -->
  <function name="c:is-set" as="xs:boolean">
    <param name="id" as="element(identifier)"/>
    <sequence select="exists($id[@field = 'left']/parent::assignment_expression[c:operator(.) = '='] | $id[@field = 'declarator']/parent::init_declarator)"/>
  </function>

  <!-- The array that &a[i] or a (as a value) is in: a -->
  <function name="c:array-of" as="element(identifier)?">
    <param name="value" as="element()"/>
    <sequence select="($value/self::pointer_expression[c:operator(.) = '&amp;']/*[@field = 'argument']/self::subscript_expression/*[@field = 'argument'],
      $value)/self::identifier[ends-with(@type, '[]')][1]"/>
  </function>

  <!-- Pointers that might be into an array (by how they're set), by declared attribute, with the array -->
  <variable name="array-pointer-candidates" as="map(xs:string, element(identifier))">
    <map>
      <for-each-group select="$translated//identifier[c:is-pointer(.)][not(ends-with(@type, '[]'))][contains(@declared, '.')]" group-by="@declared">
        <variable name="arrays" select="current-group()[c:is-set(.)]/../*[@field = ('right', 'value')] ! c:array-of(.)"/>
        <if test="exists($arrays) and count(current-group()[c:is-set(.)]) = count($arrays) and count(distinct-values($arrays/@declared)) = 1">
          <map-entry key="current-grouping-key()" select="$arrays[1]"/>
        </if>
      </for-each-group>
    </map>
  </variable>

  <!-- Those that are used only as above: the pointers into arrays, by declared attribute, with the array -->
  <variable name="array-pointers" select="map:merge(map:keys($array-pointer-candidates)
    [let $p := ., $array := $array-pointer-candidates(.) return every $use in $translated//identifier[@declared = $p] satisfies
      c:is-set($use) or $use/@field = 'declarator'
      or exists($use/parent::update_expression | $use/parent::argument_list | $use[@field = 'argument']/parent::field_expression[token = '->']
        | $use/parent::pointer_expression[c:operator(.) = '*'])
      or $use/parent::binary_expression[c:operator(.) = ('&lt;', '&lt;=', '&gt;', '&gt;=', '==', '!=')]/*[not(. is $use)][@field = ('left', 'right')]
        /self::identifier[@declared = $array/@declared or map:get($array-pointer-candidates, @declared)/@declared = $array/@declared]]
    ! map{.: $array-pointer-candidates(.)})"/>

  <!-- Is an identifier a pointer into an array where it's declared, set, moved or compared? (Then it's an index, as it
       is: e.g. curbuf in curbuf++.) -->
  <function name="c:is-index" as="xs:boolean">
    <param name="id" as="element(identifier)"/>
    <sequence select="c:is-set($id) or $id/@field = 'declarator' or exists($id/parent::update_expression)
      or exists($id/parent::binary_expression[*[@field = ('left', 'right')]/self::identifier[map:contains($array-pointers, @declared)]])"/>
  </function>

  <!-- A pointer into an array p: as an index, p, and otherwise a[p] -->
  <template match="identifier[map:contains($array-pointers, @declared)]" priority="5">
    <value-of select="if (c:is-index(.)) then string(.) else c:js($array-pointers(@declared)) || '[' || . || ']'"/>
  </template>

  <!-- What such a pointer is set to: &a[i] is i, and a is 0 -->
  <template match="*[@field = ('right', 'value')][../(*[@field = 'left'], *[@field = 'declarator'])/self::identifier[map:contains($array-pointers, @declared)][c:is-set(.)]]" priority="5">
    <apply-templates select="self::pointer_expression/*[@field = 'argument']/*[@field = 'index']"/>
    <if test="self::identifier">0</if>
  </template>

  <!-- The array, compared with such a pointer: 0 -->
  <template match="identifier[ends-with(@type, '[]')][../self::binary_expression/*[@field = ('left', 'right')]/self::identifier[map:contains($array-pointers, @declared)]]" priority="5">0</template>

  <!-- Moving or comparing such a pointer: as it is (and not refused, as other pointer arithmetic is) -->
  <template match="update_expression[*[@field = 'argument']/self::identifier[map:contains($array-pointers, @declared)]]
      | binary_expression[*[@field = ('left', 'right')]/self::identifier[map:contains($array-pointers, @declared)]]" priority="5">
    <apply-templates select="node()"/>
  </template>

  <!-- The value that a variable declared without one starts with: {} for a box, an array of n empty values for an array
       of n structs (as a C array contains its structs), e.g. [{}, {}, {}] for `PQExpBufferData buf[3]`, and otherwise
       the empty value of its type -->
  <function name="c:empty-value" as="xs:string?">
    <param name="id" as="element(identifier)"/>
    <variable name="size" select="$id/parent::array_declarator/*[@field = 'size']/self::number_literal"/>
    <variable name="element-type" select="substring-before($id/@type, '[]')"/>
    <sequence select="if ($id/@declared = $boxed) then '{}'
      else if (exists($size) and c:is-struct-type($element-type))
        then '[' || string-join((1 to xs:integer($size)) ! c:empty-value-of($element-type), ', ') || ']'
      else c:empty-value-of($id/@type)"/>
  </function>

  <!-- The empty value of a type: '' for a char array (which is a string), [] for another array, and for a struct, an
       object with the empty values of the fields that have them (since C structs contain their structs and arrays):
       e.g. { fieldSep: {}, recordSep: {} } for struct printTableOpt. Otherwise, none. -->
  <function name="c:empty-value-of" as="xs:string?">
    <param name="type" as="xs:string?"/>
    <variable name="fields" select="c:fields($type) ! (c:empty-value-of(@type) ! (c:field-name(..) || ': ' || .))"/>
    <sequence select="if (c:is-string-type($type) and ends-with($type, '[]')) then &quot;''&quot;
      else if (ends-with($type, '[]')) then '[]'
      else if (c:is-struct-type($type)) then (if (exists($fields)) then '{ ' || string-join($fields, ', ') || ' }' else '{}')
      else ()"/>
  </function>

  <!-- A declarator without a value, e.g. buf in `PQExpBufferData buf;`: add its empty value, if it has one, so buf = {}.
       (next-match outputs the declarator as usual.) -->
  <template match="declaration/*[@field = 'declarator'][not(self::init_declarator)][descendant-or-self::identifier[1] => c:empty-value()]">
    <next-match/><text> = {descendant-or-self::identifier[1] => c:empty-value()}</text>
  </template>

  <!-- A global variable declared without a value starts with zero, as in C (unless it has an empty value, above):
       false for a bool, NULL for a pointer, and 0 for a number. E.g. `static bool restricted;` is
       `let restricted = false;` -->
  <template match="translation_unit/declaration/*[@field = 'declarator'][not(self::init_declarator)]" priority="1">
    <variable name="id" select="descendant-or-self::identifier[1]"/>
    <next-match/>
    <text> = {(c:empty-value($id), if ($id/@type = 'bool') then 'false' else if (ends-with($id/@type, '*')) then 'NULL'
      else '0')[1]}</text>
  </template>

  <!-- A boxed variable declared with a value, e.g. n in `int n = 0;`: n = { value: 0 } -->
  <template match="declaration/init_declarator[descendant-or-self::identifier[1]/@declared = $boxed]">
    <apply-templates select="*[@field = 'declarator']"/> = {{ value: <apply-templates select="*[@field = 'value']"/> }}</template>

  <!--
    * STRINGS

    A char * is modelled as the JS string that's the rest of the C string from where it points. So *s is s[0], &s[i]
    and s + i are s.slice(i), and s++ is s = s.slice(1). Reading past the end of a JS string gives undefined, so the
    '\0' that ends a C string is undefined.

    That only works for reading. JS strings can't be written to, and a slice is a new string, so we can't write
    through a char *, or pass a slice to a function that might (one whose parameter is a char *, not a const char *).
    And a slice can't go back, so other pointer arithmetic and comparisons don't work either. C like this is marked
    ⟦like this⟧ (which isn't valid JS), for porting by hand.
  -->

  <!-- An element's JS: what it outputs -->
  <function name="c:js" as="xs:string">
    <param name="node" as="node()*"/>
    <value-of><apply-templates select="$node"/></value-of>
  </function>

  <!-- An expression's operator, e.g. + or ++ -->
  <function name="c:operator" as="xs:string">
    <param name="expr" as="element()"/>
    <sequence select="string($expr/token[@field = 'operator'])"/>
  </function>

  <!-- Is an expression a pointer (or array)? -->
  <function name="c:is-pointer" as="xs:boolean">
    <param name="expr" as="element()?"/>
    <sequence select="matches($expr/@type, '(\*|\[\])$')"/>
  </function>

  <!-- Is an expression *s, where s is a string? -->
  <function name="c:is-string-dereference" as="xs:boolean">
    <param name="expr" as="element()?"/>
    <sequence select="exists($expr/self::pointer_expression[c:operator(.) = '*'][*[@field = 'argument'] => c:is-string()])"/>
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

  <!-- C we can't translate: its text, as ⟦C⟧ -->
  <function name="c:refuse" as="xs:string">
    <param name="expr" as="element()"/>
    <sequence select="'⟦' || string($expr) || '⟧'"/>
  </function>

  <!-- An index of function declarators (in definitions and prototypes), by name -->
  <key name="function" match="function_declarator" use="c:name(.)"/>

  <!-- Can an expression be a slice? It can unless it's an argument to a call, and the function's parameter there is a
       (writable) char *, or we don't know what the parameter is because we don't know the function. (Variadic
       arguments, such as printf's, are taken to be read-only.) -->
  <function name="c:can-be-slice" as="xs:boolean">
    <param name="expr" as="element()"/>
    <variable name="call" select="$expr/parent::argument_list/parent::call_expression"/>
    <variable name="function" select="key('function', $call/*[@field = 'function'], $sources)[1]"/>
    <variable name="position" select="count($expr/preceding-sibling::*[not(self::token | self::comment)]) + 1"/>
    <variable name="parameter" select="$function/*[@field = 'parameters']/parameter_declaration[$position]"/>
    <sequence select="empty($call) or (exists($function) and not($parameter/@type = ('char*', 'char[]')))"/>
  </function>

  <!-- $expr, which is s plus $from (as &s[i] or s + i), as s.slice(i), if it can be a slice -->
  <function name="c:slice" as="xs:string">
    <param name="expr" as="element()"/>
    <param name="s" as="element()"/>
    <param name="from" as="element()"/>
    <sequence select="if (c:can-be-slice($expr)) then c:operand($s, c:js($s)) || '.slice(' || c:js($from) || ')' else c:refuse($expr)"/>
  </function>

  <!-- '\0': undefined -->
  <template match="char_literal[. = &quot;'\0'&quot;]">undefined</template>

  <!-- *s: s[0] -->
  <template match="pointer_expression[c:operator(.) = '*'][*[@field = 'argument'] => c:is-string()]" priority="2">
    <variable name="s" select="*[@field = 'argument']"/>
    <value-of select="c:operand($s, c:js($s)) || '[0]'"/>
  </template>

  <!-- &s[i]: s.slice(i), or just s for &s[0] -->
  <template match="pointer_expression[c:operator(.) = '&amp;'][*[@field = 'argument']/self::subscript_expression[*[@field = 'argument'] => c:is-string()]]" priority="2">
    <variable name="s" select="*[@field = 'argument']/*[@field = 'argument']"/>
    <variable name="i" select="*[@field = 'argument']/*[@field = 'index']"/>
    <value-of select="if ($i = '0') then c:js($s) else c:slice(., $s, $i)"/>
  </template>

  <!-- s + i (where i is a number): s.slice(i) -->
  <template match="binary_expression[c:operator(.) = '+'][*[@field = 'left'] => c:is-string()][not(c:is-pointer(*[@field = 'right']))]" priority="2">
    <value-of select="c:slice(., *[@field = 'left'], *[@field = 'right'])"/>
  </template>

  <!-- s += i: s = s.slice(i) -->
  <template match="assignment_expression[c:operator(.) = '+='][*[@field = 'left'][c:is-string(.)][not(c:has-side-effects(.))]]" priority="2">
    <variable name="s" select="*[@field = 'left']"/>
    <value-of select="c:js($s) || ' = ' || c:operand($s, c:js($s)) || '.slice(' || c:js(*[@field = 'right']) || ')'"/>
  </template>

  <!-- s++ or ++s, as a statement: s = s.slice(1); and ++s in an expression: (s = s.slice(1)) -->
  <template match="update_expression[c:operator(.) = '++'][*[@field = 'argument'][c:is-string(.)][not(c:has-side-effects(.))]]
      [c:is-statement(.) or *[1]/self::token]" priority="2">
    <variable name="s" select="*[@field = 'argument']"/>
    <variable name="js" select="c:js($s) || ' = ' || c:operand($s, c:js($s)) || '.slice(1)'"/>
    <value-of select="if (c:is-statement(.)) then $js else '(' || $js || ')'"/>
  </template>

  <!-- s[i] = '\0' (which ends the string at i): s = s.slice(0, i) -->
  <template match="assignment_expression[c:operator(.) = '='][char_literal[@field = 'right'] = &quot;'\0'&quot;]
      [*[@field = 'left']/self::subscript_expression[*[@field = 'argument'][c:is-string(.)][not(c:has-side-effects(.))]]]" priority="2">
    <variable name="s" select="*[@field = 'left']/*[@field = 'argument']"/>
    <value-of select="c:js($s) || ' = ' || c:operand($s, c:js($s)) || '.slice(0, ' || c:js(*[@field = 'left']/*[@field = 'index']) || ')'"/>
  </template>

  <!-- The string that p points into, if we can tell: s, if p was last set (before $p, in the same function) by
       p = strchr(s, c), strrchr or strstr (or in a declaration, char *p = ...), and s hasn't been set since -->
  <function name="c:pointed-into" as="element(identifier)?">
    <param name="p" as="element(identifier)"/>
    <!-- Assignments and initialisations in the function, and the variables they set -->
    <variable name="sets" select="$p/ancestor::function_definition//(assignment_expression[c:operator(.) = '='] | init_declarator)"/>
    <variable name="last" select="$sets[c:set-variable(.)/@declared = $p/@declared][. &lt;&lt; $p][last()]"/>
    <variable name="s" select="$last/*[@field = ('right', 'value')]/self::call_expression[*[@field = 'function'] = ('strchr', 'strrchr', 'strstr')]
      /*[@field = 'arguments']/*[not(self::token | self::comment)][1]/self::identifier"/>
    <sequence select="$s[empty($sets[c:set-variable(.)/@declared = $s/@declared][. >> $last][. &lt;&lt; $p])]"/>
  </function>

  <!-- The variable that an assignment or initialisation sets: e.g. p in p = ... (but not *p = ...) or char *p = ... -->
  <function name="c:set-variable" as="element(identifier)?">
    <param name="set" as="element()"/>
    <sequence select="$set/*[@field = 'left']/self::identifier, $set/self::init_declarator/*[@field = 'declarator']/descendant-or-self::identifier[1]"/>
  </function>

  <!-- The variables that are copies of s at $p, which point to the same string, so that ending s ends them too: those
       last set (before $p, in the same function) to s itself, e.g. name in name = s, if s hasn't been set since. (Copies
       made in other ways, e.g. in arrays or structs, aren't found.) -->
  <function name="c:copies" as="element(identifier)*">
    <param name="s" as="element(identifier)"/>
    <param name="p" as="element(identifier)"/>
    <variable name="sets" select="$p/ancestor::function_definition//(assignment_expression[c:operator(.) = '='] | init_declarator)[. &lt;&lt; $p]"/>
    <variable name="s-sets" select="$sets[c:set-variable(.)/@declared = $s/@declared]"/>
    <for-each-group select="$sets[*[@field = ('right', 'value')]/self::identifier/@declared = $s/@declared]" group-by="c:set-variable(.)/@declared">
      <variable name="copy" select="current-group()[last()]"/>
      <sequence select="c:set-variable($copy)[$sets[c:set-variable(.)/@declared = current-grouping-key()][last()] is $copy]
        [empty($s-sets[. >> $copy])]"/>
    </for-each-group>
  </function>

  <!-- *p = '\0', where p points into s (see c:pointed-into), which ends s where p is: s = s.slice(0, s.length - p.length),
       and likewise each copy of s, e.g. (s = ..., name = s) -->
  <template match="assignment_expression[c:operator(.) = '='][*[@field = 'right'] = &quot;'\0'&quot;]
      [*[@field = 'left']/self::pointer_expression[c:operator(.) = '*']/*[@field = 'argument']/self::identifier[exists(c:pointed-into(.))]]" priority="2">
    <variable name="p" select="*[@field = 'left']/*[@field = 'argument']"/>
    <variable name="s" select="c:pointed-into($p)"/>
    <variable name="js" select="c:js($s)"/>
    <value-of select="string-join(($js || ' = ' || $js || '.slice(0, ' || $js || '.length - ' || c:js($p) || '.length)',
      c:copies($s, $p) ! (c:js(.) || ' = ' || $js)), ', ')"/>
  </template>

  <!-- *s++, which reads s[0] and moves s on, in a statement that doesn't otherwise use s: s[0], with s = s.slice(1)
       after it, as below. (C only says that s moves before the next statement.) -->
  <function name="c:is-read-and-move" as="xs:boolean">
    <param name="expr" as="element()"/>
    <variable name="s" select="$expr/self::pointer_expression[c:operator(.) = '*'][not(@field = 'left' and parent::assignment_expression)]
      /*[@field = 'argument']/self::update_expression[c:operator(.) = '++'][*[1][@field = 'argument']]/identifier[c:is-string(.)]"/>
    <sequence select="exists($s) and count($expr/ancestor::expression_statement[1]//identifier[@declared = $s/@declared]) = 1"/>
  </function>

  <template match="pointer_expression[c:is-read-and-move(.)]" priority="4">
    <variable name="s" select="*[@field = 'argument']/*[@field = 'argument']"/>
    <value-of select="c:js($s) || '[0]'"/>
  </template>

  <!-- A statement with *s++ in it, as above: the statement, then (in a comma expression, so that it's still one
       statement) s = s.slice(1), e.g. appendPQExpBufferChar(buf, s[0]), s = s.slice(1); -->
  <template match="expression_statement[.//pointer_expression[c:is-read-and-move(.)]]" priority="1">
    <variable name="moves" select="(.//pointer_expression[c:is-read-and-move(.)]/*[@field = 'argument']/*[@field = 'argument'])
      ! (c:js(.) || ' = ' || c:js(.) || '.slice(1)')"/>
    <apply-templates select="*[1]"/>
    <value-of select="$moves ! (', ' || .)" separator=""/>
    <apply-templates select="*[1]/following-sibling::node()"/>
  </template>

  <!-- *s written through, as in *s = c or *s += 1, or *s++ (moving s): refuse -->
  <template match="pointer_expression[c:is-string-dereference(.)][@field = 'left'][parent::assignment_expression]
      | pointer_expression[c:is-string-dereference(.)][@field = 'argument'][parent::update_expression]
      | pointer_expression[c:operator(.) = '*'][*[@field = 'argument']/self::update_expression[*[@field = 'argument'] => c:is-string()]]" priority="3">
    <value-of select="c:refuse(.)"/>
  </template>

  <!-- Any other pointer arithmetic or comparison, e.g. p++, p -= 1, p - q or p &lt; q: refuse -->
  <template match="update_expression[c:is-pointer(*[@field = 'argument'])]
      | assignment_expression[c:operator(.) = ('+=', '-=')][c:is-pointer(*[@field = 'left'])]
      | binary_expression[c:operator(.) = ('+', '-', '&lt;', '&lt;=', '&gt;', '&gt;=')][c:is-pointer(*[@field = 'left']) or c:is-pointer(*[@field = 'right'])]" priority="1">
    <value-of select="c:refuse(.)"/>
  </template>

  <!--
    * STRUCT COPIES

    Assigning a C struct copies it, but assigning a JS object doesn't. So `printQueryOpt myopt = pset.popt;` is
    myopt = { ...pset.popt }. A C struct also contains its structs and arrays, which need copying too: so a struct
    type with some has a function that does that, which is output after everything else, e.g.

      function copy_printQueryOpt(s) {
        return { ...s, topt: copy_printTableOpt(s.topt) };
      }

    To know what a struct contains, add-types.xsl gives each struct definition its type, and each field declarator
    the type it declares.
  -->

  <!-- An index of struct definitions, by type, e.g. struct printTableOpt -->
  <key name="struct" match="(struct_specifier | union_specifier)[@type]" use="@type"/>

  <!-- The declarators of a struct type's fields, e.g. for `char *a, *b;`, the pointer_declarators *a and *b -->
  <function name="c:fields" as="element()*">
    <param name="type" as="xs:string?"/>
    <sequence select="key('struct', replace($type, '^const ', ''), $sources)[1]/*[@field = 'body']/field_declaration/*[@field = 'declarator']"/>
  </function>

  <!-- A field declarator's name -->
  <function name="c:field-name" as="xs:string">
    <param name="declarator" as="element()"/>
    <sequence select="string($declarator/descendant-or-self::field_identifier[1])"/>
  </function>

  <!-- A copy of $js, a value of type $type: [...js] for an array (unless it's a string, which can't change), and for
       a struct, { ...js }, or if it contains structs or arrays, e.g. copy_printQueryOpt(js) -->
  <function name="c:copy" as="xs:string">
    <param name="js" as="xs:string"/>
    <param name="type" as="xs:string?"/>
    <sequence select="if (ends-with($type, '[]') and not(c:is-string-type($type))) then '[...' || $js || ']'
      else if (not(c:is-struct-type($type))) then $js
      else if (empty(c:nested-copies($type))) then '{ ...' || $js || ' }'
      else c:copier-name($type) || '(' || $js || ')'"/>
  </function>

  <!-- For a struct type, copies of the fields of s that need copying (those that are structs or arrays), e.g.
       topt: copy_printTableOpt(s.topt) -->
  <function name="c:nested-copies" as="xs:string*">
    <param name="type" as="xs:string?"/>
    <sequence select="c:fields($type)[c:is-struct-type(@type) or (ends-with(@type, '[]') and not(c:is-string-type(@type)))]
      ! (c:field-name(.) || ': ' || c:copy('s.' || c:field-name(.), @type))"/>
  </function>

  <!-- The name of a struct type's copy function, e.g. copy_printQueryOpt -->
  <function name="c:copier-name" as="xs:string">
    <param name="type" as="xs:string"/>
    <sequence select="'copy_' || replace(replace($type, '^(const )?(struct|union) ', ''), '\W', '_')"/>
  </function>

  <!-- A struct type's copy function -->
  <function name="c:copier" as="xs:string">
    <param name="type" as="xs:string"/>
    <sequence select="'function ' || c:copier-name($type) || '(s) {&#10;  return { ...s, ' || string-join(c:nested-copies($type), ', ') || ' };&#10;}'"/>
  </function>

  <!-- Can an expression be copied? It can if it's a variable, field or array element (not e.g. a function's result,
       which is already new), and has no side effects -->
  <function name="c:is-copyable" as="xs:boolean">
    <param name="expr" as="element()?"/>
    <sequence select="exists($expr[self::identifier | self::field_expression | self::subscript_expression][not(c:has-side-effects(.))]
      | $expr/self::parenthesized_expression/*[not(self::token | self::comment)][c:is-copyable(.)])"/>
  </function>

  <!-- If an element copies a struct, the struct's type: it does if it's a declarator (in a declaration) with a value,
       or an assignment, of a struct, where the value is copyable -->
  <function name="c:copied-type" as="xs:string?">
    <param name="node" as="element()"/>
    <sequence select="(
      $node/self::init_declarator[parent::declaration][*[@field = 'value'] => c:is-copyable()]/descendant-or-self::identifier[1],
      $node/self::assignment_expression[c:operator(.) = '='][*[@field = 'right'] => c:is-copyable()]/*[@field = 'left']
      )[c:is-struct(.)]/string(@type)"/>
  </function>

  <!-- The struct types that need a copy function: those copied in the definitions we translate, and those copied by
       those copy functions, and so on (like c:reached, above), that contain structs or arrays -->
  <variable name="copier-types" select="c:copier-types(distinct-values(
    $translated//(init_declarator | assignment_expression) ! c:copied-type(.)
    ! replace(., '^const ', '')))[exists(c:nested-copies(.))]"/>

  <function name="c:copier-types" as="xs:string*">
    <param name="found" as="xs:string*"/>
    <variable name="new" select="distinct-values($found ! c:fields(.)[c:is-struct-type(@type)]/replace(@type, '^const ', ''))[not(. = $found)]"/>
    <sequence select="if (exists($new)) then c:copier-types(($found, $new)) else $found"/>
  </function>

  <!-- A declarator copying a struct, e.g. myopt = pset.popt: myopt = { ...pset.popt } -->
  <template match="init_declarator[c:copied-type(.)]">
    <apply-templates select="*[@field = 'declarator']"/> = {c:copy(c:js(*[@field = 'value']), c:copied-type(.))}</template>

  <!-- An assignment copying a struct, e.g. a = b: a = { ...b } -->
  <template match="assignment_expression[c:copied-type(.)]">
    <apply-templates select="*[@field = 'left']"/> = {c:copy(c:js(*[@field = 'right']), c:copied-type(.))}</template>

  <!--
    * OTHER EXPRESSIONS
  -->

  <!-- (type) x: just x -->
  <template match="cast_expression">
    <apply-templates select="*[@field = 'value']"/>
  </template>

  <!-- a / b, where a and b are integers: Math.trunc(a / b), since JS division isn't integer division. An integer's
       type (apart from any const) is either made of C's integer type words, in any order, as C allows (e.g. int,
       unsigned short int, or bool; enums are int), or one of the C library's integer types (typedefs in system headers,
       which add-types.xsl leaves as they are, while it resolves Postgres's: e.g. int64 to int64_t, and float4 to
       float) -->
  <function name="c:is-integer" as="xs:boolean">
    <param name="expr" as="element()"/>
    <variable name="words" select="tokenize($expr/@type)[. != 'const']"/>
    <sequence select="exists($words) and (every $word in $words satisfies $word = ('char', 'short', 'int', 'long', 'signed', 'unsigned', 'bool'))
      or string-join($words) = ('int8_t', 'int16_t', 'int32_t', 'int64_t', 'uint8_t', 'uint16_t', 'uint32_t', 'uint64_t',
        'size_t', 'ptrdiff_t', 'intptr_t', 'uintptr_t')"/>
  </function>

  <template match="binary_expression[c:operator(.) = '/'][c:is-integer(*[@field = 'left'])][c:is-integer(*[@field = 'right'])]" priority="5">
    <variable name="js"><next-match/></variable>
    <value-of select="'Math.trunc(' || $js || ')'"/>
  </template>

  <!-- snprintf(buf, size, format, ...), as a statement: buf = sprintf(format, ...) -->
  <template match="call_expression[*[@field = 'function'] = 'snprintf'][c:is-statement(.)]">
    <variable name="arguments" select="*[@field = 'arguments']/*[not(self::token | self::comment)]"/>
    <value-of select="c:js($arguments[1]) || ' = sprintf('"/>
    <apply-templates select="$arguments[3], $arguments[3]/following-sibling::node()"/>
  </template>

</stylesheet>
