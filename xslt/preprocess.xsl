<?xml version="1.0" encoding="UTF-8"?>
<!--
  Does the little preprocessing that tree-sitter needs, given C as XML from c-to-xml.ts. Writes each file back out
  as C, under $dir, and outputs a list of the files written, for c-to-xml.ts to parse again. Then repeat, until
  that changes nothing (see HOW, below):

    node xslt/c-to-xml.ts file.c ... > sources.xml
    until npx xslt3 -xsl:xslt/preprocess.xsl -s:sources.xml | xargs node xslt/c-to-xml.ts > next.xml &&
      cmp -s next.xml sources.xml; do mv next.xml sources.xml; done

  (For how XSLT works, and XPath in brief, see the comments at the top of c-to-js.xsl.)

  WHY

  Tree-sitter parses C without preprocessing it, which mostly works, but not always. For example, in

    "... != " CppAsString2(RELKIND_RELATION) " AND ..."

  it reads CppAsString2 as a macro that expands to a string (like PRId64 in "%" PRId64), which makes the
  concatenated string the function in a call, and the parse goes wrong from there. So we expand that macro as the C
  preprocessor would, giving "'r'", and then parse again.

  WHAT

  We expand just a few macros, defined below, and leave everything else alone:

    - PGDLLIMPORT and pg_nodiscard, which are annotations on declarations, and expand to nothing on our platforms
      (and confuse the parse of declarations otherwise)
    - pg_attribute_printf(f, a), pg_attribute_format_arg(a) and pg_attribute_no_sanitize_address(), likewise
    - CppAsString(x), which is C's # (stringizing) operator, and CppAsString2(x), which expands x first

  and we drop #ifdef NOT_USED blocks, since by convention Postgres never defines NOT_USED.

  HOW

  Like the C preprocessor, we work on tokens. Identifiers are identifier (or e.g. type_identifier) elements, and
  comments and strings are elements too, so their contents are never mistaken for macros. Other tokens, such as ( and ), are <token> elements, and the text between
  elements is whitespace (or a \ line continuation). So a translation_unit's tokens, and the whitespace between them, are its elements that
  have no child elements, and its text nodes that aren't inside one.

  We go through these once, in order, outputting each as it is, except that a macro's name and (if it's
  function-like) its arguments, from ( to the matching ), are replaced by its expansion.

  Tree-sitter lexes only the tokens that make sense where it is in its parse, so where the parse goes wrong, the
  tokens after it may be wrong too. For example, after one misparsed CppAsString2(...), describe.c has another that
  is lexed as part of a string. So after expanding, we parse again, and expand again, until that changes nothing.
  (This is like the C preprocessor's rescanning of expanded text, but over whole files.) Here, the second pass is
  the last to change anything, so the third stops the loop.

  Macros in a #define's value are left alone: tree-sitter doesn't parse them, and the C preprocessor expands them
  only where the #define is used.
-->
<stylesheet
  version="3.0"
  expand-text="yes"
  xmlns="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:c="urn:c-to-js"
  exclude-result-prefixes="#all">

  <output method="text"/>

  <!-- Where to write the preprocessed files -->
  <param name="dir" select="'tmp/pp'"/>

  <variable name="sources" select="/"/>

  <!--
    * THE MACROS
    Each macro is a template in mode expand, matching its name. A function-like macro's template gets its arguments,
    as text: e.g. RELKIND_RELATION in CppAsString2(RELKIND_RELATION).
  -->

  <param name="object-like" select="'PGDLLIMPORT', 'pg_nodiscard'"/>
  <param name="function-like" select="'pg_attribute_printf', 'pg_attribute_format_arg', 'pg_attribute_no_sanitize_address',
    'CppAsString', 'CppAsString2'"/>

  <mode name="expand"/>

  <!-- Annotations: nothing -->
  <template mode="expand" match="*[. = ('PGDLLIMPORT', 'pg_nodiscard', 'pg_attribute_printf', 'pg_attribute_format_arg',
    'pg_attribute_no_sanitize_address')]"/>

  <!-- CppAsString(x): x as a string, e.g. "RELKIND_RELATION" -->
  <template mode="expand" match="*[. = 'CppAsString']">
    <param name="arguments" as="xs:string"/>
    <value-of select="c:stringize($arguments)"/>
  </template>

  <!-- CppAsString2(x): x, after expanding any macros in it, as a string, e.g. "'r'" (since `#define RELKIND_RELATION 'r'`) -->
  <template mode="expand" match="*[. = 'CppAsString2']">
    <param name="arguments" as="xs:string"/>
    <value-of select="c:expand-defines($arguments) => c:stringize()"/>
  </template>

  <!-- What the # operator does: put text in quotes. Any " or \ in a string or character literal in it (and there's
       nowhere else they can be) gets a \ before it. -->
  <function name="c:stringize" as="xs:string">
    <param name="text" as="xs:string"/>
    <sequence select="'&quot;' || replace($text, '([&quot;\\])', '\\$1') || '&quot;'"/>
  </function>

  <!-- An index of #defines (of object-like macros), by name, e.g. `#define RELKIND_RELATION 'r'` -->
  <key name="define" match="preproc_def[*[@field = 'value']]" use="*[@field = 'name']"/>

  <!-- A name, after expanding it if it's #defined (and expanding that, and so on), e.g. 'r' for RELKIND_RELATION -->
  <function name="c:expand-defines" as="xs:string">
    <param name="text" as="xs:string"/>
    <variable name="define" select="key('define', $text, $sources)[1]"/>
    <sequence select="if ($define) then c:expand-defines(normalize-space($define/*[@field = 'value'])) else $text"/>
  </function>

  <!--
    * GOING THROUGH THE TOKENS
  -->

  <!-- Is an element a token that names a macro? It must be an identifier (or e.g. type_identifier), and for a
       function-like macro, the next token must be a ( -->
  <function name="c:is-macro" as="xs:boolean">
    <param name="token" as="node()"/>
    <sequence select="exists($token[self::identifier or ends-with(local-name(), '_identifier')]
      [. = $object-like or (. = $function-like and c:next-token(.) = '(')])"/>
  </function>

  <!-- The next token after a node (skipping comments) -->
  <function name="c:next-token" as="element()?">
    <param name="node" as="node()"/>
    <sequence select="$node/following::*[not(*)][not(self::comment)][1]"/>
  </function>

  <!-- #ifdef NOT_USED ... #endif (with no #else): dropped -->
  <function name="c:is-dropped" as="xs:boolean">
    <param name="ifdef" as="element(preproc_ifdef)"/>
    <sequence select="$ifdef/token[1] = '#ifdef' and $ifdef/*[@field = 'name'] = 'NOT_USED' and empty($ifdef/*[@field = 'alternative'])"/>
  </function>

  <template match="/">
    <apply-templates select="sources/translation_unit"/>
  </template>

  <!-- Each file: write its tokens, and the whitespace between them, to $dir, as C, and output the file's name -->
  <template match="translation_unit">
    <!-- The file under $dir: e.g. tmp/pp/postgres/src/bin/psql/describe.c for ../postgres/src/bin/psql/describe.c, or
         for tmp/pp/postgres/src/bin/psql/describe.c itself (so a second pass replaces the files from the first) -->
    <variable name="path" select="replace(@file, '^(/|\.\./)+', '')"/>
    <variable name="file" select="if (starts-with($path, $dir || '/')) then $path else $dir || '/' || $path"/>
    <variable name="dropped" select=".//preproc_ifdef[c:is-dropped(.)]"/>
    <!-- (Dropping a block includes the whitespace before it, so as not to leave a blank line) -->
    <variable name="tokens" select="(.//*[not(*)] | .//text()[not(parent::*[not(*)])])
      except ($dropped//node() | $dropped/preceding-sibling::node()[1][self::text()])"/>
    <result-document href="{$file}" method="text">
      <!-- Go through the tokens in order. While we're in a function-like macro's arguments, $macro is its name,
           $depth is the number of ( not yet closed, and $arguments is the text so far. (A parameter that
           next-iteration doesn't set keeps its value, so we always set all three.) -->
      <iterate select="$tokens">
        <param name="macro" as="element()?" select="()"/>
        <param name="depth" as="xs:integer" select="0"/>
        <param name="arguments" as="xs:string" select="''"/>
        <choose>
          <when test="exists($macro)">
            <variable name="new-depth" select="$depth + (if (self::token = '(') then 1 else if (self::token = ')') then -1 else 0)"/>
            <choose>
              <!-- The ) that closes the arguments: output the expansion -->
              <when test="$depth = 1 and $new-depth = 0">
                <apply-templates mode="expand" select="$macro"><with-param name="arguments" select="normalize-space($arguments)"/></apply-templates>
                <next-iteration>
                  <with-param name="macro" select="()"/>
                  <with-param name="depth" select="0"/>
                  <with-param name="arguments" select="''"/>
                </next-iteration>
              </when>
              <!-- Otherwise, inside the parentheses, this is part of the arguments (and before the first (, it's
                   whitespace, which we skip) -->
              <otherwise>
                <next-iteration>
                  <with-param name="macro" select="$macro"/>
                  <with-param name="depth" select="$new-depth"/>
                  <with-param name="arguments" select="if ($depth > 0) then $arguments || . else $arguments"/>
                </next-iteration>
              </otherwise>
            </choose>
          </when>
          <!-- A function-like macro's name: start on its arguments -->
          <when test=". = $function-like and c:is-macro(.)">
            <next-iteration>
              <with-param name="macro" select="."/>
              <with-param name="depth" select="0"/>
              <with-param name="arguments" select="''"/>
            </next-iteration>
          </when>
          <!-- An object-like macro's name: output the expansion -->
          <when test="c:is-macro(.)">
            <apply-templates mode="expand" select="."/>
          </when>
          <otherwise>
            <value-of select="."/>
          </otherwise>
        </choose>
      </iterate>
    </result-document>
    <text>{$file}&#10;</text>
  </template>

</stylesheet>
