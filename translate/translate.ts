// Translates the parts of psql we need from C to JS, by source-to-source rewriting of
// tree-sitter parse trees: everything is copied verbatim except where a rule applies.
//
// Usage: node translate/translate.ts path/to/postgres/src > translated.mjs

import fs from 'node:fs';
import path from 'node:path';
import type { Node, Parser } from 'web-tree-sitter';
import {
  parserFor, parseOrThrow, must, field, rewrite, type Emit, type Rule, type Rules, type Splice,
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

/** Is an expression evaluated only for its side effects (so that its value can be anything)? */
const isStatement = (n: Node): boolean => {
  const p = n.parent;
  return p?.type === 'expression_statement' || (p?.type === 'for_statement' && p.childForFieldName('update')?.id === n.id) ||
    (p?.type === 'comma_expression' && isStatement(p));
};

const isWrittenTo = (n: Node) => (n.parent?.type === 'assignment_expression' && field(n.parent, 'left').id === n.id) ||
  n.parent?.type === 'update_expression';

const isLvalue = (n: Node): boolean => ['identifier', 'field_expression', 'subscript_expression'].includes(n.type) ||
  (n.type === 'parenthesized_expression' && n.firstNamedChild !== null && isLvalue(n.firstNamedChild));

// C we can't translate is marked like this, which is always a JS syntax error
const refuse = (n: Node) => `⟦${n.text}⟧`;

// An expression that can be the operand of a postfix operator (e.g. .slice()) without parentheses
const primaries = ['identifier', 'field_expression', 'subscript_expression', 'call_expression', 'parenthesized_expression', 'string_literal'];
const operand = (n: Node, emit: Emit) => primaries.includes(n.type) ? emit(n) : `(${emit(n)})`;

function makeRules({ parser, async, types }: { parser: Parser, async: Set<string>, types: TypeEnv }) {
  const inInitializerList = (n: Node) => n.parent?.type === 'initializer_list';

  /* Memory management and control flow */

  // A deleted statement in a list of statements can just go; elsewhere (e.g. as an if's body) it leaves an empty block
  const statementLists = ['compound_statement', 'case_statement', 'labeled_statement'];
  const dropFreeing: Rule = n => isFreeing(n) ? (statementLists.includes(n.parent?.type ?? '') ? '' : '{}') : undefined;

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

  // In C, a string (char *) is true when not NULL; in JS, the empty string is false
  const condition = (e: Node, emit: Emit) => isString(types.typeOf(e)) ? `${operand(e, emit)} != NULL` : emit(e);
  const withConditions = (n: Node, conditions: (Node | null)[], emit: Emit, splice: Splice) =>
    splice(n, n.startIndex, child => conditions.some(c => c?.id === child.id) ? condition(child, emit) : emit(child));

  const rules: Rules = {
    expression_statement: dropFreeing,
    compound_statement: dropFreeing,
    if_statement: dropFreeing,
    for_statement: (n, emit, splice) => dropFreeing(n, emit, splice) ?? withConditions(n, [n.childForFieldName('condition')], emit, splice),
    while_statement: dropFreeing,

    goto_statement: (n, emit, splice) => {
      const after = returnAfter(n, field(n, 'label').text);
      return after ? splice(after.ret) : undefined;  // not emit, which would see a dead return
    },
    labeled_statement: (n, emit) => {
      const after = returnAfter(n, field(n, 'label').text);
      return after ? (after.unreachable ? '' : emit(must(n.lastNamedChild, 'labelled statement'))) : undefined;
    },
    return_statement: n => isDeadReturn(n) ? '' : undefined,

    /* Preprocessor */

    preproc_def: n => `const ${field(n, 'name').text} = ${defineValue(n)};`,
    preproc_ifdef: n => n.firstChild?.text === '#ifdef' && config.undefinedMacros.includes(field(n, 'name').text) &&
      !n.childForFieldName('alternative') ? '' : undefined,
    preproc_call: n => field(n, 'directive').text === '#undef' ? '' : undefined,

    // a macro defined within a function becomes a local arrow function
    preproc_function_def: n => {
      const params = field(n, 'parameters').namedChildren.map(p => p.text).join(', ');
      const value = must(n.childForFieldName('value'), 'macro body').text.replace(/\\\n/g, '\n').trim();
      const wrapper = parseOrThrow(parser, `void f(void) { return ${value}; }`);
      const body = must(wrapper.descendantsOfType('return_statement')[0]?.firstNamedChild, 'macro body expression');
      return `const ${field(n, 'name').text} = (${params}) => ${rewrite(body, rules)};\n`;
    },

    /* Declarations */

    // drop return and parameter types; mark async functions
    function_definition: (n, emit) => {
      const fn = functionDeclarator(n), name = field(fn, 'declarator').text, body = field(n, 'body');
      const params = field(fn, 'parameters').namedChildren
        .map(p => p.childForFieldName('declarator')).filter(d => d !== null).map(declaredName);
      return `${async.has(name) ? 'async ' : ''}function ${name}(${params.join(', ')})` +
        n.text.slice(fn.endIndex - n.startIndex, body.startIndex - n.startIndex) + emit(body);
    },

    // replace types with let; give struct and array variables a value, box variables whose address is taken,
    // and copy structs assigned from other structs
    declaration: (n, emit, splice) => {
      if (isPrototype(n)) return '';
      const base = types.baseType(field(n, 'type')), declarators = n.childrenForFieldName('declarator');
      return 'let ' + splice(n, declarators[0].startIndex, child => {
        if (!declarators.some(d => d.id === child.id)) return emit(child);
        const { name, type, node } = types.declare(base, child);
        const value = child.type === 'init_declarator' ? field(child, 'value') : null;
        const init = node && isBoxed(types.lookup(name, node), node) ? `{${value ? ` value: ${emit(value)} ` : ''}}` :
          value ? (type.kind === 'struct' && isCopyable(value) ? copyOf(emit(value), type) : emit(value)) :
          emptyValue(type);
        return init ? `${name} = ${init}` : name;
      });
    },
    '{': n => inInitializerList(n) ? '[' : undefined,
    '}': n => inInitializerList(n) ? ']' : undefined,

    /* Expressions */

    identifier: n => {
      const b = types.lookup(n.text, n);
      return isBoxed(b, n) && b.node.id !== n.id ? `${n.text}.value` : undefined;
    },

    cast_expression: (n, emit) => emit(field(n, 'value')),
    '->': () => '.',

    pointer_expression: (n, emit) => {
      const arg = field(n, 'argument'), type = types.typeOf(arg);
      if (field(n, 'operator').text === '&') {
        if (arg.type === 'identifier' && isBoxed(types.lookup(arg.text, arg), arg)) return arg.text;  // the box itself
        if (type?.kind === 'struct' || type?.kind === 'array') return emit(arg);  // already a reference
        if (arg.type === 'subscript_expression' && isString(types.typeOf(field(arg, 'argument')))) {  // &s[i]: a suffix
          const s = field(arg, 'argument'), i = field(arg, 'index');
          return i.text === '0' ? emit(s) : slice(n, s, i, emit);
        }
        return;
      }
      if (isString(type)) {  // *s is the first character, but we can't write to it, or move s within it
        return isWrittenTo(n) || arg.type === 'update_expression' ? refuse(n) : `${operand(arg, emit)}[0]`;
      }
      if (pointee(type)?.kind === 'struct') return emit(arg);
      if (pointee(type)) return `${operand(arg, emit)}.value`;  // an out-parameter: a box
    },

    // '\0' marks the end of a C string, and reading past the end of a JS string gives undefined
    char_literal: n => n.text === "'\\0'" ? 'undefined' : undefined,

    // s++ moves to the next character of a string, i.e. drops the first (but there's no going back). We don't
    // model any other pointer arithmetic, so refuse it.
    update_expression: (n, emit) => {
      const arg = field(n, 'argument'), type = types.typeOf(arg);
      if (!pointee(type)) return;
      if (!isString(type) || field(n, 'operator').text === '--') return refuse(n);
      const js = `${emit(arg)} = ${operand(arg, emit)}.slice(1)`;
      return isStatement(n) ? js : n.firstChild?.type === '++' ? `(${js})` : refuse(n);  // prefix: the value is the result
    },

    assignment_expression: (n, emit) => {
      const left = field(n, 'left'), right = field(n, 'right');
      if (left.type === 'subscript_expression' && right.text === "'\\0'") {  // s[i] = '\0' truncates a string
        const s = field(left, 'argument');
        if (isString(types.typeOf(s)) && !hasSideEffects(s)) return `${emit(s)} = ${emit(s)}.slice(0, ${emit(field(left, 'index'))})`;
      }
      const op = field(n, 'operator').text, type = types.typeOf(left);
      if (op === '=' && type?.kind === 'struct' && isCopyable(right)) return `${emit(left)} = ${copyOf(emit(right), type)}`;
      if ((op === '+=' || op === '-=') && pointee(type)) {  // s += n is s = s + n, but other pointer arithmetic is refused
        return op === '+=' && isString(type) && !hasSideEffects(left) ? `${emit(left)} = ${operand(left, emit)}.slice(${emit(right)})` : refuse(n);
      }
    },

    binary_expression: (n, emit, splice) => {
      const op = field(n, 'operator').text, left = field(n, 'left'), right = field(n, 'right');
      const leftType = types.typeOf(left), rightType = types.typeOf(right);
      if (op === '+' && isString(leftType) && !pointee(rightType)) return slice(n, left, right, emit);  // a suffix
      if (['+', '-', '<', '<=', '>', '>='].includes(op) && (pointee(leftType) || pointee(rightType))) return refuse(n);  // other pointer arithmetic
      if (op === '/' && isInteger(leftType) && isInteger(rightType)) return `Math.trunc(${splice(n)})`;
      if (op === '&&' || op === '||') return withConditions(n, [left, right], emit, splice);
    },
    unary_expression: (n, emit) => {
      const arg = field(n, 'argument');
      if (field(n, 'operator').text !== '!' || !isString(types.typeOf(arg))) return;
      const js = `${operand(arg, emit)} == NULL`, p = n.parent;
      const isCondition = p?.type === 'parenthesized_expression' || (p?.type === 'binary_expression' && ['&&', '||'].includes(field(p, 'operator').text));
      return isCondition ? js : `(${js})`;
    },
    conditional_expression: (n, emit, splice) => withConditions(n, [field(n, 'condition')], emit, splice),
    parenthesized_expression: (n, emit, splice) => ['if_statement', 'while_statement', 'do_statement'].includes(n.parent?.type ?? '') ?
      withConditions(n, [n.firstNamedChild], emit, splice) : undefined,

    call_expression: (n, emit, splice) => {
      const fn = field(n, 'function').text, args = field(n, 'arguments');
      if (config.arrayAllocators.includes(fn)) return '[]';
      if (fn === 'snprintf' && isStatement(n)) {  // snprintf(buf, size, format, ...) => buf = sprintf(format, ...)
        const [buf, , format] = args.namedChildren;
        return `${emit(buf)} = sprintf(${splice(args, format.startIndex)}`;
      }
      if (!async.has(fn)) return;
      const call = 'await ' + splice(n);
      const isOperand = ['field_expression', 'subscript_expression', 'call_expression'].includes(n.parent?.type ?? '');
      return isOperand ? `(${call})` : call;
    },

    // adjacent string literals: merge those on the same line, and join lines with +
    concatenated_string: n => n.namedChildren.reduce((out, s, i, all) => {
      if (i === 0) return s.text;
      const gap = n.text.slice(all[i - 1].endIndex - n.startIndex, s.startIndex - n.startIndex);
      return gap.includes('\n') ? out + ' +' + gap + s.text : out.slice(0, -1) + s.text.slice(1);
    }, ''),
  };
  return { rules, copiers };
}

/* Main */

export async function translate(pgSrc: string): Promise<{ units: Unit[], externals: string[], code: string }> {
  const parser = await parserFor('c');
  const headers = parseHeaders(pgSrc, parser), defines = collectDefines(headers);
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
