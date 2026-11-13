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
<stylesheet
  version="3.0"
  expand-text="yes"
  xmlns="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:c="urn:c-to-js"
  exclude-result-prefixes="#all">

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
        /descendant-or-self::*[self::identifier | self::shorthand_property_identifier_pattern],
      $statements/self::import_statement//import_specifier/*[@field = ('alias', 'name')][last()]"/>
  </function>

  <!-- The names the runtime provides: those declared in the scopes enclosing the marker, and the parameters of the
       functions enclosing it (not counting default values, e.g. the `false` in echoHidden = false) -->
  <variable name="provided" select="
    distinct-values((
      c:js-declared($runtime-statements),
      $marker/ancestor::*/*[@field = 'parameters']/descendant::identifier[not(ancestor::*[@field = 'right'])]
    ))"/>

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

</stylesheet>
