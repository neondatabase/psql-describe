<?xml version="1.0" encoding="UTF-8"?>
<!--
  Translates C to JS, given C as XML from code-to-xml.ts (see c-syntax.xsl), with types added by add-types.xsl.

  Usage: npx xslt3 -xsl:xslt/c-to-js.xsl -s:typed.xml -o:describe.mjs runtime=/path/to/runtime.xml version=19rc1
  (see xslt/build.sh). Without a runtime, it outputs just the translation, of what you name, e.g.
  entry-points=HandleSlashCmds.

  THE STORY

  The rules are in c-to-js/, one file for each part of the story, best read in this order:

    runtime.xsl    The hand-written JS runtime that the translation goes into, and what it provides
    reach.xsl      What we translate: what the runtime needs, and what that needs, and so on
    async.xsl      Which functions are async: those that run queries, and those that call them, and so on
    syntax.xsl     What's the same in JS, apart from syntax: functions, declarations, a->b, casts, ...
    memory.xsl     What goes: freeing memory, and the gotos that lead to it
    types.xsl      Where types make a difference: strings as conditions, and integer division
    pointers.xsl   Pointers to variables, which are boxes, and pointers into arrays, which are indexes
    strings.xsl    Pointers to strings, which are JS strings: read and sliced, but not written to
    structs.xsl    Copying structs, which contain their structs and arrays
    values.xsl     What a variable declared without a value starts with
    help.xsl       The \? text: the lines for the commands we have
    noop.xsl       Commenting out no-op functions

  HOW XSLT PROCESSES IT

  Processing starts at the root, and for each node it visits, XSLT runs the template whose match pattern fits that
  node best. If no template matches, the default here (on-no-match="text-only-copy") outputs text nodes as they
  are, and visits an element's children in order. So with no templates at all, the output would be the C, unchanged.
  (In fact, the template for the root, below, visits only the definitions we need.)

  A template outputs whatever it contains: literal text, the values of {expressions} (in text), and the result
  of <apply-templates select="..."/>, which visits the selected nodes in the same way. Selecting nothing (or
  having an empty template) drops a node and everything in it. Where templates are in different files, or in
  different places in one file, makes no difference.

  When more than one template matches a node, the one with the highest priority wins. By default, that's 0.5 for a
  pattern with a predicate, e.g. pointer_expression[...], and less without. Where a priority is given, it's one of:

    10   A wrapper, which adds to what a node would otherwise output (<next-match/>): != NULL, for a string used as a
         condition, and Math.trunc(...), for integer division (types.xsl)
    9    The await wrapper, for a call to an async function (async.xsl), which goes inside != NULL: (await f()) != NULL
    5    Pointers into arrays, as indexes, which overrides the rules for other pointers and strings (pointers.xsl)
    2-4  Strings: reading and moving on, *s++ (4), beats refusing to write through a pointer (3), which beats
         reading and slicing (2) (strings.xsl)
    1    A rule that overrides a general one: e.g. a statement that only frees memory goes from a block, rather than
         being {}

  XPATH IN BRIEF

    *[@field = 'body']        the child element in the body field
    $x/following-sibling::*   elements after $x with the same parent (also: preceding-sibling, ancestor, ...)
    $x//identifier            identifier elements anywhere inside $x (descendant::identifier is the same)
    (a, b)                    a sequence: a, then b
    $a | $b, $a except $b     nodes in $a or $b, or in $a but not $b, as sets (each once, in document order)
    $a << $b, $a >> $b        whether $a comes before or after $b in the document
    $xs ! f(.)                f applied to each item of $xs
    x => f()                  f(x)
    [1], [last()]             the first, last
-->
<stylesheet version="3.0" expand-text="yes"
  xmlns="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:c="urn:c-to-js">

  <include href="c-syntax.xsl"/>
  <include href="c-to-js/runtime.xsl"/>
  <include href="c-to-js/reach.xsl"/>
  <include href="c-to-js/async.xsl"/>
  <include href="c-to-js/syntax.xsl"/>
  <include href="c-to-js/memory.xsl"/>
  <include href="c-to-js/types.xsl"/>
  <include href="c-to-js/pointers.xsl"/>
  <include href="c-to-js/strings.xsl"/>
  <include href="c-to-js/structs.xsl"/>
  <include href="c-to-js/values.xsl"/>
  <include href="c-to-js/help.xsl"/>
  <include href="c-to-js/noop.xsl"/>

  <output method="text"/>
  <mode on-no-match="text-only-copy"/>

  <!-- The source document, so that functions can look things up in it -->
  <variable name="sources" select="/"/>

  <!-- At the root: output the runtime, with the constants and the translation in place of its markers (or just the
       translation, if there's no runtime), and report any externals (see reach.xsl), and any C that JS numbers can't
       do (see types.xsl) -->
  <template match="/">
    <if test="exists($marker) and exists($externals)">
      <message select="'Not translated or provided by the runtime: ' || string-join($externals, ', ')"/>
    </if>
    <if test="exists($number-hazards)">
      <message select="
        'Beyond JS numbers: ' ||
        string-join(
          distinct-values($number-hazards ! (ancestor::function_definition ! c:function-name(.) || ': ' || normalize-space(.))),
          '; '
        )"/>
    </if>
    <variable name="translation"><call-template name="translation"/></variable>
    <!-- note: the 'q' flag to replace() suppresses interpolations with $n -->
    <value-of select="
      if (exists($marker)) then 
        string($runtime-doc)
        => replace(string($constants-marker), $constants-js, 'q')
        => replace(string($marker), $translation, 'q')
      else $translation"/>
  </template>

  <!-- The translation: the definitions reached from the entry points (see reach.xsl), in document order, then the
       functions that copy structs (see structs.xsl) -->
  <template name="translation">
    <apply-templates select="$translated"/>
    <value-of select="$copier-types ! (c:copier(.) || '&#10;')" separator="&#10;"/>
  </template>

  <!-- An element's JS: what it outputs -->
  <function name="c:js" as="xs:string">
    <param name="node" as="node()*"/>
    <value-of><apply-templates select="$node"/></value-of>
  </function>

</stylesheet>
