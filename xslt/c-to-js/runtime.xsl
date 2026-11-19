<?xml version="1.0" encoding="UTF-8"?>
<!--
  THE RUNTIME

  The translation goes in a hand-written JS runtime (runtime.mjs, as XML from code-to-xml.ts), in place of the comment
  /* TRANSLATED FROM C */. The runtime provides what C gets from elsewhere (e.g. PQExpBuffer functions, and
  PSQLexec), and its own versions of functions that we can't easily translate. A name that's declared
  where the comment is (i.e. in any enclosing scope) is provided by the runtime, so it isn't translated. What the
  runtime uses but doesn't provide is what we translate (see reach.xsl).

  Constants go in place of another comment, /* CONSTANTS TRANSLATED FROM C */, with the version.
-->
<stylesheet version="3.0" expand-text="yes"
  xmlns="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:c="urn:c-to-js">

  <param name="runtime" select="()"/>

  <variable name="runtime-doc" select="$runtime ! doc(.)"/>
  <variable name="marker" select="$runtime-doc//comment[. = '/* TRANSLATED FROM C */']"/>
  <variable name="constants-marker" select="$runtime-doc//comment[. = '/* CONSTANTS TRANSLATED FROM C */']"/>

  <!-- The statements in the scopes enclosing the marker (blocks, and the whole program), including those exported -->
  <variable name="runtime-statements" select="$marker/ancestor::*[self::statement_block | self::program]/(*, export_statement/*)"/>

  <!-- The names that JS statements declare: by functions, classes, variables (including those in destructuring
       patterns, e.g. { a, b } = ...) and imports -->
  <function name="c:js-declared" as="xs:string*">
    <param name="statements" as="element()*"/>
    <sequence select="
      $statements/(self::function_declaration | self::class_declaration)/*[@field = 'name'],
      $statements/(self::lexical_declaration | self::variable_declaration)/variable_declarator/*[@field = 'name']
        ! (let $pattern := . return descendant-or-self::*[self::identifier | self::shorthand_property_identifier_pattern]
          [not(ancestor::*[@field = 'right'][ancestor::* intersect $pattern])]),  (: not default values, e.g. x = false :)
      $statements/self::import_statement//import_specifier/*[@field = ('alias', 'name')][last()]"/>
  </function>

  <!-- The names the runtime provides: those declared in the scopes enclosing the marker, and the parameters of the
       functions enclosing it (not counting default values, e.g. the `false` in echoHidden = false) -->
  <variable name="provided" select="
    distinct-values((
      c:js-declared($runtime-statements),
      $marker/ancestor::*/*[@field = 'parameters']/descendant::identifier[not(ancestor::*[@field = 'right'])]
    ))"/>

  <!-- What the runtime uses but doesn't declare (anywhere in it), and isn't translated, a constant, generated (see
       constants-js, below), or a JS global (as listed by transform.sh): e.g. a C constant that upstream renames. There
       should be none. -->
  <param name="js-globals" as="xs:string" select="''"/>

  <variable name="runtime-undefined" select="
    let $declared := $runtime-doc//(
      variable_declarator/*[@field = 'name'], (function_declaration | class_declaration)/*[@field = 'name'],
      formal_parameters, arrow_function/*[@field = 'parameter'], catch_clause/*[@field = 'parameter'], import_specifier
    ) ! (let $d := . return descendant-or-self::*[self::identifier | self::shorthand_property_identifier_pattern]
      [not(ancestor::*[@field = 'right'][ancestor::* intersect $d])])  (: not default values, e.g. the false in x = false :)
    return distinct-values($runtime-doc//identifier[not(. = (
      $declared, $translated ! c:defined-names(.), $constants/*[@field = 'name'], 'PG_VERSION', 'PG_MAJORVERSION', 'helpText',
      tokenize($js-globals)
    ))])"/>

  <!--
    * CONSTANTS

    Constants used by the translated functions or by the runtime (and not declared by the runtime) are translated
    too, as consts: enum constants, and constants #defined in headers. They go at the top level, since the runtime
    may use them before the functions are declared. (In the C, pcpp has expanded the #defines already, but the
    runtime uses some, e.g. RELKIND_VIEW.)
  -->

  <!-- An index of enum constants by name, e.g. OT_NORMAL in `enum slash_option_type { OT_NORMAL, ... }` -->
  <key name="enumerator" match="enumerator" use="*[@field = 'name']"/>

  <!-- A regex for a single literal: any of these, and nothing else -->
  <variable name="literal" select="'^(' || string-join((
    '-?[0-9]+',                       (: a decimal integer, e.g. 100 or -1 :)
    '0[xX][0-9a-fA-F]+',              (: a hex integer, e.g. 0x0010 :)
    '''([^''\\]|\\.)''',              (: a character, e.g. 'v' or '\'' :)
    '&quot;([^&quot;\\]|\\.)*&quot;'  (: a string, in double quotes :)
  ), '|') || ')$'"/>

  <!-- An index of #defines of constants, by name: those whose value is a single number, character or string literal,
       e.g. `#define RELKIND_VIEW 'v'` (tree-sitter doesn't parse a #define's value, which may be any text, such as
       `((Oid) 0)`, so we only take those we know are literals) -->
  <key name="define" match="preproc_def[matches(normalize-space(*[@field = 'value']), $literal)]" use="*[@field = 'name']"/> 

  <!-- The constants: the enumerators and #defines named in the translation or the runtime, in document order -->
  <variable name="constants" select="(
    distinct-values(($translated//identifier, $runtime-doc//identifier)[not(. = $provided)])
    ! (key('enumerator', ., $sources), key('define', ., $sources))[1]
  ) / ."/>  <!-- (/ . puts them in document order) -->

  <!-- An enum constant's value: its own, if it has one, or else 1 more than the one before (or 0, if it's first) -->
  <function name="c:enumerator-value" as="xs:string">
    <param name="enumerator" as="element(enumerator)"/>
    <variable name="before" select="$enumerator/preceding-sibling::enumerator[1]"/>
    <sequence select="
      if ($enumerator/*[@field = 'value']) then c:js($enumerator/*[@field = 'value'])
      else if (empty($before)) then '0'
      else c:enumerator-value($before) ! (if (. castable as xs:integer) then string(xs:integer(.) + 1) else . || ' + 1')"/>
  </function>

  <!--
    * THE VERSION

    The version, e.g. 19rc1 (from configure.ac), is for the docs URLs, which use the major version, 19 (or devel). psql
    makes the major version from the version as configure does, from its leading digits.
  -->

  <param name="version" as="xs:string" select="'devel'"/>
  <variable name="major-version" select="replace($version, '^([0-9]+).*', '$1')"/>

  <!-- What goes in place of the constants comment: the constants, the version, and the \? text (see help.xsl) -->
  <variable name="constants-js" as="xs:string">
    <value-of>
      <for-each select="$constants">
        <text>const {*[@field = 'name']} = {
          if (self::preproc_def) then normalize-space(*[@field = 'value'])
          else c:enumerator-value(.)
        };&#10;</text>
      </for-each>
      <text>const PG_VERSION = "{$version}";&#10;</text>
      <text>const PG_MAJORVERSION = "{$major-version}";&#10;&#10;</text>
      <text>const helpText =&#10;  {c:slash-usage()};</text>
    </value-of>
  </variable>

  <!--
    * HAND PORTS

    Some of the runtime's own versions of C functions are ports, which would go out of date if upstream changed the C.
    Each says what it's ported from, in a comment such as `// Ported from fmtIdEnc (fe_utils/string_utils.c)`. (A port
    can be of C that isn't otherwise reached, e.g. print_aligned_text, which printTable calls.) Their C is written out,
    so that transform.sh can check it against xslt/hand-ported.c, the C that the ports were last checked against.
  -->

  <param name="hand-ported" as="xs:string?" select="()"/>

  <!-- The C definitions that the runtime's comments say it ports, each checked to exist in the file named -->
  <variable name="ported" as="element()*">
    <for-each select="$runtime-doc//comment[contains(., 'Ported from')]">
      <!-- (not \w, which in XPath doesn't include _) -->
      <variable name="pattern" select="'([A-Za-z0-9_]+) \(([A-Za-z0-9_/]+\.c)\)'"/>
      <if test="not(matches(., $pattern))">
        <message terminate="yes" select="'A Ported from comment in the runtime names no function and file: ' || ."/>
      </if>
      <analyze-string select="." regex="{$pattern}">
        <matching-substring>
          <variable name="name" select="regex-group(1)"/>
          <variable name="file" select="regex-group(2)"/>
          <variable name="definition" select="key('definition', $name, $sources)[ends-with(parent::translation_unit/@file, '/src/' || $file)]"/>
          <if test="empty($definition)">
            <message terminate="yes" select="'The runtime says it ports ' || $name || ' from ' || $file || ', which has no such definition'"/>
          </if>
          <sequence select="$definition"/>
        </matching-substring>
      </analyze-string>
    </for-each>
  </variable>

  <!-- Write out the C of the ported definitions, in source order, each headed with its file and name -->
  <template name="hand-ported">
    <result-document href="{$hand-ported}" method="text">
      <for-each select="$ported/.">
        <text>/* {replace(parent::translation_unit/@file, '.*/src/', '')}: {c:defined-names(.)} */&#10;{.}&#10;&#10;</text>
      </for-each>
    </result-document>
  </template>

</stylesheet>
