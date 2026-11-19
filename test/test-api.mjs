#!/usr/bin/env node

// Unit tests for the public JavaScript API of psql-describe. Unlike the
// container matrix, these never talk to a real PostgreSQL server: runQuery is a
// stub, so we can exercise behaviour that psql itself cannot be the oracle for
// (HTML rendering, cancellation, error propagation, the docs-URL template,
// server-version gating and standard_conforming_strings escaping).

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { describe, describeDataToString, describeDataToHtml } from '../index.js';

const tick = () => new Promise(resolve => setImmediate(resolve));

// A stub result in the shape the PQ* wrappers expect (rowCount/fields/rows).
const emptyResult = { rowCount: 0, fields: [], rows: [] };

// Run a command with a runQuery that records the first SQL it is asked to run
// and then aborts, so we can inspect the generated SQL without a database.
async function firstQuery(cmd, options) {
  let captured;
  await describe(
    cmd,
    'testdb',
    sql => { captured = sql; throw new Error('stop'); },
    () => {},
    options,
  ).promise;
  return captured;
}

// 1. HTML formatting -------------------------------------------------------

test('describeDataToHtml escapes and renders a table object', () => {
  const table = {
    title: 'List of <things> & co',
    ncolumns: 2,
    nrows: 2,
    headers: ['Name', 'Value'],
    aligns: ['l', 'r'],
    cells: ['a<b', "x'y", 'c&d', '2\n3'],
    footers: [],
    opt: { default_footer: true },
  };

  const html = describeDataToHtml(table);

  assert.ok(html.startsWith('<table'));
  // dangerous characters are escaped rather than passed through
  assert.ok(!html.includes('a<b'));
  assert.ok(html.includes('a&lt;b'));
  assert.ok(html.includes('c&amp;d'));
  assert.ok(html.includes('x&apos;y'));
  assert.ok(html.includes('List of &lt;things&gt; &amp; co'));
  // newlines inside a cell become <br>
  assert.ok(html.includes('2<br>3'));
  // the default footer is rendered
  assert.ok(html.includes('(2 rows)'));
});

test('describeDataToHtml wraps and escapes a plain string', () => {
  const html = describeDataToHtml("hi <there> & 'you'");

  assert.ok(html.startsWith('<p>'));
  assert.ok(html.endsWith('</p>'));
  assert.ok(html.includes('&lt;there&gt;'));
  assert.ok(html.includes('&amp;'));
  assert.ok(html.includes('&apos;you&apos;'));
  assert.ok(!html.includes('<there>'));
});

test('describeDataToString passes strings through unchanged', () => {
  assert.equal(describeDataToString('plain text'), 'plain text');
});

// 2. Cancellation ----------------------------------------------------------

test('cancel() aborts a command in flight and suppresses further output', async () => {
  let resolveQuery;
  const runQuery = () => new Promise(resolve => { resolveQuery = resolve; });
  const outputs = [];

  const { promise, cancel } = describe(
    '\\l', 'testdb', runQuery, x => outputs.push(x), { serverVersion: 190000 },
  );

  await tick();  // let describe reach its first runQuery call
  assert.equal(typeof resolveQuery, 'function');

  cancel();
  resolveQuery(emptyResult);  // the query now "completes" after cancellation

  const resolved = await promise;
  assert.equal(resolved, null);      // cancelled commands resolve to null
  assert.deepEqual(outputs, []);     // nothing is emitted after cancel()
});

test('cancel() resolves at once, even if the query in flight never completes', async () => {
  const { promise, cancel } = describe(
    '\\l', 'testdb', () => new Promise(() => {}), () => {}, { serverVersion: 190000 },
  );

  await tick();
  cancel();
  assert.equal(await promise, null);
});

