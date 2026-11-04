<?xml version="1.0" encoding="UTF-8"?>
<!--
  Translates C to JS, given C as XML from c-to-xml.ts, with types added by add-types.xsl.

  Usage: npx xslt3 -xsl:xslt/c-to-js.xsl -s:typed.xml -o:translated.js

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
  xmlns:c="urn:c-to-js"
  exclude-result-prefixes="#all">

  <output method="text"/>
  <mode on-no-match="text-only-copy"/>

  <!-- The source document, so that functions can look things up in it -->
  <variable name="sources" select="/"/>

  <!--
    * FOLLOWING CALLS FROM THE ENTRY POINTS
    We translate only the entry point functions and (recursively) the functions they call.
  -->

  <param name="entry-points" select="'exec_command_d', 'exec_command_list', 'exec_command_sf_sv'"/>

  <!-- An index of top-level function definitions by name (see c:name, below) -->
  <key name="definition" match="translation_unit/function_definition" use="c:name(descendant::function_declarator[1])"/>

  <!-- The definitions reached so far, plus the definitions of every name they mention, and so on, until there are no
       more. (Like except, | treats nodes as a set, so a definition is never included twice.) -->
  <function name="c:reached" as="element(function_definition)*">
    <param name="found" as="element(function_definition)*"/>
    <!-- The definitions of the names of all identifiers anywhere in $found, except those we've already got -->
    <variable name="new" select="key('definition', $found//identifier, $sources) except $found"/>
    <sequence select="if (exists($new)) then c:reached($found | $new) else $found"/>
  </function>

  <!-- At the root: visit the definitions reached from the entry points, grouped by file. They come in document order,
       so grouping adjacent ones with the same file also keeps them in source order. -->
  <template match="/">
    <apply-templates select="c:reached(key('definition', $entry-points, $sources))"/>
    <!-- this more complex alternative only inserts a comment giving the file source -->
    <!-- <for-each-group select="c:reached(key('definition', $entry-points, $sources))" group-adjacent="ancestor::translation_unit/@file">
      <text>/* from {tokenize(current-grouping-key(), '/')[last()]} */&#10;&#10;</text>
      <for-each select="current-group()">
        <apply-templates select="."/>
        <text>&#10;&#10;</text>
      </for-each>
    </for-each-group> -->
  </template>

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
    <!-- The names of the functions containing calls to any of $found, except those we've already got -->
    <variable name="new" select="key('call', $found, $sources)/ancestor::function_definition
      ! c:name(descendant::function_declarator[1])[not(. = $found)]"/>
    <sequence select="if (exists($new)) then c:async(distinct-values(($found, $new))) else $found"/>
  </function>

  <variable name="async" select="c:async($async-seeds)"/>

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
  <template match="string_literal[following-sibling::node()[not(self::text()) or normalize-space()][1][self::string_literal]]">
    <apply-templates select="node()"/><text> +</text>
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

  <!-- *a or a[10]: output only the declarator within, e.g. the identifier a (so dropping the * and the [10]) -->
  <template match="pointer_declarator | array_declarator">
    <apply-templates select="*[@field = 'declarator']"/>
  </template>

  <!--
    * CONTEXT

    A statement that only frees memory goes, along with the whitespace before it. That includes an if statement whose
    body only frees memory (and whose condition has no side effects), e.g. `if (x) PQclear(res);`.
  -->

  <param name="freeing-functions" select="'free', 'pg_free', 'PQclear', 'termPQExpBuffer', 'destroyPQExpBuffer', 'printTableCleanup'"/>

  <!-- Does a node only free memory? It does if it's:
       - an expression_statement whose call_expression's function name is in $freeing-functions, e.g. `free(x);`, or
       - an if_statement with no else, whose condition contains no calls, assignments, increments or decrements, and whose
         consequence (its body) only frees memory -->
  <function name="c:is-freeing" as="xs:boolean">
    <param name="statement" as="node()"/>
    <sequence select="exists($statement/self::expression_statement/call_expression/*[@field = 'function'][. = $freeing-functions])
      or exists($statement/self::if_statement[not(*[@field = 'alternative'])]
        [not(*[@field = 'condition']//(call_expression | assignment_expression | update_expression))]
        [c:is-freeing(*[@field = 'consequence'])])"/>
  </function>

  <!-- A statement that only frees memory: output nothing -->
  <template match="(expression_statement | if_statement)[c:is-freeing(.)]"/>

  <!-- The whitespace just before such a statement (e.g. a newline and indent): output nothing, so that the deleted
       statement doesn't leave a blank line -->
  <template match="text()[following-sibling::node()[1][c:is-freeing(.)]]"/>

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

  <!-- A goto that can become a return: output the return_statement instead, by continuing with it (it's
       elsewhere in the function, but that doesn't matter) -->
  <template match="goto_statement[c:label(.) => c:return-after()]">
    <apply-templates select="c:label(.) => c:return-after()"/>
  </template>

  <!-- The label of such a goto: continue only with the statement inside it (dropping `error_return:` and the
       whitespace and comments around it). That statement only frees memory, so it outputs nothing too. -->
  <template match="labeled_statement[c:return-after(.)]">
    <apply-templates select="*[last()]"/>
  </template>


  <!--
    * TYPES

    Expressions have type attributes, added by add-types.xsl (e.g. <identifier type="char*">pattern</identifier>).

    In C, a string (char *) used as a condition is true unless it's NULL. In JS, an empty string is false too. So a
    string used as a condition gets an explicit NULL test: `if (pattern)` becomes `if (pattern != NULL)`, and
    `if (!pattern)` becomes `if (pattern == NULL)`.
  -->

  <!-- Is an expression a string (a pointer to or array of char)? -->
  <function name="c:is-string" as="xs:boolean">
    <param name="expr" as="element()"/>
    <sequence select="$expr/@type = ('char*', 'char[]')"/>
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
       match other templates too (e.g. an async call): next-match outputs what the best of those would output. -->
  <template match="*[c:is-string(.)][c:is-condition(.)]" priority="1">
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
    <sequence select="matches($expr/@type, '^(struct|union) [^*()\[\]]+$')"/>
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

  <!-- The value that a variable declared without one starts with: {} for a struct or a box, '' for a char array (which
       is a string), [] for another array, and otherwise none -->
  <function name="c:empty-value" as="xs:string?">
    <param name="id" as="element(identifier)"/>
    <sequence select="if ($id/@declared = $boxed or c:is-struct($id)) then '{}'
      else if ($id/@type = 'char[]') then &quot;''&quot;
      else if (ends-with($id/@type, '[]')) then '[]'
      else ()"/>
  </function>

  <!-- A declarator without a value, e.g. buf in `PQExpBufferData buf;`: add its empty value, if it has one, so buf = {}.
       (next-match outputs the declarator as usual.) -->
  <template match="declaration/*[@field = 'declarator'][not(self::init_declarator)][descendant-or-self::identifier[1] => c:empty-value()]">
    <next-match/><text> = {descendant-or-self::identifier[1] => c:empty-value()}</text>
  </template>

  <!-- A boxed variable declared with a value, e.g. n in `int n = 0;`: n = { value: 0 } -->
  <template match="declaration/init_declarator[descendant-or-self::identifier[1]/@declared = $boxed]">
    <apply-templates select="*[@field = 'declarator']"/> = {{ value: <apply-templates select="*[@field = 'value']"/> }}</template>

</stylesheet>
