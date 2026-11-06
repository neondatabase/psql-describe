<?xml version="1.0" encoding="UTF-8"?>
<!--
  POINTERS

  In JS, objects and arrays are already references, so a pointer to a struct or array is just the struct or array:
  &buf is buf, and *p is p. Other pointers are to variables, which are boxed, or into arrays, which are indexes.
  (Pointers to strings are another matter: see strings.xsl.)
-->
<stylesheet
  version="3.0"
  expand-text="yes"
  xmlns="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:map="http://www.w3.org/2005/xpath-functions/map"
  xmlns:c="urn:c-to-js"
  exclude-result-prefixes="#all">

  <!--
    * BOXES

    A pointer to a variable is passed to a function to set it: e.g. exec_command_sf_sv calls
    lookup_object_oid(..., &obj_oid), which does `*obj_oid = ...`. So a variable whose address is taken is boxed, as
    an object { value }. In exec_command_sf_sv, obj_oid is declared as obj_oid = {}, &obj_oid is the box, obj_oid,
    and otherwise obj_oid is obj_oid.value. Then in lookup_object_oid, *obj_oid is obj_oid.value too.

    To tell which identifiers are the same variable, add-types.xsl gives each one a declared attribute, naming its
    declaration: e.g. <identifier declared="exec_command_sf_sv.obj_oid">obj_oid</identifier>.
  -->

  <!-- An index of the names declared in functions (outside their parameters), by declared attribute -->
  <key name="local-declaration" match="function_definition//declaration//identifier[@field = 'declarator']" use="@declared"/>

  <!-- The boxed variables: the (declared attributes of) variables declared in functions, other than structs and
       arrays, that x is in some &x -->
  <variable name="boxed" select="distinct-values($sources//pointer_expression[c:operator(.) = '&amp;']
    /identifier[@field = 'argument'][not(c:is-object(.))][key('local-declaration', @declared)]/@declared)"/>

  <!-- &x, where x is a struct, an array or a box: just x -->
  <template match="pointer_expression[c:operator(.) = '&amp;'][*[@field = 'argument'] ! (c:is-object(.) or @declared = $boxed)]">
    <apply-templates select="*[@field = 'argument']"/>
  </template>

  <!-- A boxed variable x, other than where it's declared or in &x: x.value -->
  <template match="identifier[@declared = $boxed][not(@field = 'declarator' or c:operator(..) = '&amp;')]">{.}.value</template>

  <!-- A boxed variable declared with a value, e.g. n in `int n = 0;`: n = { value: 0 } -->
  <template match="declaration/init_declarator[descendant-or-self::identifier[1]/@declared = $boxed]">
    <apply-templates select="*[@field = 'declarator']"/> = {{ value: <apply-templates select="*[@field = 'value']"/> }}</template>

  <!-- *p, where p points to a struct: just p -->
  <template match="pointer_expression[c:operator(.) = '*'][c:is-struct(.)]">
    <apply-templates select="*[@field = 'argument']"/>
  </template>

  <!-- *p, where p points to something else (but not a char: then p is a string, which is another matter): p is a box,
       so p.value -->
  <template match="pointer_expression[c:operator(.) = '*'][not(c:is-struct(.))]
      [*[@field = 'argument'][ends-with(@type, '*')][not(c:is-string(.))]]">
    <text>{c:operand(*[@field = 'argument'])}.value</text>
  </template>

  <!--
    * POINTERS INTO ARRAYS

    A pointer (other than a string) that only ever points into one array is an index into it: e.g. curbuf, in
    `PQExpBufferData buf[3];` and `curbuf = &buf[0];`, is curbuf = 0. Then it moves and compares as it is (curbuf++,
    curbuf < maxbuf, and curbuf >= buf as curbuf >= 0), and anything else it's used for uses the element it points to,
    buf[curbuf] (so curbuf->data is buf[curbuf].data, and *curbuf is buf[curbuf]). That works if those are all it's used
    for: so it's declared, set only to &a[i] (or a) for the same array a, and otherwise only moved (++ or \-\-),
    compared (with another such pointer into a, or with a), passed to a function, or followed (*p or p->x).

    The array can be any expression that always gives the same array: one without side effects, whose variables (and
    the expression itself) aren't set in the function. E.g. footer, in `for (footer = opt->footers; *footer; footer++)`,
    is an index into opt->footers (a char **, which is the type of footer itself), so *footer is opt.footers[footer].
  -->

  <!-- The array that &a[i] or a (as a value, for a pointer of type $type) is in: a -->
  <function name="c:array-of" as="element()?">
    <param name="value" as="element()"/>
    <param name="type" as="xs:string"/>
    <sequence select="($value/self::pointer_expression[c:operator(.) = '&amp;']/*[@field = 'argument']/self::subscript_expression/*[@field = 'argument'],
      $value[c:is-array(.) or @type = $type])[c:is-fixed(.)][1]"/>
  </function>

  <!-- Does an expression always give the same array? It does if it's an array variable, or it has no side effects (or
       subscripts), and neither it nor its variables are set in its function -->
  <function name="c:is-fixed" as="xs:boolean">
    <param name="expr" as="element()"/>
    <sequence select="exists($expr/self::identifier[c:is-array(.)])
      or not(c:has-side-effects($expr)) and empty($expr/descendant-or-self::subscript_expression)
        and (every $id in $expr/descendant-or-self::identifier satisfies empty(c:sets($id)))
        and empty($expr/ancestor::function_definition//assignment_expression/*[@field = 'left'][normalize-space(.) = normalize-space($expr)])"/>
  </function>

  <!-- The pointers that might be into an array, by how they're set: by declared attribute, with the array -->
  <variable name="array-pointer-candidates" as="map(xs:string, element())">
    <map>
      <for-each-group select="$translated//identifier[c:is-pointer(.)][not(c:is-array(.) or c:is-string(.))][contains(@declared, '.')]" group-by="@declared">
        <variable name="type" select="string(@type)"/>
        <variable name="values" select="current-group() ! c:setter(.) ! c:value(.)"/>
        <variable name="arrays" select="$values ! c:array-of(., $type)"/>
        <if test="exists($arrays) and count($arrays) = count($values) and count(distinct-values($arrays ! normalize-space(.))) = 1">
          <map-entry key="current-grouping-key()" select="$arrays[1]"/>
        </if>
      </for-each-group>
    </map>
  </variable>

  <!-- Is a use of a pointer into $array one that works for an index? It is if it declares, sets, moves, passes or
       follows the pointer, or compares it with another pointer into $array, or with $array itself -->
  <function name="c:is-index-use" as="xs:boolean">
    <param name="use" as="element(identifier)"/>
    <param name="array" as="element()"/>
    <variable name="compared" select="$use/parent::binary_expression[c:operator(.) = ('&lt;', '&lt;=', '&gt;', '&gt;=', '==', '!=')]
      /*[@field = ('left', 'right')][not(. is $use)]/self::identifier"/>
    <sequence select="c:is-set($use) or $use/@field = 'declarator'
      or exists($use/parent::update_expression | $use/parent::argument_list | $use[@field = 'argument']/parent::field_expression[c:operator(.) = '->']
        | $use/parent::pointer_expression[c:operator(.) = '*'])
      or ($compared, $compared/@declared ! map:get($array-pointer-candidates, .))/@declared = $array/@declared"/>
  </function>

  <!-- The pointers into arrays: the candidates whose uses all work for an index -->
  <variable name="array-pointers" as="map(xs:string, element())">
    <map>
      <for-each select="map:keys($array-pointer-candidates)">
        <variable name="array" select="$array-pointer-candidates(.)"/>
        <if test="every $use in $translated//identifier[@declared = current()] satisfies c:is-index-use($use, $array)">
          <map-entry key="." select="$array"/>
        </if>
      </for-each>
    </map>
  </variable>

  <!-- Is an expression a pointer into an array? -->
  <function name="c:is-array-pointer" as="xs:boolean">
    <param name="expr" as="element()?"/>
    <sequence select="exists($expr/self::identifier[@declared][map:contains($array-pointers, @declared)])"/>
  </function>

  <!-- Is an identifier a pointer into an array where it's declared, set, moved or compared? (Then it's an index, as it
       is: e.g. curbuf in curbuf++.) -->
  <function name="c:is-index" as="xs:boolean">
    <param name="id" as="element(identifier)"/>
    <sequence select="c:is-set($id) or $id/@field = 'declarator' or exists($id/parent::update_expression)
      or exists($id/parent::binary_expression[*[@field = ('left', 'right')][c:is-array-pointer(.)]])"/>
  </function>

  <!-- A pointer into an array p: as an index, p, and otherwise a[p] (where a is output as the array, even if it's also
       what p is set to, below) -->
  <template match="identifier[c:is-array-pointer(.)]" priority="5">
    <choose>
      <when test="c:is-index(.)">{.}</when>
      <otherwise>
        <apply-templates select="$array-pointers(@declared)"><with-param name="as-array" tunnel="yes" select="true()"/></apply-templates>
        <text>[{.}]</text>
      </otherwise>
    </choose>
  </template>

  <!-- What such a pointer is set to: &a[i] is i, and a itself is 0 -->
  <template match="*[@field = ('right', 'value')][c:is-array-pointer(c:set-variable(..))]" priority="5">
    <param name="as-array" tunnel="yes" select="false()"/>
    <choose>
      <when test="$as-array"><next-match/></when>
      <when test="self::pointer_expression[c:operator(.) = '&amp;']"><apply-templates select="*[@field = 'argument']/*[@field = 'index']"/></when>
      <otherwise>0</otherwise>
    </choose>
  </template>

  <!-- *p, for such a pointer p: a[p] (not p.value, for a pointer to a box) -->
  <template match="pointer_expression[c:operator(.) = '*'][c:is-array-pointer(*[@field = 'argument'])]" priority="5">
    <apply-templates select="*[@field = 'argument']"/>
  </template>

  <!-- The array, compared with such a pointer: 0 -->
  <template match="identifier[c:is-array(.)][../self::binary_expression/*[@field = ('left', 'right')][c:is-array-pointer(.)]]" priority="5">0</template>

  <!-- Moving or comparing such a pointer: as it is (and not refused, as other pointer arithmetic is: see strings.xsl) -->
  <template match="update_expression[c:is-array-pointer(*[@field = 'argument'])]
      | binary_expression[*[@field = ('left', 'right')][c:is-array-pointer(.)]]" priority="5">
    <apply-templates select="node()"/>
  </template>

</stylesheet>
