import fs from 'fs';

const command_c = fs.readFileSync('command.c', { encoding: 'utf8'});
const describe_c = fs.readFileSync('describe.c', { encoding: 'utf8'});
const pre_js = fs.readFileSync('describe-pre.js', { encoding: 'utf8'});

const exec_command_d = command_c.match(/static\s+backslashResult\s+exec_command_d\(.*\s+\{[\s\S]+?^\}[\s\S]+?^\}/m)[0];
const describe_commands = describe_c.match(/\/\*\s+\* \\da[\s\S]+/)[0];

let js = `
/* from command.c */

${exec_command_d}

/* from describe.c */

${describe_commands}
`;

// remove validateSQLNamePattern in favour of tweaked implementation below
js = js.replace(/static bool\s*validateSQLNamePattern[\s\S]*?\n\}/, '// re-implemented manually elsewhere');

// replace function return types with '[async] function', and remove argument types
const asyncFunctions = ['PSQLexec'];
js = js.replace(/(^\w+.*\n)+(^\w+)\(([^)]*)\)/mg, (m, g1, g2, g3) => {
  const isAsync = g2 !== 'map_typename_pattern' && g2 !== 'add_role_attribute';
  if (isAsync) asyncFunctions.push(g2);
  return `${isAsync ? 'async ' : ''}function ${g2}(${g3.split(',').map(arg => arg.match(/\w+\s*$/)[0]).join(', ')})`
});

// await async function calls
js = js.replace(new RegExp('(?<!function\\s*)\\b(' + asyncFunctions.join('|') + ')(\\s*\\()', 'g'), 'await $1$2')

// initialize structs to {}
js = js.replace(/\b(PQExpBufferData|printTableContent)\s+(\w+\s*[;,]\s*)+/mg, m => {
  const parts = m.split(/[\s,;]+/).filter(s => s !== '');
  let result = parts.shift();
  while (parts.length) result += ` ${parts.shift()} = { /* struct */ }${parts.length ? ',' : ';\n'}`
  return result;
});

// replace variable types with 'let'
js = js.replace(/(^|for\s*\()(\s*)(static\s+)?(const\s+)?(bool|char|int|int16|Oid|backslashResult|PGresult|PQExpBufferData|printQueryOpt|printTableOpt|printTableContent)(\s*\*)?(\s*const)?/mg, '$1$2let '), 

// remove '&' reference operator
js = js.replace(/&(\w)/g, '$1');

// replace constants inside strings to be concatenated
const defineStrs = {
  RELKIND_RELATION: 'r',
  RELKIND_INDEX: 'i',
  RELKIND_SEQUENCE: 'S',
  RELKIND_TOASTVALUE: 't',
  RELKIND_VIEW: 'v',
  RELKIND_MATVIEW: 'm',
  RELKIND_COMPOSITE_TYPE: 'c',
  RELKIND_FOREIGN_TABLE: 'f',
  RELKIND_PARTITIONED_TABLE: 'p',
  RELKIND_PARTITIONED_INDEX: 'I',
  RELPERSISTENCE_PERMANENT: 'p',
  RELPERSISTENCE_UNLOGGED: 'u',
  RELPERSISTENCE_TEMP: 't',
  REPLICA_IDENTITY_DEFAULT: 'd',
  REPLICA_IDENTITY_NOTHING: 'n',
  REPLICA_IDENTITY_FULL: 'f',
  REPLICA_IDENTITY_INDEX: 'i',
}
js = js.replace(new RegExp(`CppAsString2\\((${Object.keys(defineStrs).join('|')})\\)`, 'g'), (m, g1) => `\n"'${defineStrs[g1]}'"\n`);

// concatenate consecutive strings
js = js.replace(/"\s*\n(\s*)"/g, '" +\n$1"');

// array declarations: remove subscripts
js = js.replace(/^(\s*let\s+\w+)\[([0-9]*|[A-Z_]*)\]/gm, '$1');

// array literals: {} -> []
js = js.replace(/([^'])\{(\S[^}]*)\}/g, '$1[$2]');

// short-circuit error returns
js = js.replace(/goto error_return;/g, 'return false;');

// special case for typename_map: replace {...} with [...]
js = js.replace(/(let\s*typename_map\s*=\s*)\{([^}]+)\}/, '$1[$2]');

// struct defs -> empty {}
js = js.replace(/struct\s*\{[^}]*\}\s*(\w+)/, 'let $1 = {}');

// struct pointer access operator (->) to .
js = js.replace(/->/g, '.');

// remove bracketed dereferences
js = js.replace(/\*\(/g, '(');

// remove char casts
js = js.replace(/\(char \*\*?\)/g, '');

// remove additional dereferences
js = js.replace(/([^%])\*(\w)/g, '$1$2');

// special cases
js = js.replace(/let headers;/, 'let headers = [];');
js = js.replace('indexdef = usingpos + 7;', 'indexdef = indexdef.slice(usingpos + 7);');
js = js.replace('tgdef = usingpos + 9;', 'tgdef = tgdef.slice(usingpos + 9);');
js = js.replace(/(\w+)\[0\] == '\\0'/g, "($1[0] == '\\0' || $1[0] === undefined)");

js = `
${pre_js}
${js}
`;

console.log(js);
