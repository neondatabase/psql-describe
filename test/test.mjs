#!/usr/bin/env node

import pg from 'pg';
import fs from 'fs';
import { describe, describeDataToString } from '../src/describe.mjs';
import { execFileSync, spawn } from 'child_process';

const [psqlPath, dbUrl, transport] = process.argv.slice(2);
const db = parseURL(dbUrl);
const useHttp = transport === 'http';

console.log(`
PSQL:      ${psqlPath}
DB:        postgres://${db.auth !== ':' ? db.auth + '@' : ''}${db.hostname}${db.port ? ':' + db.port : ''}${db.pathname}
Transport: ${useHttp ? 'http' : 'pg'}
`);

async function spawnAsync(command, args, options) {
  // ridiculous shenanigans to work around spawnSync output truncation: https://github.com/nodejs/node/issues/19218
  return new Promise(resolve => {
    let output = '';
    const cmd = spawn(command, args, options);

    cmd.stdin.write(options.input);
    cmd.stdin.end();

    cmd.stdout.setEncoding('utf8');
    cmd.stdout.on('data', data => output += data);

    cmd.stderr.setEncoding('utf8');
    cmd.stderr.on('data', data => output += data);

    cmd.on('close', code => resolve(output));
  });
}

export function parseURL(url, parseQueryString = false) {
  const { protocol } = new URL(url);
  // we now swap the protocol to http: so that `new URL()` will parse it fully
  const httpUrl = 'http:' + url.substring(protocol.length);
  let { username, password, host, hostname, port, pathname, search, searchParams, hash } = new URL(httpUrl);
  password = decodeURIComponent(password);
  const auth = username + ':' + password;
  const query = parseQueryString ? Object.fromEntries(searchParams.entries()) : search;
  return { href: url, protocol, auth, username, password, host, hostname, port, pathname, search, query, hash };
}

function psql(input) {
  return spawnAsync(psqlPath, [dbUrl, '-E'], {
    input,
    env: { ...process.env, PGCLIENTENCODING: 'UTF8' },  // to match node-postgres for /dconfig
  });
}

function countLines(str) {
  let pos = -1, lineCount = 1;
  while ((pos = str.indexOf('\n', pos + 1)) !== -1) lineCount++;
  return lineCount;
}

let queryFn, pool;

if (useHttp) {
  const headers = {
    'Neon-Connection-String': dbUrl,
    'Neon-Raw-Text-Output': 'true',  // because we want raw Postgres text format
    'Neon-Array-Mode': 'true',  // this saves data and post-processing even if we return objects, not arrays
    'Neon-Pool-Opt-In': 'true',
  };
  queryFn = async (sql) => {
    const response = await fetch('https://proxy.localtest.me:4444/sql', {
      method: 'POST',
      body: JSON.stringify({ query: sql, params: [] }),
      headers,
    });
    const json = await response.json();
    if (response.status === 200) return json;
    const msg = json.message.match(/ERROR: (.*?)\n/)[1];
    throw new Error(msg);
  }

} else {
  pg.types.getTypeParser = () => x => x;  // raw pg text format for everything
  pool = new pg.Pool({
    connectionString: dbUrl,
    application_name: 'psql',  // to match psql for /dconfig
  });
  queryFn = sql => pool.query({ text: sql, rowMode: 'array' })
}

const
  testsStr = fs.readFileSync(process.stdin.fd, 'utf-8'),
  tests = testsStr.split('\n').map(t => t.trim()).filter(x => !!x);

for (let test of tests) {
  const psqlOutput = await psql(test);

  const localOutputArr = [];
  await describe(test, db.pathname.slice(1), queryFn, x => localOutputArr.push(x), true).promise;
  const localOutput = localOutputArr.map(x => describeDataToString(x)).join('\n\n');

  const stdPsqlOutput = psqlOutput
    // in case an older v17 release is compared: https://github.com/postgres/postgres/commit/923a71584fd7efb5302cb8bf5a5bd417b531123f
    .replace(/pg_catalog\.cardinality\(([^)]+)\) = 0/g, 'pg_catalog.array_length($1, 1) = 0')
    .replace(/ +$/gm, '').trim();

  const stdLocalOutput = localOutput.replace(/ +$/gm, '').trim();

  let pass = stdPsqlOutput === stdLocalOutput;

  // exceptions: ignore unimportant differences
  if (!pass) {
    if (test === '\\dFp+' &&
      stdPsqlOutput.replace(/\n\(\d+ rows?\)/g, '')
      === stdLocalOutput.replace(/\n\(\d+ rows?\)/g, '')) {
      pass = true;

    } else if ((test === '\\dconfig' || test === '\\dconfig+') &&
      stdPsqlOutput.replace(/\n\s*application_name[^\n]+/, '').replace(/\n\(\d+ rows?\)/g, '')
      === stdLocalOutput.replace(/\n\(\d+ rows?\)/g, '')) {
      pass = true;

    }
  }

  const lineCount = countLines(stdLocalOutput);
  console.log(pass ? 'Pass' + ' '.repeat(6 - String(lineCount).length) : '*** FAIL ***', lineCount, ' ' + test);

  if (!pass) {
    fs.writeFileSync('psql.txt', stdPsqlOutput);
    fs.writeFileSync('local.txt', stdLocalOutput);
    break;
  }
}

if (!useHttp) await pool.end();
