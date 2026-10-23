// Measures what's left to do by hand: compares each translated function with its counterpart in
// the hand-maintained port (src/describe.mjs), after stripping comments and formatting both alike.
//
// Usage: node translate/compare.mjs path/to/postgres/src
// Writes translate/out/{translated,ported}/<function>.js, and translate/out/residual.diff (which
// reads as the patch you'd apply to the translated code to get the ported code).

import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import * as prettier from 'prettier';
import { translate, parserFor, rewrite } from './translate.mjs';

const outDir = new URL('out/', import.meta.url).pathname;
const jsParser = await parserFor('javascript');

// Removes comments and folds "a" + "b" into "ab", so that only differences in behaviour remain
const doubleQuoted = /^"(?:[^"\\\n]|\\.)*"$/;
const normalisingRules = {
  comment: () => '',
  binary_expression: (n, emit) => {
    if (n.childForFieldName('operator').text !== '+') return;
    const [left, right] = ['left', 'right'].map(f => emit(n.childForFieldName(f)));
    if (doubleQuoted.test(left) && doubleQuoted.test(right)) return left.slice(0, -1) + right.slice(1);
  },
};

async function normalise(code) {
  const stripped = rewrite(jsParser.parse(code).rootNode, normalisingRules);
  try {
    return { code: await prettier.format(stripped, { parser: 'babel', printWidth: 100 }), valid: true };
  } catch {
    return { code: stripped, valid: false };
  }
}

const portRoot = jsParser.parse(fs.readFileSync(new URL('../src/describe.mjs', import.meta.url), 'utf8')).rootNode;
const ported = new Map(portRoot.descendantsOfType('function_declaration').map(fn => [fn.childForFieldName('name').text, fn]));
const portNames = new Set([...ported.keys(),
  ...portRoot.descendantsOfType('variable_declarator').map(v => v.childForFieldName('name').text),
  ...ported.get('describe').childForFieldName('parameters').namedChildren.map(p => (p.childForFieldName('left') ?? p).text)]);

const { units, externals } = await translate(process.argv[2]);
const fns = units.filter(u => u.node.type === 'function_definition');

fs.rmSync(outDir, { recursive: true, force: true });
for (const dir of ['translated', 'ported']) fs.mkdirSync(outDir + dir, { recursive: true });

const invalid = [], unported = [];
for (const fn of fns) {
  const translated = await normalise(fn.js);
  if (!translated.valid) invalid.push(fn.name);
  fs.writeFileSync(`${outDir}translated/${fn.name}.js`, translated.code);
  if (ported.has(fn.name)) fs.writeFileSync(`${outDir}ported/${fn.name}.js`, (await normalise(ported.get(fn.name).text)).code);
  else unported.push(fn.name);
}

const gitDiff = (...args) => spawnSync('git', ['diff', '--no-index', '--no-color', '--histogram', ...args, 'translated', 'ported'],
  { cwd: outDir, encoding: 'utf8', maxBuffer: 1 << 26 }).stdout;
fs.writeFileSync(outDir + 'residual.diff', gitDiff());
const numstat = gitDiff('--numstat').trim().split('\n').filter(Boolean)
  .map(line => line.split('\t')).filter(([, , file]) => !file.includes('/dev/null') && !file.startsWith('{ => '))
  .map(([add, del, file]) => ({ name: file.match(/(\w+)\.js/)[1], add: +add, del: +del }))
  .sort((a, b) => b.add + b.del - a.add - a.del);

const list = names => names.length ? names.join(', ') : '(none)';
const report = (title, names) => {
  const stats = numstat.filter(f => names.includes(f.name));
  console.log(`${title}: ${names.length}; identical: ${names.length - stats.length}; ` +
    `residual: +${stats.reduce((n, f) => n + f.add, 0)} -${stats.reduce((n, f) => n + f.del, 0)} lines`);
  for (const { name, add, del } of stats) console.log(`  ${name.padEnd(32)} +${add} -${del}`);
};
const compared = fns.map(fn => fn.name).filter(name => !unported.includes(name));
console.log(`Translated functions: ${fns.length}; not in the port: ${list(unported)}\n`);
report('Valid JS, compared with the port', compared.filter(name => !invalid.includes(name)));
console.log();
report('Not yet valid JS (so the residual includes layout differences)', compared.filter(name => invalid.includes(name)));
console.log(`\nExternals provided by the port: ${list(externals.filter(e => portNames.has(e)))}\n`);
console.log(`Externals missing from the port: ${list(externals.filter(e => !portNames.has(e)))}`);
