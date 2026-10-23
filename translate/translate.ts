// Translates the parts of psql we need from C to JS, by source-to-source rewriting of
// tree-sitter parse trees: everything is copied verbatim except where a rule applies.
//
// Usage: node translate/translate.ts path/to/postgres/src > translated.mjs

import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { Parser, Language, type Node } from 'web-tree-sitter';

export const config = {
  sources: ['bin/psql/command.c', 'bin/psql/describe.c', 'fe_utils/string_utils.c'],
  headerDirs: ['include/catalog', 'include/fe_utils', 'interfaces/libpq', 'bin/psql'],
  entryPoints: ['exec_command_d', 'exec_command_list', 'exec_command_sf_sv'],
  asyncSeeds: ['PSQLexec', 'PQexec'],  // functions provided by the JS runtime that return a Promise
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
// (whitespace and anything else the grammar treats as 'extra') is kept verbatim.
export function rewrite(node: Node, rules: Rules): string {
  const { text: src, startIndex: base } = node;
  const emit: Emit = n => rules[n.type]?.(n, emit, splice) ?? splice(n);
  const splice: Splice = (n, from = n.startIndex, emitChild = emit) => {
    let out = '', pos = from;
    for (const child of n.children) {
      if (child.startIndex < from) continue;
      out += src.slice(pos - base, child.startIndex - base) + emitChild(child);
      pos = child.endIndex;
    }
    return out + src.slice(pos - base, n.endIndex - base);
  };
  return emit(node);
}

/* C declarators */

// The tree-sitter-c node shapes used here, with their fields (+ multiple, ? optional), from
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
//   preproc_def            name, value?
//   type_definition        type, declarator+
//   struct_specifier       name?, body?
//   pointer_expression     operator, argument
//   cast_expression        type, value
//   call_expression        function, arguments
//   concatenated_string    (no fields: string_literal children)
//
// A declarator wraps either another declarator or, ultimately, the identifier being declared.

const innerDeclarator = (d: Node): Node =>
  d.childForFieldName('declarator') ?? must(d.firstNamedChild, `declarator inside ${d.type}`);

function declaredName(d: Node): string {
  while (d.type !== 'identifier') d = innerDeclarator(d);
  return d.text;
}

function functionDeclarator(fn: Node): Node {
  let d = field(fn, 'declarator');
  while (d.type !== 'function_declarator') d = innerDeclarator(d);
  return d;
}

const isPrototype = (decl: Node): boolean => decl.childrenForFieldName('declarator').some(d => {
  for (; d.type !== 'identifier'; d = innerDeclarator(d)) if (d.type === 'function_declarator') return true;
  return false;
});

/** '{}' or '[]' if a declarator declares a struct or array (whose JS value is an object), else null */
function aggregateKind(d: Node, typeNode: Node, structTypes: Set<string>): '{}' | '[]' | null {
  if (d.type === 'init_declarator') d = field(d, 'declarator');
  if (d.type === 'identifier') return typeNode.type === 'struct_specifier' || structTypes.has(typeNode.text) ? '{}' : null;
  while (innerDeclarator(d).type !== 'identifier') d = innerDeclarator(d);
  return d.type === 'array_declarator' ? '[]' : null;  // the declarator nearest the name binds tightest
}

/* Definitions and references */

const readSource = (pgSrc: string, file: string) => fs.readFileSync(path.join(pgSrc, file), 'utf8');
const defineValue = (def: Node) => field(def, 'value').text.trim();

/** Object-like #defines and typedef'd struct names from headers */
function scanHeaders(pgSrc: string, parser: Parser) {
  const defines = new Map<string, Definition>(), structTypes = new Set<string>();
  for (const dir of config.headerDirs) {
    for (const file of fs.readdirSync(path.join(pgSrc, dir)).filter(f => f.endsWith('.h')).map(f => path.join(dir, f))) {
      const root = parseOrThrow(parser, readSource(pgSrc, file));
      for (const node of root.descendantsOfType('preproc_def')) {
        const name = field(node, 'name').text;
        if (node.childForFieldName('value') && !defines.has(name)) defines.set(name, { name, node, file });
      }
      for (const td of root.descendantsOfType('type_definition')) {
        if (field(td, 'type').childForFieldName('body')) {
          for (const d of td.childrenForFieldName('declarator')) structTypes.add(d.text);
        }
      }
    }
  }
  return { defines, structTypes };
}

// Expand C's # stringizing operator, which tree-sitter would otherwise choke on inside string concatenations
function expandStringizing(src: string, defines: Map<string, Definition>): string {
  const expand = (name: string): string => {
    const def = defines.get(name);
    return def ? expand(defineValue(def.node)) : name;
  };
  return src.replace(/\bCppAsString(2?)\((\w+)\)/g, (_, expandFirst: string, arg: string) =>
    '"' + (expandFirst ? expand(arg) : arg).replace(/["\\]/g, '\\$&') + '"');
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

function makeRules({ async, structTypes }: { async: Set<string>, structTypes: Set<string> }): Rules {
  const aggregatesIn = new Map<number, Set<string>>();  // memoised by function node id
  const aggregates = (fn: Node): Set<string> => {  // names of a function's struct and array variables
    let names = aggregatesIn.get(fn.id);
    if (!names) aggregatesIn.set(fn.id, names = new Set(fn.descendantsOfType('declaration').flatMap(decl =>
      decl.childrenForFieldName('declarator').filter(d => aggregateKind(d, field(decl, 'type'), structTypes)).map(declaredName))));
    return names;
  };
  const enclosingFunction = (n: Node | null) => {
    while (n && n.type !== 'function_definition') n = n.parent;
    return n;
  };
  const inInitializerList = (n: Node) => n.parent?.type === 'initializer_list';

  return {
    // drop return and parameter types; mark async functions
    function_definition: (n, emit) => {
      const fn = functionDeclarator(n), name = field(fn, 'declarator').text, body = field(n, 'body');
      const params = field(fn, 'parameters').namedChildren
        .map(p => p.childForFieldName('declarator')).filter(d => d !== null).map(declaredName);
      return `${async.has(name) ? 'async ' : ''}function ${name}(${params.join(', ')})` +
        n.text.slice(fn.endIndex - n.startIndex, body.startIndex - n.startIndex) + emit(body);
    },

    // replace types with let; give struct and array variables an initial value
    declaration: (n, emit, splice) => {
      if (isPrototype(n)) return '';
      const type = field(n, 'type'), declarators = n.childrenForFieldName('declarator');
      return 'let ' + splice(n, declarators[0].startIndex, child => {
        const isDeclarator = declarators.some(d => d.id === child.id);
        const init = isDeclarator && child.type !== 'init_declarator' && aggregateKind(child, type, structTypes);
        return emit(child) + (init ? ` = ${init}` : '');
      });
    },
    pointer_declarator: (n, emit) => emit(innerDeclarator(n)),
    array_declarator: (n, emit) => emit(innerDeclarator(n)),
    '{': n => inInitializerList(n) ? '[' : undefined,
    '}': n => inInitializerList(n) ? ']' : undefined,

    preproc_def: n => `const ${field(n, 'name').text} = ${defineValue(n)};`,

    cast_expression: (n, emit) => emit(field(n, 'value')),
    '->': () => '.',

    // &x is just x when x is a struct or array, since JS objects are already references
    pointer_expression: (n, emit) => {
      const arg = field(n, 'argument'), fn = enclosingFunction(n);
      if (field(n, 'operator').text === '&' && arg.type === 'identifier' && fn && aggregates(fn).has(arg.text)) return emit(arg);
    },

    call_expression: (n, emit, splice) => {
      if (!async.has(field(n, 'function').text)) return;
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
}

/* Main */

export async function translate(pgSrc: string): Promise<{ units: Unit[], externals: string[], code: string }> {
  const parser = await parserFor('c');
  const { defines, structTypes } = scanHeaders(pgSrc, parser);
  const trees: SourceTree[] = config.sources.map(file => [file, parseOrThrow(parser, expandStringizing(readSource(pgSrc, file), defines))]);

  const defs = new Map([...defines, ...collectDefinitions(trees)]);  // sources shadow headers
  const sliced = slice(defs, config.entryPoints);
  const rules = makeRules({ async: inferAsync(sliced, config.asyncSeeds), structTypes });
  const units: Unit[] = sliced.map(def => ({ ...def, js: rewrite(def.node, rules) }));

  const externals = new Set(units.filter(u => u.node.type === 'function_definition').flatMap(u => {
    const locals = localNames(u.node);
    return [...identifiers(u.node)].filter(id => !locals.has(id) && !defs.has(id));
  }));

  const fromHeaders = units.filter(u => !config.sources.includes(u.file));
  const code = [`/* from headers */\n\n${fromHeaders.map(u => u.js).join('\n')}`,
    ...config.sources.map(file => `/* from ${file} */\n\n${units.filter(u => u.file === file).map(u => u.js).join('\n\n')}`),
  ].join('\n\n');

  return { units, externals: [...externals].sort(), code };
}

if (import.meta.main) {
  const pgSrc = process.argv[2];
  if (!pgSrc) throw new Error('Usage: node translate/translate.ts path/to/postgres/src');
  console.log((await translate(pgSrc)).code);
}
