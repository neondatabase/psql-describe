#!/usr/bin/env node

// Unit tests for the public JavaScript API of psql-describe. Unlike the
// container matrix, these never talk to a real PostgreSQL server: runQuery is a
// stub, so we can exercise behaviour that psql itself cannot be the oracle for
// (HTML rendering, cancellation, error propagation, the docs-URL template,
// server-version gating and standard_conforming_strings escaping).

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { describe, describeDataToString, describeDataToHtml } from '../src/describe.mjs';

const tick = () => new Promise(resolve => setImmediate(resolve));

// A stub result in the shape the PQ* wrappers expect (rowCount/fields/rows).
const emptyResult = { rowCount: 0, fields: [], rows: [] };

// Run a command with a runQuery that records the first SQL it is asked to run
// and then aborts, so we can inspect the generated SQL without a database.
async function firstQuery(cmd, { sversion, std_strings = true } = {}) {
  let captured;
  await describe(
    cmd,
    'testdb',
    sql => { captured = sql; throw new Error('stop'); },
    () => {},
    false,
    sversion,
    std_strings,
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
    '\\l', 'testdb', runQuery, x => outputs.push(x), false, 190000,
  );

  await tick();  // let describe reach its first runQuery call
  assert.equal(typeof resolveQuery, 'function');

  cancel();
  resolveQuery(emptyResult);  // the query now "completes" after cancellation

  const resolved = await promise;
  assert.equal(resolved, null);      // cancelled commands resolve to null
  assert.deepEqual(outputs, []);     // nothing is emitted after cancel()
});

// 3. Error propagation -----------------------------------------------------

test('a rejected runQuery surfaces as an error, not a hang', async () => {
  const outputs = [];
  const resolved = await describe(
    '\\l', 'testdb',
    () => Promise.reject(new Error('boom-async')),
    x => outputs.push(x),
    false, 190000,
  ).promise;

  assert.equal(resolved, false);
  assert.ok(outputs.some(o => typeof o === 'string' && o.includes('boom-async')));
});

test('a synchronously throwing runQuery surfaces as an error', async () => {
  const outputs = [];
  const resolved = await describe(
    '\\l', 'testdb',
    () => { throw new Error('boom-sync'); },
    x => outputs.push(x),
    false, 190000,
  ).promise;

  assert.equal(resolved, false);
  assert.ok(outputs.some(o => typeof o === 'string' && o.includes('boom-sync')));
});

// 4. docsURLTemplate -------------------------------------------------------

test('\\h uses a custom docsURLTemplate for the help URL', async () => {
  const outputs = [];
  const resolved = await describe(
    '\\h SELECT', 'testdb',
    () => { throw new Error('runQuery should not be called for \\h'); },
    x => outputs.push(x),
    false, 190000, true,
    id => `https://docs.example.test/${id}`,
  ).promise;

  const text = outputs.join('\n');
  assert.equal(resolved, false);           // \h is informational, returns false
  assert.ok(text.includes('Command:     SELECT'));
  assert.ok(text.includes('URL: https://docs.example.test/'));
  assert.ok(!text.includes('postgresql.org'));  // the default template is unused
});

// 5. Pinned sversion -------------------------------------------------------

test('an explicit sversion changes the generated SQL', async () => {
  const sql14 = await firstQuery('\\l', { sversion: 140000 });
  const sql19 = await firstQuery('\\l', { sversion: 190000 });

  assert.notEqual(sql14, sql19);
  // PostgreSQL 17+ selects d.datlocale; earlier versions do not
  assert.ok(sql19.includes('datlocale'));
  assert.ok(!sql14.includes('datlocale'));
});

// 6. std_strings ------------------------------------------------------------

test('std_strings controls backslash escaping in generated SQL', async () => {
  // A "$" in a pattern is always emitted as "\$" in the regex literal, so the
  // literal contains a backslash whose escaping depends on std_strings. We use
  // sversion 190000 so the pre-v19 E'...' kluge does not apply and std_strings
  // alone governs the result.
  const sqlStd = await firstQuery('\\dt foo$bar', { sversion: 190000, std_strings: true });
  const sqlNonStd = await firstQuery('\\dt foo$bar', { sversion: 190000, std_strings: false });

  assert.notEqual(sqlStd, sqlNonStd);
  // standard_conforming_strings on: the backslash is left as-is
  assert.ok(sqlStd.includes('foo\\$bar'));
  assert.ok(!sqlStd.includes('foo\\\\$bar'));
  // standard_conforming_strings off: the backslash is doubled
  assert.ok(sqlNonStd.includes('foo\\\\$bar'));
});
