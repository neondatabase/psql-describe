// Translates the parts of psql we need from C to JS, by source-to-source rewriting of
// tree-sitter parse trees: everything is copied verbatim except where a rule applies.
//
// Usage: node translate/translate.mjs path/to/postgres/src > translated.mjs

import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { Parser, Language } from 'web-tree-sitter';

export const config = {
  sources: ['bin/psql/command.c', 'bin/psql/describe.c', 'fe_utils/string_utils.c'],
  headerDirs: ['include/catalog', 'include/fe_utils', 'interfaces/libpq', 'bin/psql'],
  entryPoints: ['exec_command_d', 'exec_command_list', 'exec_command_sf_sv'],
  asyncSeeds: ['PSQLexec', 'PQexec'],  // functions provided by the JS runtime that return a Promise
};

await Parser.init();
const require = createRequire(import.meta.url);

export async function parserFor(grammar) {
  const parser = new Parser();
  parser.setLanguage(await Language.load(require.resolve(`tree-sitter-${grammar}/tree-sitter-${grammar}.wasm`)));
  return parser;
}

// Re-emit a node's source text, applying rules (keyed by node type) to it and its descendants.
// A rule returns replacement text, or undefined to keep the default: the node's own text with
// its children re-emitted. Text between children (whitespace, comments) is kept verbatim.
export function rewrite(node, rules) {
  const { text: src, startIndex: base } = node;
  const emit = n => rules[n.type]?.(n, emit, splice) ?? splice(n);
  const splice = (n, from = n.startIndex, emitChild = emit) => {
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

const innerDeclarator = d => d.childForFieldName('declarator') ?? d.namedChildren[0];

function declaredName(d) {
  while (d.type !== 'identifier') d = innerDeclarator(d);
  return d.text;
}

function functionDeclarator(fn) {
  let d = fn.childForFieldName('declarator');
  while (d.type !== 'function_declarator') d = innerDeclarator(d);
  return d;
}

const isPrototype = decl => decl.childrenForFieldName('declarator').some(d => {
  for (; d.type !== 'identifier'; d = innerDeclarator(d)) if (d.type === 'function_declarator') return true;
});

// '{}' or '[]' if a declarator declares a struct or array (whose JS value is an object), else null
function aggregateKind(d, typeNode, structTypes) {
  if (d.type === 'init_declarator') d = d.childForFieldName('declarator');
  if (d.type === 'identifier') return typeNode.type === 'struct_specifier' || structTypes.has(typeNode.text) ? '{}' : null;
  while (innerDeclarator(d).type !== 'identifier') d = innerDeclarator(d);
  return d.type === 'array_declarator' ? '[]' : null;  // the declarator nearest the name binds tightest
}

/* Definitions and references */

const readSource = (pgSrc, file) => fs.readFileSync(path.join(pgSrc, file), 'utf8');
const defineValue = def => def.childForFieldName('value').text.trim();

// Object-like #defines (name -> { name, node, file }) and typedef'd struct names from headers
function scanHeaders(pgSrc, parser) {
  const defines = new Map(), structTypes = new Set();
  for (const dir of config.headerDirs) {
    for (const file of fs.readdirSync(path.join(pgSrc, dir)).filter(f => f.endsWith('.h')).map(f => path.join(dir, f))) {
      const root = parser.parse(readSource(pgSrc, file)).rootNode;
      for (const node of root.descendantsOfType('preproc_def')) {
        const name = node.childForFieldName('name').text;
        if (node.childForFieldName('value') && !defines.has(name)) defines.set(name, { name, node, file });
      }
      for (const td of root.descendantsOfType('type_definition')) {
        if (td.childForFieldName('type').childForFieldName('body')) {
          for (const d of td.childrenForFieldName('declarator')) structTypes.add(d.text);
        }
      }
    }
  }
  return { defines, structTypes };
}

// Expand C's # stringizing operator, which tree-sitter would otherwise choke on inside string concatenations
function expandStringizing(src, defines) {
  const expand = name => defines.has(name) ? expand(defineValue(defines.get(name).node)) : name;
  return src.replace(/\bCppAsString(2?)\((\w+)\)/g, (_, expandFirst, arg) =>
    '"' + (expandFirst ? expand(arg) : arg).replace(/["\\]/g, '\\$&') + '"');
}

// Top-level functions, variables and macros in the C sources, keyed by name
function collectDefinitions(trees) {
  const defs = new Map();
  const add = (name, node, file) => defs.has(name) || defs.set(name, { name, node, file });
  for (const [file, root] of trees) {
    for (const fn of root.descendantsOfType('function_definition')) add(functionDeclarator(fn).childForFieldName('declarator').text, fn, file);
    for (const def of root.descendantsOfType('preproc_def')) add(def.childForFieldName('name').text, def, file);
    for (const decl of root.descendantsOfType('declaration')) {
      if (isPrototype(decl) || decl.parent.type !== 'translation_unit') continue;
      for (const d of decl.childrenForFieldName('declarator')) add(declaredName(d), decl, file);
    }
  }
  return defs;
}

const identifiers = node => new Set(node.descendantsOfType('identifier').map(id => id.text));

function localNames(fn) {
  const names = new Set();
  for (const p of functionDeclarator(fn).childForFieldName('parameters').namedChildren) {
    const d = p.childForFieldName('declarator');
    if (d) names.add(declaredName(d));
  }
  for (const decl of fn.descendantsOfType('declaration')) {
    for (const d of decl.childrenForFieldName('declarator')) names.add(declaredName(d));
  }
  return names;
}

// Everything transitively referenced from the entry points, in source order
function slice(defs, entryPoints) {
  const reached = new Set(), queue = [...entryPoints];
  while (queue.length) {
    const name = queue.shift();
    if (reached.has(name) || !defs.has(name)) continue;
    reached.add(name);
    queue.push(...identifiers(defs.get(name).node));
  }
  const rank = file => config.sources.indexOf(file);  // headers (-1) first
  return [...reached].map(name => defs.get(name))
    .sort((a, b) => rank(a.file) - rank(b.file) || a.file.localeCompare(b.file) || a.node.startIndex - b.node.startIndex)
    .filter((def, i, arr) => def.node.id !== arr[i - 1]?.node.id);  // one declaration may define several names
}

// A function is async if it calls an async function
function inferAsync(units, seeds) {
  const async = new Set(seeds);
  const fns = units.filter(u => u.node.type === 'function_definition');
  for (let changed = true; changed;) {
    changed = false;
    for (const fn of fns) {
      if (async.has(fn.name)) continue;
      const callees = fn.node.descendantsOfType('call_expression').map(c => c.childForFieldName('function').text);
      if (callees.some(c => async.has(c))) {
        async.add(fn.name);
        changed = true;
      }
    }
  }
  return async;
}

/* Rewrite rules */

function makeRules({ async, structTypes }) {
  const aggregatesIn = new Map();  // memoised per function: names of struct and array variables
  const aggregates = fn => aggregatesIn.get(fn.id) ?? aggregatesIn.set(fn.id, new Set(
    fn.descendantsOfType('declaration').flatMap(decl => decl.childrenForFieldName('declarator')
      .filter(d => aggregateKind(d, decl.childForFieldName('type'), structTypes)).map(declaredName)))).get(fn.id);
  const enclosingFunction = n => { while (n && n.type !== 'function_definition') n = n.parent; return n; };

  return {
    // drop return and parameter types; mark async functions
    function_definition: (n, emit) => {
      const fn = functionDeclarator(n), name = fn.childForFieldName('declarator').text;
      const params = fn.childForFieldName('parameters').namedChildren
        .map(p => p.childForFieldName('declarator')).filter(Boolean).map(declaredName);
      const body = n.childForFieldName('body');
      return `${async.has(name) ? 'async ' : ''}function ${name}(${params.join(', ')})` +
        n.text.slice(fn.endIndex - n.startIndex, body.startIndex - n.startIndex) + emit(body);
    },

    // replace types with let; give struct and array variables an initial value
    declaration: (n, emit, splice) => {
      if (isPrototype(n)) return '';
      const type = n.childForFieldName('type'), declarators = n.childrenForFieldName('declarator');
      return 'let ' + splice(n, declarators[0].startIndex, child => {
        const isDeclarator = declarators.some(d => d.id === child.id);
        const init = isDeclarator && child.type !== 'init_declarator' && aggregateKind(child, type, structTypes);
        return emit(child) + (init ? ` = ${init}` : '');
      });
    },
    pointer_declarator: (n, emit) => emit(innerDeclarator(n)),
    array_declarator: (n, emit) => emit(innerDeclarator(n)),
    '{': n => n.parent.type === 'initializer_list' ? '[' : undefined,
    '}': n => n.parent.type === 'initializer_list' ? ']' : undefined,

    preproc_def: n => `const ${n.childForFieldName('name').text} = ${defineValue(n)};`,

    cast_expression: (n, emit) => emit(n.childForFieldName('value')),
    '->': () => '.',

    // &x is just x when x is a struct or array, since JS objects are already references
    pointer_expression: (n, emit) => {
      const arg = n.childForFieldName('argument');
      if (n.childForFieldName('operator').text === '&' && arg.type === 'identifier' &&
        aggregates(enclosingFunction(n)).has(arg.text)) return emit(arg);
    },

    call_expression: (n, emit, splice) => {
      if (!async.has(n.childForFieldName('function').text)) return;
      const call = 'await ' + splice(n);
      const isOperand = ['field_expression', 'subscript_expression', 'call_expression'].includes(n.parent.type);
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

export async function translate(pgSrc) {
  const parser = await parserFor('c');
  const { defines, structTypes } = scanHeaders(pgSrc, parser);
  const trees = config.sources.map(file => [file, parser.parse(expandStringizing(readSource(pgSrc, file), defines)).rootNode]);

  const defs = new Map([...defines, ...collectDefinitions(trees)]);  // sources shadow headers
  const units = slice(defs, config.entryPoints);
  const rules = makeRules({ async: inferAsync(units, config.asyncSeeds), structTypes });
  for (const unit of units) unit.js = rewrite(unit.node, rules);

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
  if (!pgSrc) throw new Error('Usage: node translate/translate.mjs path/to/postgres/src');
  console.log((await translate(pgSrc)).code);
}