test('a cancelled command, still running in the background, doesn\'t affect any other', async () => {
  const deferredQuery = () => {
    let resolveQuery;
    const runQuery = () => new Promise(resolve => { resolveQuery = resolve; });
    return { runQuery, resolve: result => resolveQuery(result) };
  };
  const run = (runQuery, outputs) =>
    describe('\\l', 'testdb', runQuery, x => outputs.push(x), { serverVersion: 190000 });

  // what \l gives on its own
  const expected = [];
  await run(async () => emptyResult, expected).promise;

  // A is cancelled while its query is in flight, then B starts, and A's query completes while B's is in flight
  const a = deferredQuery(), aOutputs = [];
  const { promise: aPromise, cancel } = run(a.runQuery, aOutputs);
  await tick();
  cancel();
  assert.equal(await aPromise, null);

  const b = deferredQuery(), bOutputs = [];
  const { promise: bPromise } = run(b.runQuery, bOutputs);
  await tick();
  a.resolve(emptyResult);
  await tick();
  b.resolve(emptyResult);

  assert.deepEqual(await bPromise, { success: true, remainder: '', commands: 1 });
  assert.deepEqual(bOutputs, expected);
  assert.deepEqual(aOutputs, []);

  // and cancelling C, while D is in flight, doesn't cancel D
  const c = deferredQuery(), d = deferredQuery(), dOutputs = [];
  const { promise: cPromise, cancel: cancelC } = run(c.runQuery, []);
  const { promise: dPromise } = run(d.runQuery, dOutputs);
  await tick();
  cancelC();
  assert.equal(await cPromise, null);
  c.resolve(emptyResult);
  await tick();
  d.resolve(emptyResult);

  assert.deepEqual(await dPromise, { success: true, remainder: '', commands: 1 });
  assert.deepEqual(dOutputs, expected);
});

// 3. Error propagation -----------------------------------------------------

test('a rejected runQuery surfaces as an error, not a hang', async () => {
  const outputs = [];
  const resolved = await describe(
    '\\l', 'testdb',
    () => Promise.reject(new Error('boom-async')),
    x => outputs.push(x),
    { serverVersion: 190000 },
  ).promise;

  assert.equal(resolved.success, false);
  assert.ok(outputs.some(o => typeof o === 'string' && o.includes('boom-async')));
});

test('a synchronously throwing runQuery surfaces as an error', async () => {
  const outputs = [];
  const resolved = await describe(
    '\\l', 'testdb',
    () => { throw new Error('boom-sync'); },
    x => outputs.push(x),
    { serverVersion: 190000 },
  ).promise;

  assert.equal(resolved.success, false);
  assert.ok(outputs.some(o => typeof o === 'string' && o.includes('boom-sync')));
});

// 4. docsURLTemplate -------------------------------------------------------

test('\\h uses a custom docsURLTemplate for the help URL', async () => {
  const outputs = [];
  const resolved = await describe(
    '\\h SELECT', 'testdb',
    () => { throw new Error('runQuery should not be called for \\h'); },
    x => outputs.push(x),
    { serverVersion: 190000, docsURLTemplate: id => `https://docs.example.test/${id}` },
  ).promise;

  const text = outputs.join('\n');
  assert.equal(resolved.success, true);
  assert.ok(text.includes('Command:     SELECT'));
  assert.ok(text.includes('URL: https://docs.example.test/'));
  assert.ok(!text.includes('postgresql.org'));  // the default template is unused
});

// 5. Pinned serverVersion --------------------------------------------------

test('an explicit serverVersion changes the generated SQL', async () => {
  const sql14 = await firstQuery('\\l', { serverVersion: 140000 });
  const sql19 = await firstQuery('\\l', { serverVersion: 190000 });

  assert.notEqual(sql14, sql19);
  // PostgreSQL 17+ selects d.datlocale; earlier versions do not
  assert.ok(sql19.includes('datlocale'));
  assert.ok(!sql14.includes('datlocale'));
});

test('messages about an old server give its major version, as psql does', async () => {
  // \df's "p" (procedures) option needs Postgres 11+, so a 10.5 server is refused before any query is run
  const outputs = [];
  await describe('\\dfp', 'testdb', async () => emptyResult, (...x) => outputs.push(describeDataToString(...x)),
    { serverVersion: 100005 }).promise;
  assert.equal(outputs.join('\n'), '\\df does not take a "p" option with server version 10');
});

// 6. standardConformingStrings ----------------------------------------------

