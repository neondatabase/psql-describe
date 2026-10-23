// A C type system just rich enough for the translator's type-directed rules. Types come from the
// declarations in the headers and sources (plus a few libc prototypes), and expressions are typed
// bottom-up. Anything we can't type is undefined, and the rules then leave it alone.

import type { Node, Parser } from 'web-tree-sitter';
import { field, functionDeclarator, enclosingFunction, must, parseOrThrow } from './syntax.ts';

export type CType =
  | { kind: 'scalar', name: string, isConst?: boolean }  // e.g. int, char, bool, Oid
  | { kind: 'struct', name: string }  // a tag, or a made-up name for an anonymous struct
  | { kind: 'pointer', to: CType }
  | { kind: 'array', of: CType }
  | { kind: 'function', returns: CType, params: CType[] };

/** A declared variable, parameter or function */
export interface Binding {
  type: CType;
  node: Node;  // the identifier in its declarator
  isParameter: boolean;
}

const scalar = (name: string): CType => ({ kind: 'scalar', name });
const int = scalar('int'), char = scalar('char');
const pointer = (to: CType): CType => ({ kind: 'pointer', to });

export const pointee = (t?: CType) => t?.kind === 'pointer' ? t.to : t?.kind === 'array' ? t.of : undefined;
export const isString = (t?: CType) => { const p = pointee(t); return p?.kind === 'scalar' && p.name === 'char'; };
export const isInteger = (t?: CType) => t?.kind === 'scalar' && !['double', 'float', 'void'].includes(t.name);
/** A char * that may be written through (i.e. not a const char *) */
export const isWritableString = (t?: CType) => t?.kind === 'pointer' && t.to.kind === 'scalar' && t.to.name === 'char' && !t.to.isConst;

// libc functions whose types matter
const libc = `
char *strchr(const char *s, int c);
char *strrchr(const char *s, int c);
char *strstr(const char *haystack, const char *needle);
size_t strlen(const char *s);
`;

export type TypeEnv = ReturnType<typeof typeEnv>;

