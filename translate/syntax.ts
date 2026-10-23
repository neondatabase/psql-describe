// Generic helpers for tree-sitter parse trees: parsing, rewriting, and C declarators

import { createRequire } from 'node:module';
import { Parser, Language, type Node } from 'web-tree-sitter';

/* Parsing */

await Parser.init();
const require = createRequire(import.meta.url);

export async function parserFor(grammar: 'c' | 'javascript'): Promise<Parser> {
  const parser = new Parser();
  parser.setLanguage(await Language.load(require.resolve(`tree-sitter-${grammar}/tree-sitter-${grammar}.wasm`)));
  return parser;
}

export function must<T>(value: T | null | undefined, what: string): T {
  if (value == null) throw new Error(`Missing ${what}`);
  return value;
}

export const parseOrThrow = (parser: Parser, src: string): Node => must(parser.parse(src), 'parse tree').rootNode;

/** The child in a named field, which must be present */
export const field = (node: Node, name: string): Node =>
  must(node.childForFieldName(name), `'${name}' field of ${node.type} at line ${node.startPosition.row + 1}`);

/* Rewriting */

/** Emits a node as JS */
export type Emit = (node: Node) => string;
/** Emits a node's own text (from `from` onwards), with each child emitted by `emitChild` */
export type Splice = (node: Node, from?: number, emitChild?: Emit) => string;
/** Returns replacement text for a node, or undefined to keep the default, which is splice(node) */
export type Rule = (node: Node, emit: Emit, splice: Splice) => string | undefined;
/** Rules keyed by node type: either a named node (e.g. 'call_expression') or an anonymous token (e.g. '->') */
export type Rules = Record<string, Rule>;

// Re-emit a node's source text, applying rules to it and its descendants. Text between children
// (whitespace and anything else the grammar treats as 'extra') is kept verbatim, except that
// whitespace before a child that emits nothing is dropped too (so deletions leave no blank lines).
export function rewrite(node: Node, rules: Rules): string {
  const { text: src, startIndex: base } = node;
  const emit: Emit = n => rules[n.type]?.(n, emit, splice) ?? splice(n);
  const splice: Splice = (n, from = n.startIndex, emitChild = emit) => {
    let out = '', pos = from;
    for (const child of n.children) {
      if (child.startIndex < from) continue;
      const gap = src.slice(pos - base, child.startIndex - base), js = emitChild(child);
      out += (js === '' && gap.trim() === '' ? '' : gap) + js;
      pos = child.endIndex;
    }
    return out + src.slice(pos - base, n.endIndex - base);
  };
  return emit(node);
}

/* C declarators */

// The tree-sitter-c node shapes used most, with their fields (+ multiple, ? optional), from
// tree-sitter-c/src/node-types.json:
//
//   function_definition    type, declarator, body
//   function_declarator    declarator, parameters (a parameter_list of parameter_declaration)
//   parameter_declaration  type, declarator?
//   declaration            type, declarator+
//   init_declarator        declarator, value
//   pointer_declarator     declarator         e.g. *x
//   array_declarator       declarator, size?  e.g. x[10]
//   parenthesized_declarator  (no fields: one named child)
//   type_definition        type, declarator+
//   struct_specifier       name?, body? (a field_declaration_list of field_declaration: type, declarator+)
//   preproc_def            name, value?
//   pointer_expression     operator (& or *), argument
//   field_expression       argument, operator (. or ->), field
//   subscript_expression   argument, index
//   binary_expression      left, operator, right
//   assignment_expression  left, operator, right
//   update_expression      operator, argument (operator first for prefix ++/--)
//   call_expression        function, arguments
//   cast_expression        type (a type_descriptor: type, declarator?), value
//   if_statement           condition, consequence, alternative? (an else_clause)
//   for_statement          initializer?, condition?, update?, body
//   labeled_statement      label, then the labelled statement (unnamed)
//   concatenated_string    (no fields: string_literal children)
//
// A declarator wraps either another declarator or, ultimately, the identifier being declared.

export const innerDeclarator = (d: Node): Node =>
  d.childForFieldName('declarator') ?? must(d.firstNamedChild, `declarator inside ${d.type}`);

export function declaredName(d: Node): string {
  while (d.type !== 'identifier') d = innerDeclarator(d);
  return d.text;
}

export function functionDeclarator(fn: Node): Node {
  let d = field(fn, 'declarator');
  while (d.type !== 'function_declarator') d = innerDeclarator(d);
  return d;
}

export const isPrototype = (decl: Node): boolean => decl.childrenForFieldName('declarator').some(d => {
  for (; d.type !== 'identifier'; d = innerDeclarator(d)) if (d.type === 'function_declarator') return true;
  return false;
});

export const enclosingFunction = (n: Node | null): Node | null => {
  while (n && n.type !== 'function_definition') n = n.parent;
  return n;
};
