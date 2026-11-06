<?xml version="1.0" encoding="UTF-8"?>
<!--
  STRINGS

  A char * is modelled as the JS string that's the rest of the C string from where it points. So *s is s[0], &s[i]
  and s + i are s.slice(i), and s++ is s = s.slice(1). Reading past the end of a JS string gives undefined, so the
  '\0' that ends a C string is undefined.

  That only works for reading. JS strings can't be written to, and a slice is a new string, so we can't write
  through a char *, or pass a slice to a function that might (one whose parameter is a char *, not a const char *).
  And a slice can't go back, so other pointer arithmetic and comparisons don't work either. C like this is marked
  ⟦like this⟧ (which isn't valid JS), for porting by hand.

  There are exceptions, though, below: ending a string where a pointer into it points, *p = '\0', and reading and
  moving on, *s++.
-->
<stylesheet
  version="3.0"
  expand-text="yes"
  xmlns="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:c="urn:c-to-js"
  exclude-result-prefixes="#all">

  <!-- C's null character, '\0', which ends a string -->
  <variable name="nul" select="&quot;'\0'&quot;"/>

  <!-- Is an expression *s, where s is a string? -->
  <function name="c:is-string-dereference" as="xs:boolean">
    <param name="expr" as="element()?"/>
    <sequence select="exists($expr/self::pointer_expression[c:operator(.) = '*'][*[@field = 'argument'] => c:is-string()])"/>
  </function>

  <!--
    * READING AND SLICING
  -->

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
    <variable name="parameter" select="c:parameters($function)[$position]"/>
    <sequence select="empty($call) or (exists($function) and not($parameter/@type = ('char*', 'char[]')))"/>
  </function>

  <!-- $expr, which is s plus $from (as &s[i] or s + i), as s.slice(i), if it can be a slice -->
  <function name="c:slice" as="xs:string">
    <param name="expr" as="element()"/>
    <param name="s" as="element()"/>
    <param name="from" as="element()"/>
    <sequence select="if (c:can-be-slice($expr)) then c:operand($s) || '.slice(' || c:js($from) || ')' else c:refuse($expr)"/>
  </function>

  <!-- '\0': undefined -->
  <template match="char_literal[. = $nul]">undefined</template>

  <!-- *s: s[0] -->
  <template match="pointer_expression[c:is-string-dereference(.)]" priority="2">
    <text>{c:operand(*[@field = 'argument'])}[0]</text>
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
    <text>{c:js($s)} = {c:operand($s)}.slice({c:js(*[@field = 'right'])})</text>
  </template>

  <!-- s++ or ++s, as a statement: s = s.slice(1); and ++s in an expression: (s = s.slice(1)) -->
  <template match="update_expression[c:operator(.) = '++'][*[@field = 'argument'][c:is-string(.)][not(c:has-side-effects(.))]]
      [c:is-statement(.) or *[1]/self::token]" priority="2">
    <variable name="s" select="*[@field = 'argument']"/>
    <variable name="js">{c:js($s)} = {c:operand($s)}.slice(1)</variable>
    <value-of select="if (c:is-statement(.)) then $js else '(' || $js || ')'"/>
  </template>

  <!-- s[i] = '\0' (which ends the string at i): s = s.slice(0, i) -->
  <template match="assignment_expression[c:operator(.) = '='][char_literal[@field = 'right'] = $nul]
      [*[@field = 'left']/self::subscript_expression[*[@field = 'argument'][c:is-string(.)][not(c:has-side-effects(.))]]]" priority="2">
    <variable name="s" select="*[@field = 'left']/*[@field = 'argument']"/>
    <text>{c:js($s)} = {c:operand($s)}.slice(0, {c:js(*[@field = 'left']/*[@field = 'index'])})</text>
  </template>

  <!--
    * ENDING A STRING WHERE A POINTER INTO IT POINTS

    `*p = '\0'`, where p was set by `p = strchr(s, c)` (or strrchr or strstr), ends s where p is. In JS, p is the rest of
    s from there, so that's s = s.slice(0, s.length - p.length). A copy of s (made by name = s) is the same string in
    C, so that ends too.
  -->

  <!-- The string that p points into, if we can tell: s, if p was last set (before $p, in the same function) by
       p = strchr(s, c), strrchr or strstr (or in a declaration, char *p = ...), and s hasn't been set since -->
  <function name="c:pointed-into" as="element(identifier)?">
    <param name="p" as="element(identifier)"/>
    <variable name="last" select="c:last-set($p, $p)"/>
    <variable name="s" select="c:value($last)/self::call_expression[*[@field = 'function'] = ('strchr', 'strrchr', 'strstr')]
      ! c:arguments(.)[1]/self::identifier"/>
    <sequence select="$s[not(c:is-set-between(., $last, $p))]"/>
  </function>

  <!-- The variables that are copies of s at $p: those last set (before $p, in the same function) to s itself, e.g.
       name in name = s, if s hasn't been set since. (Copies made in other ways, e.g. in arrays or structs, aren't
       found.) -->
  <function name="c:copies" as="element(identifier)*">
    <param name="s" as="element(identifier)"/>
    <param name="p" as="element(identifier)"/>
    <variable name="copies" select="$p/ancestor::function_definition//(assignment_expression | init_declarator)
      [c:value(.)/self::identifier/@declared = $s/@declared][. &lt;&lt; $p]"/>
    <sequence select="$copies[c:last-set(c:set-variable(.), $p) is .][not(c:is-set-between($s, ., $p))] ! c:set-variable(.)"/>
  </function>

  <!-- *p = '\0', where p points into s: s = s.slice(0, s.length - p.length), and likewise each copy of s, e.g.
       (s = ..., name = s) -->
  <template match="assignment_expression[c:operator(.) = '='][*[@field = 'right'] = $nul]
      [*[@field = 'left']/self::pointer_expression[c:operator(.) = '*']/*[@field = 'argument']/self::identifier[exists(c:pointed-into(.))]]" priority="2">
    <variable name="p" select="*[@field = 'left']/*[@field = 'argument']"/>
    <variable name="s" select="c:pointed-into($p)"/>
    <variable name="js" select="c:js($s)"/>
    <text>{$js} = {$js}.slice(0, {$js}.length - {c:js($p)}.length)</text>
    <for-each select="c:copies($s, $p)">, {c:js(.)} = {$js}</for-each>
  </template>

  <!--
    * READING AND MOVING ON

    *s++ reads s[0] and moves s on. In a statement that doesn't otherwise use s, that's s[0], with s = s.slice(1)
    after it, in a comma expression, so that it's still one statement: e.g. `appendPQExpBufferChar(buf, *s++);` is
    `appendPQExpBufferChar(buf, s[0]), s = s.slice(1);`. (C only says that s moves before the next statement.)
  -->

  <!-- Is an expression *s++, read (not written to), in a statement that doesn't otherwise use s? -->
  <function name="c:is-read-and-move" as="xs:boolean">
    <param name="expr" as="element()"/>
    <variable name="s" select="$expr/self::pointer_expression[c:operator(.) = '*'][not(@field = 'left' and parent::assignment_expression)]
      /*[@field = 'argument']/self::update_expression[c:operator(.) = '++'][*[1][@field = 'argument']]/identifier[c:is-string(.)]"/>
    <sequence select="exists($s) and count($expr/ancestor::expression_statement[1]//identifier[@declared = $s/@declared]) = 1"/>
  </function>

  <!-- *s++: s[0] -->
  <template match="pointer_expression[c:is-read-and-move(.)]" priority="4">
    <text>{c:js(*[@field = 'argument']/*[@field = 'argument'])}[0]</text>
  </template>

  <!-- A statement with *s++ in it: the statement, then , s = s.slice(1) -->
  <template match="expression_statement[.//pointer_expression[c:is-read-and-move(.)]]" priority="1">
    <apply-templates select="*[1]"/>
    <for-each select=".//pointer_expression[c:is-read-and-move(.)]/*[@field = 'argument']/*[@field = 'argument']">, {c:js(.)} = {c:js(.)}.slice(1)</for-each>
    <apply-templates select="*[1]/following-sibling::node()"/>
  </template>

  <!--
    * WHAT WE CAN'T TRANSLATE
  -->

  <!-- C we can't translate: its text, as ⟦C⟧ -->
  <function name="c:refuse" as="xs:string">
    <param name="expr" as="element()"/>
    <sequence select="'⟦' || string($expr) || '⟧'"/>
  </function>

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

</stylesheet>