test('standardConformingStrings controls backslash escaping in generated SQL', async () => {
  // A "$" in a pattern is always emitted as "\$" in the regex literal, so the
  // literal contains a backslash whose escaping depends on standardConformingStrings. We use
  // serverVersion 190000 so the pre-v19 E'...' kluge does not apply and standardConformingStrings
  // alone governs the result.
  const sqlStd = await firstQuery('\\dt foo$bar', { serverVersion: 190000, standardConformingStrings: true });
  const sqlNonStd = await firstQuery('\\dt foo$bar', { serverVersion: 190000, standardConformingStrings: false });

  assert.notEqual(sqlStd, sqlNonStd);
  // standard_conforming_strings on: the backslash is left as-is
  assert.ok(sqlStd.includes('foo\\$bar'));
  assert.ok(!sqlStd.includes('foo\\\\$bar'));
  // standard_conforming_strings off: the backslash is doubled
  assert.ok(sqlNonStd.includes('foo\\\\$bar'));
});

// 7. Backslash command help ---------------------------------------------------

// Run a command that shouldn't query (given the server version), returning its output
async function outputOf(cmd) {
  const outputs = [];
  await describe(cmd, 'testdb', () => { throw new Error(`runQuery should not be called for ${cmd}`); },
    x => outputs.push(x), { serverVersion: 190000 }).promise;
  return outputs.join('\n');
}

test('\\? lists the commands we have, and only those', async () => {
  const lines = (await outputOf('\\?')).split('\n');
  const commands = lines.map(line => line.match(/^  \\(\S+)/)?.[1]).filter(Boolean);
  for (const command of ['?', 'h', 'd[Sx+]', 'dt[Sx+]', 'l[x+]', 'lo_list[x+]', 'sf[+]', 'z[Sx]']) {
    assert.ok(commands.includes(command), command);
  }
  for (const command of ['copyright', 'q', 'x', 'lo_export', 'lo_import', 'lo_unlink']) {
    assert.ok(!commands.some(c => c.startsWith(command)), command);
  }
  // sections with none of our commands are left out
  assert.deepEqual(lines.filter(line => /^\S/.test(line)), ['Help', 'Informational', 'Large Objects']);
});

test('commands we don\'t have say so', async () => {
  assert.equal(await outputOf('\\lo_export 1 file'), '\\lo_export is not supported');
  assert.equal(await outputOf('\\? options'), '\\? options is not supported');
});

test('the default docs URL is for the major version psql was built from', async () => {
  assert.match(await outputOf('\\h SELECT'), /URL: https:\/\/www\.postgresql\.org\/docs\/19\/sql-select\.html/);
});

// 8. Quoting in arguments ---------------------------------------------------

test('quoted arguments follow psql\'s rules, and a quote in a pattern is doubled in SQL', async () => {
  for (const cmd of [String.raw`\dt "o'x"`, String.raw`\dt 'o''x'`, String.raw`\dt 'o\'x'`, String.raw`\dt o'''x'`]) {
    assert.match(await firstQuery(cmd, { serverVersion: 190000 }), /'\^\(o''x\)\$'/, cmd);
  }
});

test('an unterminated quote in an argument is an error', async () => {
  const outputs = [];
  await describe(String.raw`\dt "o'x`, 'testdb', () => { throw new Error('stop'); }, x => outputs.push(x), { serverVersion: 190000 }).promise;
  assert.match(outputs[0], /^unterminated quoted string$/m);
});

// 9. Multiple commands, and what the promise resolves to ---------------------

// Run a command line, recording the SQL it runs (each query returning no rows) and its output
async function run(cmd, { serverVersion = 190000, multipleCommands } = {}) {
  const queries = [], outputs = [];
  const version = { rowCount: 1, fields: [{ name: 'server_version_num' }], rows: [['190000']] };
  const result = await describe(cmd, 'testdb',
    sql => { queries.push(sql); return sql === 'SHOW server_version_num' ? version : emptyResult; },
    x => outputs.push(x), { serverVersion, multipleCommands }).promise;
  return { queries, outputs, result };
}

test('with multipleCommands, each backslash command on a line runs in turn', async () => {
  for (const cmd of [String.raw`\dt film \dv`, String.raw`\dt film \\ \dv`, String.raw`\dt film\dv`]) {
    const { queries, result } = await run(cmd, { multipleCommands: true });
    assert.equal(queries.length, 2, cmd);
    assert.match(queries[0], /'\^\(film\)\$'/, cmd);
    assert.doesNotMatch(queries[1], /film/, cmd);
    assert.deepEqual(result, { success: true, remainder: '', commands: 2 }, cmd);
  }
});

