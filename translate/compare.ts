// Measures what's left to do by hand: compares each translated function with its counterpart in
// the hand-maintained port (src/describe.mjs), after stripping comments and formatting both alike.
//
// Usage: node translate/compare.ts path/to/postgres/src
// Writes translate/out/{translated,ported}/<function>.js, and translate/out/residual.diff (which
// reads as the patch you'd apply to the translated code to get the ported code).

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import * as prettier from 'prettier';
import { translate, parserFor, parseOrThrow, rewrite, field, must, type Rules } from './translate.ts';

const outDir = path.join(import.meta.dirname, 'out');
const jsParser = await parserFor('javascript');

// Removes comments and folds "a" + "b" into "ab", so that only differences in behaviour remain
const doubleQuoted = /^"(?:[^"\\\n]|\\.)*"$/;
const normalisingRules: Rules = {
  comment: () => '',
  binary_expression: (n, emit) => {
    if (field(n, 'operator').text !== '+') return;
    const [left, right] = [field(n, 'left'), field(n, 'right')].map(emit);
    if (doubleQuoted.test(left) && doubleQuoted.test(right)) return left.slice(0, -1) + right.slice(1);
  },
};

async function normalise(code: string): Promise<{ code: string, valid: boolean }> {
  const stripped = rewrite(parseOrThrow(jsParser, code), normalisingRules);
  try {
    return { code: await prettier.format(stripped, { parser: 'babel', printWidth: 100 }), valid: true };
  } catch {
    return { code: stripped, valid: false };
  }
}

// The port's functions by name, and every name it defines (which the translation may rely on)
const portRoot = parseOrThrow(jsParser, fs.readFileSync(path.join(import.meta.dirname, '../src/describe.mjs'), 'utf8'));
const ported = new Map(portRoot.descendantsOfType('function_declaration').map(fn => [field(fn, 'name').text, fn]));
const portNames = new Set([...ported.keys(),
  ...portRoot.descendantsOfType('variable_declarator').map(v => field(v, 'name').text),
  ...field(must(ported.get('describe'), 'describe()'), 'parameters').namedChildren.map(p => (p.childForFieldName('left') ?? p).text)]);

const { units, externals } = await translate(must(process.argv[2], 'Usage: node translate/compare.ts path/to/postgres/src'));
const fns = units.filter(u => u.node.type === 'function_definition');

fs.rmSync(outDir, { recursive: true, force: true });
for (const dir of ['translated', 'ported']) fs.mkdirSync(path.join(outDir, dir), { recursive: true });

const invalid: string[] = [], unported: string[] = [];
for (const fn of fns) {
  const translated = await normalise(fn.js);
  if (!translated.valid) invalid.push(fn.name);
  fs.writeFileSync(path.join(outDir, 'translated', `${fn.name}.js`), translated.code);
  const port = ported.get(fn.name);
  if (port) fs.writeFileSync(path.join(outDir, 'ported', `${fn.name}.js`), (await normalise(port.text)).code);
  else unported.push(fn.name);
}

const gitDiff = (...args: string[]) => spawnSync('git', ['diff', '--no-index', '--no-color', '--histogram', ...args, 'translated', 'ported'],
  { cwd: outDir, encoding: 'utf8', maxBuffer: 1 << 26 }).stdout;
fs.writeFileSync(path.join(outDir, 'residual.diff'), gitDiff());
const numstat = gitDiff('--numstat').trim().split('\n').filter(Boolean)
  .map(line => line.split('\t')).filter(([, , file]) => !file.includes('/dev/null') && !file.startsWith('{ => '))
  .map(([add, del, file]) => ({ name: must(file.match(/(\w+)\.js/), `function name in ${file}`)[1], add: +add, del: +del }))
  .sort((a, b) => b.add + b.del - a.add - a.del);

const list = (names: string[]) => names.length ? names.join(', ') : '(none)';
const report = (title: string, names: string[]) => {
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
