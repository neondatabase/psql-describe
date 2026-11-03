// Translates the parts of psql we need from C to JS, by source-to-source rewriting of
// tree-sitter parse trees: everything is copied verbatim except where a rule applies.
//
// Usage: node translate/translate.ts path/to/postgres/src > translated.mjs

import fs from 'node:fs';
import path from 'node:path';
import type { Node, Parser } from 'web-tree-sitter';
import {
  parserFor, parseOrThrow, must, field, rewrite, type Emit, type Rule,
  declaredName, functionDeclarator, isPrototype, enclosingFunction,
} from './syntax.ts';
import { typeEnv, pointee, isString, isInteger, isWritableString, type Binding, type CType, type TypeEnv } from './ctypes.ts';

export const config = {
  sources: ['bin/psql/command.c', 'bin/psql/describe.c', 'fe_utils/string_utils.c'],
  headerDirs: ['include/catalog', 'include/common', 'include/fe_utils', 'interfaces/libpq', 'bin/psql'],
  entryPoints: ['exec_command_d', 'exec_command_list', 'exec_command_sf_sv'],
  asyncSeeds: ['PSQLexec', 'PQexec'],  // functions provided by the JS runtime that return a Promise
  freeingFunctions: ['free', 'pg_free', 'PQclear', 'termPQExpBuffer', 'destroyPQExpBuffer', 'printTableCleanup'],
  arrayAllocators: ['pg_malloc_array', 'pg_malloc0_array'],  // (type, count) => a new array
  undefinedMacros: ['NOT_USED'],  // never #defined, by Postgres convention
};

/** A top-level C definition */
export interface Definition {
  name: string;
  node: Node;    // function_definition, declaration or preproc_def
  file: string;  // relative to the Postgres src directory
}

export interface Unit extends Definition {
  js: string;    // the translation
}

/** A parsed file: path relative to the Postgres src directory, and root (translation_unit) node */
type SourceTree = [file: string, root: Node];

/* Definitions and references */

const readSource = (pgSrc: string, file: string) => fs.readFileSync(path.join(pgSrc, file), 'utf8');
const defineValue = (def: Node) => field(def, 'value').text.trim();