/** Types declared in the given translation units, and the means to type expressions within them */
export function typeEnv(parser: Parser, roots: Node[]) {
  const typedefs = new Map<string, Node>();          // typedef name -> its declarator in a type_definition
  const resolvedTypedefs = new Map<string, CType>();
  const structBodies = new Map<string, Node>();      // struct name -> field_declaration_list
  const structFields = new Map<string, Map<string, CType>>();
  const globals = new Map<string, Binding>();
  const scopes = new Map<number, Map<string, Binding>>();  // by function, block or for loop node id
  const noBindings = new Map<string, Binding>();

  function baseType(t: Node): CType {
    switch (t.type) {
      case 'type_identifier': return resolveTypedef(t.text) ?? scalar(t.text);
      case 'struct_specifier': case 'union_specifier': {
        const name = t.childForFieldName('name')?.text ?? `anonymous@${t.id}`, body = t.childForFieldName('body');
        if (body && !structBodies.has(name)) structBodies.set(name, body);
        return { kind: 'struct', name };
      }
      case 'enum_specifier': return int;
      default: return scalar(t.text.replace(/\s+/g, ' '));  // primitive_type, sized_type_specifier (e.g. unsigned int), ...
    }
  }

  function resolveTypedef(name: string): CType | undefined {
    const d = typedefs.get(name);
    if (d && !resolvedTypedefs.has(name)) resolvedTypedefs.set(name, declare(baseType(field(must(d.parent, 'type_definition'), 'type')), d).type);
    return resolvedTypedefs.get(name);
  }

  // Apply a declarator to a base type: the outermost declarator applies first, so `char *x[3]` is
  // pointer_declarator(array_declarator(x)), making x an array of char pointers
  function declare(t: CType, d: Node | null): { name: string, type: CType, node: Node | null } {
    if (!d) return { name: '', type: t, node: null };  // an abstract declarator, e.g. in a cast
    switch (d.type) {
      case 'pointer_declarator': case 'abstract_pointer_declarator': return declare(pointer(t), d.childForFieldName('declarator'));
      case 'array_declarator': case 'abstract_array_declarator': return declare({ kind: 'array', of: t }, d.childForFieldName('declarator'));
      case 'function_declarator': case 'abstract_function_declarator': {
        const params = field(d, 'parameters').namedChildren.filter(p => p.type === 'parameter_declaration')
          .map(p => declared(p)[0]?.type ?? qualifiedBaseType(p));
        return declare({ kind: 'function', returns: t, params }, d.childForFieldName('declarator'));
      }
      case 'init_declarator': return declare(t, field(d, 'declarator'));
      case 'parenthesized_declarator': case 'abstract_parenthesized_declarator': return declare(t, d.firstNamedChild);
      default: return { name: d.text, type: t, node: d };  // identifier, field_identifier or type_identifier
    }
  }

  /** The base type of a declaration, parameter_declaration or field_declaration, which may be const (as in const char *s) */
  const qualifiedBaseType = (decl: Node): CType => {
    const base = baseType(field(decl, 'type'));
    const isConst = decl.children.some(c => c.type === 'type_qualifier' && c.text === 'const');
    return isConst && base.kind === 'scalar' ? { ...base, isConst } : base;
  };

  /** The names declared by a declaration, parameter_declaration or field_declaration */
  const declared = (decl: Node) => {
    const base = qualifiedBaseType(decl);
    return decl.childrenForFieldName('declarator').map(d => declare(base, d));
  };

  const bindings = (decls: Node[], isParameter = false) => new Map(decls.flatMap(declared)
    .filter(d => d.node !== null).map(({ name, type, node }) => [name, { type, node: node!, isParameter }]));

  function scopeOf(n: Node): Map<string, Binding> {
    if (!['function_definition', 'compound_statement', 'for_statement'].includes(n.type)) return noBindings;
    let scope = scopes.get(n.id);
    if (!scope) scopes.set(n.id, scope =
      n.type === 'function_definition' ? bindings(field(functionDeclarator(n), 'parameters').namedChildren
        .filter(p => p.type === 'parameter_declaration'), true) :
      n.type === 'compound_statement' ? bindings(n.namedChildren.filter(s => s.type === 'declaration')) :
      bindings([n.childForFieldName('initializer')].filter(i => i?.type === 'declaration') as Node[]));
    return scope;
  }

  /** The declaration that an identifier at a given node refers to */
  function lookup(name: string, at: Node): Binding | undefined {
    for (let n: Node | null = at; n; n = n.parent) {
      const binding = scopeOf(n).get(name);
      if (binding) return binding;
    }
    return globals.get(name);
  }

  function fieldsOf(struct: string): Map<string, CType> | undefined {
    const body = structBodies.get(struct);
    if (body && !structFields.has(struct)) structFields.set(struct, new Map(body.descendantsOfType('field_declaration')
      .filter(f => f.parent?.id === body.id || f.parent?.type.startsWith('preproc_'))  // not those of nested structs
      .flatMap(declared).map(({ name, type }) => [name, type])));
    return structFields.get(struct);
  }

  function typeOf(e: Node): CType | undefined {
    switch (e.type) {
      case 'identifier': return lookup(e.text, e)?.type;
      case 'string_literal': case 'concatenated_string': return pointer(char);
      case 'char_literal': return char;
      case 'number_literal': return /^0x/i.test(e.text) || !/[.e]/i.test(e.text) ? int : scalar('double');
      case 'true': case 'false': return scalar('bool');
      case 'null': return pointer(scalar('void'));
      case 'sizeof_expression': return scalar('size_t');
      case 'parenthesized_expression': return e.firstNamedChild ? typeOf(e.firstNamedChild) : undefined;
      case 'comma_expression': return typeOf(field(e, 'right'));
      case 'assignment_expression': return typeOf(field(e, 'left'));
      case 'update_expression': return typeOf(field(e, 'argument'));
      case 'conditional_expression': return typeOf(field(e, 'alternative'));
      case 'cast_expression': {
        const descriptor = field(e, 'type');
        return declare(baseType(field(descriptor, 'type')), descriptor.childForFieldName('declarator')).type;
      }
      case 'field_expression': {
        let t = typeOf(field(e, 'argument'));
        if (field(e, 'operator').text === '->') t = pointee(t);
        return t?.kind === 'struct' ? fieldsOf(t.name)?.get(field(e, 'field').text) : undefined;
      }
      case 'subscript_expression': return pointee(typeOf(field(e, 'argument')));
      case 'pointer_expression': {
        const t = typeOf(field(e, 'argument'));
        return field(e, 'operator').text === '&' ? t && pointer(t) : pointee(t);
      }
      case 'call_expression': {
        let t = typeOf(field(e, 'function'));
        if (t?.kind === 'pointer') t = t.to;  // a function pointer
        return t?.kind === 'function' ? t.returns : undefined;
      }
      case 'unary_expression': return field(e, 'operator').text === '!' ? int : typeOf(field(e, 'argument'));
      case 'binary_expression': {
        const op = field(e, 'operator').text, l = typeOf(field(e, 'left')), r = typeOf(field(e, 'right'));
        if ((op === '+' || op === '-') && (pointee(l) || pointee(r))) return pointee(l) && pointee(r) ? int : pointee(l) ? l : r;
        if (['+', '-', '*', '/', '%'].includes(op)) return l && r && isInteger(l) && isInteger(r) ? int : undefined;
        return int;  // comparison, logical and bitwise operators
      }
      default: return undefined;
    }
  }

  // Collect typedefs and struct bodies, then global declarations (including prototypes), which may use them
  const allRoots = [parseOrThrow(parser, libc), ...roots];
  for (const root of allRoots) {
    for (const td of root.descendantsOfType('type_definition')) {
      for (const d of td.childrenForFieldName('declarator')) {
        let name = d;
        while (name.type !== 'type_identifier') name = must(name.childForFieldName('declarator') ?? name.firstNamedChild, `typedef name in ${td.text}`);
        typedefs.set(name.text, d);
      }
    }
    for (const s of root.descendantsOfType(['struct_specifier', 'union_specifier'])) {
      const name = s.childForFieldName('name')?.text, body = s.childForFieldName('body');
      if (name && body && !structBodies.has(name)) structBodies.set(name, body);
    }
  }
  const topLevel = (n: Node) => !enclosingFunction(n.parent);
  for (const root of allRoots) {
    for (const [name, binding] of bindings(root.descendantsOfType('declaration').filter(topLevel))) {
      if (!globals.has(name)) globals.set(name, binding);
    }
    for (const fn of root.descendantsOfType('function_definition')) {
      const { name, type, node } = declare(baseType(field(fn, 'type')), field(fn, 'declarator'));
      if (node && !globals.has(name)) globals.set(name, { type, node, isParameter: false });
    }
  }

  return { baseType, declare, lookup, fieldsOf, typeOf };
}