test('by default, only the first command runs, and the rest is the remainder', async () => {
  const { queries, result } = await run(String.raw`\dt film \dv`);
  assert.equal(queries.length, 1);
  assert.deepEqual(result, { success: true, remainder: String.raw`\dv`, commands: 1 });
});

test('what isn\'t a backslash command is the remainder, e.g. SQL', async () => {
  assert.deepEqual((await run(String.raw`\dt \\ SELECT 1;`, { multipleCommands: true })).result,
    { success: true, remainder: 'SELECT 1;', commands: 1 });
  const sql = await run('  SELECT 1;');
  assert.deepEqual(sql.queries, []);
  assert.deepEqual(sql.outputs, []);
  assert.deepEqual(sql.result, { success: true, remainder: 'SELECT 1;', commands: 0 });
  assert.deepEqual((await run('')).result, { success: true, remainder: '', commands: 0 });
});

test('a failed command makes success false, and ends the line', async () => {
  const invalid = await run(String.raw`\dz \dt`, { multipleCommands: true });
  assert.deepEqual(invalid.queries, []);
  assert.deepEqual(invalid.outputs, [String.raw`invalid command \dz`]);
  assert.deepEqual(invalid.result, { success: false, remainder: '', commands: 1 });
});

test('help succeeds', async () => {
  assert.deepEqual((await run(String.raw`\? \h SELECT`, { multipleCommands: true })).result,
    { success: true, remainder: '', commands: 2 });
});

test('the server version is queried before the first command that needs it', async () => {
  const { queries } = await run(String.raw`\? \dt`, { serverVersion: null, multipleCommands: true });
  assert.equal(queries.length, 2);
  assert.equal(queries[0], 'SHOW server_version_num');
});

test('with multipleCommands, a line ends the commands on it, as in psql', async () => {
  // SQL on the next line is the remainder, not the command's arguments
  const sql = await run('\\dt\nSELECT 1;', { multipleCommands: true });
  assert.equal(sql.queries.length, 1);
  assert.doesNotMatch(sql.queries[0], /SELECT'|\^\(select\)/i);
  assert.deepEqual(sql.outputs.filter(x => typeof x === 'string' && /extra argument/.test(x)), []);
  assert.deepEqual(sql.result, { success: true, remainder: 'SELECT 1;', commands: 1 });

  // commands go on while the next line starts with a backslash, and the remainder is from the first that doesn't
  const lines = await run('\\dt film \\dv\n\n  \\di\nSELECT 1;\n\\dm', { multipleCommands: true });
  assert.equal(lines.queries.length, 3);
  assert.deepEqual(lines.result, { success: true, remainder: 'SELECT 1;\n\\dm', commands: 3 });

  // SQL after a command on the same line starts the remainder, which includes the lines after it
  assert.deepEqual((await run('\\dt \\\\ SELECT\n1;', { multipleCommands: true })).result,
    { success: true, remainder: 'SELECT\n1;', commands: 1 });

  // a failed command ends its line, but not the commands on the lines after it
  const failed = await run('\\dz \\dt\n\\dv', { multipleCommands: true });
  assert.equal(failed.queries.length, 1);
  assert.deepEqual(failed.result, { success: false, remainder: '', commands: 2 });
});

// 10. Options ---------------------------------------------------------------

test('the options must be an object of known options: positional ones (from before 0.2) are a TypeError', () => {
  const call = options => () => describe('\\dt', 'testdb', async () => emptyResult, () => {}, options);
  assert.throws(call(true), { name: 'TypeError', message: /fifth argument must be an object of options.*not boolean/ });
  assert.throws(call(null), { name: 'TypeError', message: /not null/ });
  assert.throws(call([]), TypeError);
  assert.throws(call({ sversion: 170000 }), { name: 'TypeError', message: /unknown option sversion/ });
  assert.throws(() => describe('\\dt', 'testdb', async () => emptyResult, () => {}, true, 170000, false), TypeError);
  assert.doesNotThrow(call(undefined));
  assert.doesNotThrow(call({ echoHidden: true, serverVersion: 170000 }));
});
