<?xml version="1.0" encoding="UTF-8"?>
<!--
  WHAT GOES: MEMORY MANAGEMENT

  JS manages memory itself, so C that frees memory goes, and so do the gotos that lead to it, which become returns.
  Allocating an array is just [].
-->
<stylesheet
  version="3.0"
  expand-text="yes"
  xmlns="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:c="urn:c-to-js"
  exclude-result-prefixes="#all">

  <!--
    * FREEING MEMORY

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
    <variable name="statements" select="c:inner($statement/self::compound_statement)"/>
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

  <!--
    * ALLOCATING ARRAYS
  -->

  <!-- pg_malloc_array(type, count) and pg_malloc0_array(type, count) allocate an array, which in JS is just [] (and
       the type, which isn't an expression, doesn't parse) -->
  <param name="array-allocators" select="'pg_malloc_array', 'pg_malloc0_array'"/>

  <function name="c:is-array-allocation" as="xs:boolean">
    <param name="expr" as="element()"/>
    <sequence select="exists($expr/self::call_expression[*[@field = 'function'] = $array-allocators])"/>
  </function>

  <template match="call_expression[c:is-array-allocation(.)]">[]</template>

  <!--
    * GOTOS

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

</stylesheet>