// Preprocessing that tree-sitter needs: erase annotation macros that expand to nothing on our platforms (and
// would confuse the parse of declarations), and expand C's # stringizing operator (which would otherwise break
// the parse of string concatenations)
function preprocess(src: string, defines = new Map<string, Definition>()): string {
  const expand = (name: string): string => {
    const def = defines.get(name);
    return def ? expand(defineValue(def.node)) : name;
  };
  return src.replace(/\b(?:PGDLLIMPORT|pg_nodiscard|pg_attribute_\w+(?:\([^()]*\))?)/g, '')
    .replace(/\bCppAsString(2?)\((\w+)\)/g, (_, expandFirst: string, arg: string) =>
      '"' + (expandFirst ? expand(arg) : arg).replace(/["\\]/g, '\\$&') + '"');
}

const parseHeaders = (pgSrc: string, parser: Parser): SourceTree[] => config.headerDirs.flatMap(dir =>
  fs.readdirSync(path.join(pgSrc, dir)).filter(f => f.endsWith('.h')).map(f => path.join(dir, f))
    .map((file): SourceTree => [file, parseOrThrow(parser, preprocess(readSource(pgSrc, file)))]));

/** Object-like #defines, keyed by name */
function collectDefines(trees: SourceTree[]): Map<string, Definition> {
  const defines = new Map<string, Definition>();
  for (const [file, root] of trees) {
    for (const node of root.descendantsOfType('preproc_def')) {
      const name = field(node, 'name').text;
      if (node.childForFieldName('value') && !defines.has(name)) defines.set(name, { name, node, file });
    }
  }
  return defines;
}

/** Top-level functions, variables and macros in the C sources, keyed by name */
function collectDefinitions(trees: SourceTree[]): Map<string, Definition> {
  const defs = new Map<string, Definition>();
  const add = (name: string, node: Node, file: string) => defs.has(name) || defs.set(name, { name, node, file });
  for (const [file, root] of trees) {
    for (const fn of root.descendantsOfType('function_definition')) add(field(functionDeclarator(fn), 'declarator').text, fn, file);
    for (const def of root.descendantsOfType('preproc_def')) add(field(def, 'name').text, def, file);
    for (const decl of root.descendantsOfType('declaration')) {
      if (isPrototype(decl) || decl.parent?.type !== 'translation_unit') continue;
      for (const d of decl.childrenForFieldName('declarator')) add(declaredName(d), decl, file);
    }
  }
  return defs;
}

const identifiers = (node: Node) => new Set(node.descendantsOfType('identifier').map(id => id.text));

function localNames(fn: Node): Set<string> {
  const names = new Set<string>();
  for (const p of field(functionDeclarator(fn), 'parameters').namedChildren) {
    const d = p.childForFieldName('declarator');
    if (d) names.add(declaredName(d));
  }
  for (const decl of fn.descendantsOfType('declaration')) {
    for (const d of decl.childrenForFieldName('declarator')) names.add(declaredName(d));
  }
  return names;
}

/** Everything transitively referenced from the entry points, headers first, then in source order */
function slice(defs: Map<string, Definition>, entryPoints: string[]): Definition[] {
  const reached = new Set<string>(), queue = [...entryPoints];
  while (queue.length) {
    const def = defs.get(queue.shift()!);
    if (!def || reached.has(def.name)) continue;
    reached.add(def.name);
    queue.push(...identifiers(def.node));
  }
  const rank = (file: string) => config.sources.indexOf(file);  // headers (-1) first
  return [...reached].map(name => defs.get(name)!)
    .sort((a, b) => rank(a.file) - rank(b.file) || a.file.localeCompare(b.file) || a.node.startIndex - b.node.startIndex)
    .filter((def, i, arr) => def.node.id !== arr[i - 1]?.node.id);  // one declaration may define several names
}

/** A function is async if it calls an async function */
function inferAsync(defs: Definition[], seeds: string[]): Set<string> {
  const async = new Set(seeds);
  const fns = defs.filter(d => d.node.type === 'function_definition');
  for (let changed = true; changed;) {
    changed = false;
    for (const fn of fns) {
      if (async.has(fn.name)) continue;
      const callees = fn.node.descendantsOfType('call_expression').map(c => field(c, 'function').text);
      if (callees.some(c => async.has(c))) {
        async.add(fn.name);
        changed = true;
      }
    }
  }
  return async;
}

/* Rewrite rules */

const hasSideEffects = (n: Node) => n.descendantsOfType(['call_expression', 'assignment_expression', 'update_expression']).length > 0;

/** Does a statement only free memory (which JS doesn't need)? It might be a call to a freeing function, or a
 * block, if or loop containing only such calls (and side-effect-free declarations, e.g. of a loop variable).
 * A loop is assumed not to matter beyond its body's effects. */
function isFreeing(stmt: Node): boolean {
  switch (stmt.type) {
    case 'expression_statement': {
      const call = stmt.firstNamedChild;
      return call?.type === 'call_expression' && config.freeingFunctions.includes(field(call, 'function').text);
    }
    case 'compound_statement': {
      const stmts = stmt.namedChildren.filter(s => s.type !== 'comment');
      return stmts.some(isFreeing) && stmts.every(s => isFreeing(s) || (s.type === 'declaration' && !hasSideEffects(s)));
    }
    case 'if_statement': {
      const alternative = stmt.childForFieldName('alternative')?.lastNamedChild;  // else_clause -> statement
      return !hasSideEffects(field(stmt, 'condition')) && isFreeing(field(stmt, 'consequence')) &&
        (!alternative || isFreeing(alternative));
    }
    case 'for_statement': case 'while_statement': return isFreeing(field(stmt, 'body'));
    default: return false;
  }
}

const isLvalue = (n: Node): boolean => ['identifier', 'field_expression', 'subscript_expression'].includes(n.type) ||
  (n.type === 'parenthesized_expression' && n.firstNamedChild !== null && isLvalue(n.firstNamedChild));

// C we can't translate is marked like this, which is always a JS syntax error
const refuse = (n: Node) => `⟦${n.text}⟧`;

// An expression that can be the operand of a postfix operator (e.g. .slice()) without parentheses
const primaries = ['identifier', 'field_expression', 'subscript_expression', 'call_expression', 'parenthesized_expression', 'string_literal'];
const operand = (n: Node, emit: Emit) => primaries.includes(n.type) ? emit(n) : `(${emit(n)})`;

/* Query fragments */

const literal = (s: string) => JSON.stringify(s);  // a string in a query
const anyOf = (strings: string[]) => strings.map(literal).join(' ');
const NUL = String.raw`'\0'`;

/** A pattern, where it's used as a condition */
const asCondition = (pattern: string) => `[
  (if_statement condition: (parenthesized_expression ${pattern}))
  (while_statement condition: (parenthesized_expression ${pattern}))
  (do_statement condition: (parenthesized_expression ${pattern}))
  (for_statement condition: ${pattern})
  (conditional_expression condition: ${pattern})
  (binary_expression left: ${pattern} operator: ["&&" "||"])
  (binary_expression operator: ["&&" "||"] right: ${pattern})
]`;

/** A pattern, where its value isn't used */
const asStatement = (pattern: string) => `[
  (expression_statement ${pattern})
  (for_statement update: ${pattern})
  (expression_statement (comma_expression [left: ${pattern} right: ${pattern}]))
  (for_statement update: (comma_expression [left: ${pattern} right: ${pattern}]))
]`;

function makeRules({ parser, async, types }: { parser: Parser, async: Set<string>, types: TypeEnv }) {

  /* Control flow */

  // If a label at the top level of a function is followed only by freeing and a return, then goto label is
  // that return. If the label also can't be reached by falling through to it, the label and return are dead.
  type ReturnAfter = { ret: Node, unreachable: boolean } | null;
  const returnsAfter = new Map<string, ReturnAfter>();  // memoised by function node id and label
  const returnAfter = (n: Node, label: string): ReturnAfter => {
    const fn = must(enclosingFunction(n), `function containing label ${label}`), key = `${fn.id}:${label}`;
    if (!returnsAfter.has(key)) {
      const target = fn.descendantsOfType('labeled_statement').find(l => field(l, 'label').text === label);
      const tail: Node[] = [];
      if (target?.parent?.id === field(fn, 'body').id) {
        tail.push(must(target.lastNamedChild, 'labelled statement'));
        for (let s = target.nextNamedSibling; s; s = s.nextNamedSibling) tail.push(s);
      }
      const [ret, ...others] = tail.filter(s => s.type !== 'comment' && !isFreeing(s));
      returnsAfter.set(key, ret?.type === 'return_statement' && others.length === 0 ?
        { ret, unreachable: previousStatement(must(target, 'label'))?.type === 'return_statement' } : null);
    }
    return returnsAfter.get(key)!;
  };
  const previousStatement = (n: Node) => {
    let s = n.previousNamedSibling;
    while (s?.type === 'comment') s = s.previousNamedSibling;
    return s;
  };
  const isDeadReturn = (n: Node) => {  // the return after an unreachable label
    let label = previousStatement(n);
    while (label && label.type !== 'labeled_statement') label = previousStatement(label);
    const after = label && returnAfter(label, field(label, 'label').text);
    return after?.unreachable === true && after.ret.id === n.id;
  };

  /* Values */

  // Scalar and pointer variables whose address is taken (&x) are boxed, as { value }, so the address can be passed around
  const boxedIn = new Map<number, Set<number>>();  // function node id -> ids of boxed variables' declarator identifiers
  const isBoxed = (b: Binding | undefined, at: Node): b is Binding => {
    const fn = enclosingFunction(at);
    if (!b || !fn) return false;
    let boxed = boxedIn.get(fn.id);
    if (!boxed) boxedIn.set(fn.id, boxed = new Set(fn.descendantsOfType('pointer_expression')
      .filter(p => field(p, 'operator').text === '&' && field(p, 'argument').type === 'identifier')
      .map(p => types.lookup(field(p, 'argument').text, p))
      .filter(b => b && !b.isParameter && enclosingFunction(b.node)?.id === fn.id && b.type.kind !== 'struct' && b.type.kind !== 'array')
      .map(b => b!.node.id)));
    return boxed.has(b.node.id);
  };

  // Struct and array values are objects in JS, and C structs contain their nested structs and arrays
  const nestedFields = (t: CType & { kind: 'struct' }, value: (name: string, type: CType) => string | undefined) =>
    [...types.fieldsOf(t.name) ?? []].flatMap(([name, type]) => { const v = value(name, type); return v ? [`${name}: ${v}`] : []; });
  const isAggregate = (t: CType) => t.kind === 'struct' || (t.kind === 'array' && !isString(t));

  function emptyValue(t: CType): string | undefined {
    if (t.kind === 'array') return isString(t) ? "''" : '[]';  // char arrays are strings
    if (t.kind !== 'struct') return;
    const fields = nestedFields(t, (_, type) => emptyValue(type));
    return fields.length ? `{ ${fields.join(', ')} }` : '{}';
  }
  // Copying a struct copies the structs and arrays it contains, so struct types with those get a copy function
  const copiers = new Map<string, string>();  // function name -> source
  function copyOf(js: string, t: CType): string {
    if (t.kind === 'array') return isString(t) ? js : `[...${js}]`;
    if (t.kind !== 'struct') return js;
    const nested = nestedFields(t, (name, type) => isAggregate(type) ? copyOf(`s.${name}`, type) : undefined);
    if (nested.length === 0) return `{ ...${js} }`;
    const fn = `copy_${t.name.replace(/\W/g, '_')}`;
    if (!copiers.has(fn)) copiers.set(fn, `function ${fn}(s) {\n  return { ...s, ${nested.join(', ')} };\n}`);
    return `${fn}(${js})`;
  }
  const isCopyable = (n: Node) => isLvalue(n) && !hasSideEffects(n);

  // JS strings can't be written to, so a slice of one (a pointer into it) can only be passed to a function that won't
  // write through it. We believe a const char * parameter; variadic arguments are taken to be read-only, like printf's.
  const isReadOnlyArgument = (arg: Node) => {
    const args = arg.parent;
    if (args?.type !== 'argument_list') return true;
    const fn = types.typeOf(field(must(args.parent, 'call'), 'function'));
    if (fn?.kind !== 'function') return false;
    const i = args.namedChildren.filter(c => c.type !== 'comment').findIndex(c => c.id === arg.id);
    return i >= fn.params.length || !isWritableString(fn.params[i]);
  };
  const slice = (n: Node, s: Node, from: Node, emit: Emit) => isReadOnlyArgument(n) ? `${operand(s, emit)}.slice(${emit(from)})` : refuse(n);

  const stringType = (n: Node) => isString(types.typeOf(n));

  // Rules apply in order, so earlier rules take precedence (and can wrap later ones using next())
  const rules: Rule[] = [

    /* Memory management and control flow */

    // statements that only free memory go: entirely, in a list of statements; elsewhere (e.g. as an if's body), leaving {}
    { query: '[(compound_statement (_) @node) (case_statement (_) @node) (labeled_statement (_) @node)]',
      rewrite: ({ node }) => isFreeing(node) ? '' : undefined },
    { query: '[(expression_statement) (compound_statement) (if_statement) (for_statement) (while_statement)] @node',
      rewrite: ({ node }) => isFreeing(node) ? '{}' : undefined },

    { query: '(goto_statement label: (_) @label) @node',
      rewrite: ({ node, label }, { splice }) => {
        const after = returnAfter(node, label.text);
        return after ? splice(after.ret) : undefined;  // not emit, which would see a dead return
      } },
    { query: '(labeled_statement label: (_) @label (_) @statement .) @node',
      rewrite: ({ node, label, statement }, { emit }) => {
        const after = returnAfter(node, label.text);
        return after ? (after.unreachable ? '' : emit(statement)) : undefined;
      } },
    { query: '(return_statement) @node', rewrite: ({ node }) => isDeadReturn(node) ? '' : undefined },

    /* Preprocessor */

    { query: '(preproc_def name: (_) @name value: (_) @value) @node',
      rewrite: ({ name, value }) => `const ${name.text} = ${value.text.trim()};` },
    { query: `((preproc_ifdef "#ifdef" name: (_) @name !alternative) @node (#any-of? @name ${anyOf(config.undefinedMacros)}))`,
      rewrite: () => '' },
    { query: '((preproc_call directive: (_) @directive) @node (#eq? @directive "#undef"))', rewrite: () => '' },

    // a macro defined within a function becomes a local arrow function
    { query: '(preproc_function_def name: (_) @name parameters: (_) @params value: (_) @value) @node',
      rewrite: ({ name, params, value }) => {
        const wrapper = parseOrThrow(parser, `void f(void) { return ${value.text.replace(/\\\n/g, '\n').trim()}; }`);
        const body = must(wrapper.descendantsOfType('return_statement')[0]?.firstNamedChild, 'macro body expression');
        return `const ${name.text} = (${params.namedChildren.map(p => p.text).join(', ')}) => ${rewrite(body, rules)};\n`;
      } },

    /* Declarations */

    // drop return and parameter types; mark async functions
    { query: '(function_definition body: (_) @body) @node',
      rewrite: ({ node, body }, { emit }) => {
        const fn = functionDeclarator(node), name = field(fn, 'declarator').text;
        const params = field(fn, 'parameters').namedChildren
          .map(p => p.childForFieldName('declarator')).filter(d => d !== null).map(declaredName);
        return `${async.has(name) ? 'async ' : ''}function ${name}(${params.join(', ')})` +
          node.text.slice(fn.endIndex - node.startIndex, body.startIndex - node.startIndex) + emit(body);
      } },

    // replace types with let; give struct and array variables a value, box variables whose address is taken,
    // and copy structs assigned from other structs
    { query: '(declaration type: (_) @type) @node',
      rewrite: ({ node, type }, { emit, splice }) => {
        if (isPrototype(node)) return '';
        const base = types.baseType(type), declarators = node.childrenForFieldName('declarator');
        return 'let ' + splice(node, declarators[0].startIndex, child => {
          if (!declarators.some(d => d.id === child.id)) return emit(child);
          const { name, type, node: id } = types.declare(base, child);
          const value = child.type === 'init_declarator' ? field(child, 'value') : null;
          const init = id && isBoxed(types.lookup(name, id), id) ? `{${value ? ` value: ${emit(value)} ` : ''}}` :
            value ? (type.kind === 'struct' && isCopyable(value) ? copyOf(emit(value), type) : emit(value)) :
            emptyValue(type);
          return init ? `${name} = ${init}` : name;
        });
      } },
    { query: '(initializer_list ["{" "}"] @node)', rewrite: ({ node }) => node.type === '{' ? '[' : ']' },

    /* Strings */

    // In C, a string (char *) is true when not NULL; in JS, the empty string is false
    { query: asCondition('(unary_expression operator: "!" argument: (_) @s) @node'),
      rewrite: ({ s }, { emit }) => stringType(s) ? `${operand(s, emit)} == NULL` : undefined },
    { query: '(unary_expression operator: "!" argument: (_) @s) @node',
      rewrite: ({ s }, { emit }) => stringType(s) ? `(${operand(s, emit)} == NULL)` : undefined },
    { query: asCondition('(_) @node'), rewrite: ({ node }, { next }) => stringType(node) ? `${operand(node, next)} != NULL` : undefined },

    // '\0' marks the end of a C string, and reading past the end of a JS string gives undefined
    { query: `((char_literal) @node (#eq? @node ${literal(NUL)}))`, rewrite: () => 'undefined' },

    // *s is the first character of a string, but we can't write to it, or move s within it
    { query: `[
        (assignment_expression left: (pointer_expression operator: "*" argument: (_) @s) @node)
        (update_expression argument: (pointer_expression operator: "*" argument: (_) @s) @node)
        (pointer_expression operator: "*" argument: (update_expression argument: (_) @s)) @node
      ]`,
      rewrite: ({ node, s }) => stringType(s) ? refuse(node) : undefined },
    { query: '(pointer_expression operator: "*" argument: (_) @s) @node',
      rewrite: ({ s }, { emit }) => stringType(s) ? `${operand(s, emit)}[0]` : undefined },

    // a char * is modelled as the string suffix it points to: &s[i] and s + n are slices, and s++ drops the first
    // character (we can't go back, though, and we don't model other pointer arithmetic, so refuse it)
    { query: '(pointer_expression operator: "&" argument: (subscript_expression argument: (_) @s index: (_) @i)) @node',
      rewrite: ({ node, s, i }, { emit }) => !stringType(s) ? undefined : i.text === '0' ? emit(s) : slice(node, s, i, emit) },
    { query: '(binary_expression left: (_) @s operator: "+" right: (_) @n) @node',
      rewrite: ({ node, s, n }, { emit }) => stringType(s) && !pointee(types.typeOf(n)) ? slice(node, s, n, emit) : undefined },
    { query: '(assignment_expression left: (_) @s operator: "+=" right: (_) @n) @node',
      rewrite: ({ s, n }, { emit }) => stringType(s) && !hasSideEffects(s) ? `${emit(s)} = ${operand(s, emit)}.slice(${emit(n)})` : undefined },
    { query: asStatement('[(update_expression argument: (_) @s operator: "++") (update_expression operator: "++" argument: (_) @s)] @node'),
      rewrite: ({ s }, { emit }) => stringType(s) ? `${emit(s)} = ${operand(s, emit)}.slice(1)` : undefined },
    { query: '(update_expression operator: "++" argument: (_) @s) @node',  // prefix (++s), so the value is the incremented pointer
      rewrite: ({ s }, { emit }) => stringType(s) ? `(${emit(s)} = ${operand(s, emit)}.slice(1))` : undefined },
    { query: '[(update_expression argument: (_) @p) (assignment_expression left: (_) @p operator: ["+=" "-="])] @node',
      rewrite: ({ node, p }) => pointee(types.typeOf(p)) ? refuse(node) : undefined },
    { query: '(binary_expression left: (_) @left operator: ["+" "-" "<" "<=" ">" ">="] right: (_) @right) @node',
      rewrite: ({ node, left, right }) => pointee(types.typeOf(left)) || pointee(types.typeOf(right)) ? refuse(node) : undefined },

    // s[i] = '\0' truncates a string
    { query: `((assignment_expression left: (subscript_expression argument: (_) @s index: (_) @i) right: (char_literal) @nul) @node
        (#eq? @nul ${literal(NUL)}))`,
      rewrite: ({ s, i }, { emit }) => stringType(s) && !hasSideEffects(s) ? `${emit(s)} = ${emit(s)}.slice(0, ${emit(i)})` : undefined },

    // snprintf(buf, size, format, ...) => buf = sprintf(format, ...)
    { query: `(${asStatement('(call_expression function: (identifier) @fn arguments: (argument_list . (_) @buf . (_) . (_) @format) @args) @node')}
        (#eq? @fn "snprintf"))`,
      rewrite: ({ buf, format, args }, { emit, splice }) => `${emit(buf)} = sprintf(${splice(args, format.startIndex)}` },

    /* Pointers and structs */

    { query: '(identifier) @node',  // a boxed variable
      rewrite: ({ node }) => {
        const b = types.lookup(node.text, node);
        return isBoxed(b, node) && b.node.id !== node.id ? `${node.text}.value` : undefined;
      } },
    // &x is the box itself if x is boxed, and just x if it's a struct or array, since JS objects are already references
    { query: '(pointer_expression operator: "&" argument: (identifier) @x) @node',
      rewrite: ({ x }) => isBoxed(types.lookup(x.text, x), x) ? x.text : undefined },
    { query: '(pointer_expression operator: "&" argument: (_) @x) @node',
      rewrite: ({ x }, { emit }) => ['struct', 'array'].includes(types.typeOf(x)?.kind ?? '') ? emit(x) : undefined },
    // *p is just p if p points to a struct, and otherwise p is an out-parameter, i.e. a box
    { query: '(pointer_expression operator: "*" argument: (_) @p) @node',
      rewrite: ({ p }, { emit }) => {
        const to = pointee(types.typeOf(p));
        return to?.kind === 'struct' ? emit(p) : to ? `${operand(p, emit)}.value` : undefined;
      } },
    { query: '(field_expression operator: "->" @node)', rewrite: () => '.' },

    // assigning a struct copies it
    { query: '(assignment_expression left: (_) @left operator: "=" right: (_) @right) @node',
      rewrite: ({ left, right }, { emit }) => {
        const type = types.typeOf(left);
        return type?.kind === 'struct' && isCopyable(right) ? `${emit(left)} = ${copyOf(emit(right), type)}` : undefined;
      } },

    /* Other expressions */

    { query: '(cast_expression value: (_) @value) @node', rewrite: ({ value }, { emit }) => emit(value) },
    { query: '(binary_expression left: (_) @left operator: "/" right: (_) @right) @node',
      rewrite: ({ left, right }, { next }) => isInteger(types.typeOf(left)) && isInteger(types.typeOf(right)) ? `Math.trunc(${next()})` : undefined },

    { query: `((call_expression function: (identifier) @fn) @node (#any-of? @fn ${anyOf(config.arrayAllocators)}))`, rewrite: () => '[]' },
    { query: `[
        (field_expression argument: (call_expression function: (identifier) @fn) @node)
        (subscript_expression argument: (call_expression function: (identifier) @fn) @node)
        (call_expression function: (call_expression function: (identifier) @fn) @node)
      ]`,
      rewrite: ({ node, fn }, { splice }) => async.has(fn.text) ? `(await ${splice(node)})` : undefined },
    { query: '(call_expression function: (identifier) @fn) @node',
      rewrite: ({ node, fn }, { splice }) => async.has(fn.text) ? `await ${splice(node)}` : undefined },

    // adjacent string literals: merge those on the same line, and join lines with +
    { query: '(concatenated_string) @node',
      rewrite: ({ node }) => node.namedChildren.reduce((out, s, i, all) => {
        if (i === 0) return s.text;
        const gap = node.text.slice(all[i - 1].endIndex - node.startIndex, s.startIndex - node.startIndex);
        return gap.includes('\n') ? out + ' +' + gap + s.text : out.slice(0, -1) + s.text.slice(1);
      }, '') },
  ];
  return { rules, copiers };
}

/* Main */

export async function translate(pgSrc: string): Promise<{ units: Unit[], externals: string[], code: string }> {
  const parser = await parserFor('c');
  const headers = parseHeaders(pgSrc, parser);
  const defines = collectDefines(headers);
  const sources = config.sources.map((file): SourceTree => [file, parseOrThrow(parser, preprocess(readSource(pgSrc, file), defines))]);
  const types = typeEnv(parser, [...headers, ...sources].map(([, root]) => root));

  const defs = new Map([...defines, ...collectDefinitions(sources)]);  // sources shadow headers
  const sliced = slice(defs, config.entryPoints);
  const { rules, copiers } = makeRules({ parser, async: inferAsync(sliced, config.asyncSeeds), types });
  const units: Unit[] = sliced.map(def => ({ ...def, js: rewrite(def.node, rules) }));

  const externals = new Set(units.filter(u => u.node.type === 'function_definition').flatMap(u => {
    const locals = localNames(u.node);
    return [...identifiers(u.node)].filter(id => !locals.has(id) && !defs.has(id));
  }));

  const fromHeaders = units.filter(u => !config.sources.includes(u.file));
  const code = [`/* from headers */\n\n${fromHeaders.map(u => u.js).join('\n')}`,
    `/* struct copies */\n\n${[...copiers.values()].join('\n\n')}`,
    ...config.sources.map(file => `/* from ${file} */\n\n${units.filter(u => u.file === file).map(u => u.js).join('\n\n')}`),
  ].join('\n\n');

  return { units, externals: [...externals].sort(), code };
}

if (import.meta.main) {
  const pgSrc = process.argv[2];
  if (!pgSrc) throw new Error('Usage: node translate/translate.ts path/to/postgres/src');
  console.log((await translate(pgSrc)).code);
}
