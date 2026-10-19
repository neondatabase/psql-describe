#!/usr/bin/env node

import pg from 'pg';
import fs from 'fs';
import { describe, describeDataToString } from '../index.js';
import { spawn } from 'child_process';

const [psqlPath, dbUrl, transport] = process.argv.slice(2);
const db = parseURL(dbUrl);
const useHttp = transport === 'http';
const psqlContainer = process.env.PSQL_CONTAINER;
const psqlContainerRuntime = process.env.PSQL_CONTAINER_RUNTIME;
const psqlDbUrl = process.env.PSQL_DATABASE_URL || dbUrl;

if (psqlContainer && !psqlContainerRuntime) {
  throw new Error('PSQL_CONTAINER_RUNTIME is required when PSQL_CONTAINER is set');
}

console.log(`
PSQL:      ${psqlContainer ? `${psqlContainerRuntime} exec ${psqlContainer} psql` : psqlPath}
DB:        postgres://${db.auth !== ':' ? db.auth + '@' : ''}${db.hostname}${db.port ? ':' + db.port : ''}${db.pathname}
Transport: ${useHttp ? 'http' : 'pg'}
`);

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

function openPsqlSession() {
  const command = psqlContainer ? psqlContainerRuntime : psqlPath;
  const args = psqlContainer
    ? ['exec', '-i', '-e', 'PGCLIENTENCODING=UTF8', psqlContainer, 'psql', psqlDbUrl, '-X', '-P', 'pager=off', '-E']
    : [dbUrl, '-X', '-P', 'pager=off', '-E'];

  const child = spawn(command, args, {
    env: { ...process.env, PGCLIENTENCODING: 'UTF8' },  // to match node-postgres for \dconfig
    stdio: ['pipe', 'pipe', 'pipe'],
  });

  // Results go to stdout, errors such as `\sf` with no argument go to stderr.
  // Completing on an `\echo` marker alone can resolve before stderr is read, so
  // each command is followed by markers on both streams.
  let stdoutBuf = '';
  let stderrBuf = '';
  let seq = 0;
  let pending = null;
  let exitError = null;

  const closed = new Promise(resolve => {
    child.on('close', (code, signal) => {
      if (code && code !== 0) {
        exitError = new Error(`psql exited with status ${code}${stderrBuf || stdoutBuf ? `\n${stdoutBuf}${stderrBuf}` : ''}`);
      } else if (signal) {
        exitError = new Error(`psql exited from signal ${signal}${stderrBuf || stdoutBuf ? `\n${stdoutBuf}${stderrBuf}` : ''}`);
      }
      if (pending) {
        pending.reject(exitError ?? new Error(`psql closed before marker${stderrBuf || stdoutBuf ? `\n${stdoutBuf}${stderrBuf}` : ''}`));
        pending = null;
      }
      resolve();
    });
  });

  child.on('error', error => {
    exitError = error;
    if (pending) {
      pending.reject(error);
      pending = null;
    }
  });

  function takeMarker(stream, marker, keyPart, keyGot) {
    if (!pending || pending[keyGot]) return stream;
    const index = stream.indexOf(marker);
    if (index === -1) return stream;
    // `\echo`/`\warn` always terminate with a newline; wait for it so it is not
    // left in the buffer as a blank line before the next command.
    const after = index + marker.length;
    if (stream.length === after) return stream;
    pending[keyPart] = stream.slice(0, index);
    pending[keyGot] = true;
    return stream[after] === '\n' ? stream.slice(after + 1) : stream.slice(after);
  }

  function checkPending() {
    if (!pending) return;
    stdoutBuf = takeMarker(stdoutBuf, pending.outMarker, 'outPart', 'gotOut');
    stderrBuf = takeMarker(stderrBuf, pending.errMarker, 'errPart', 'gotErr');
    if (pending.gotOut && pending.gotErr) {
      const { resolve, outPart, errPart } = pending;
      pending = null;
      resolve(outPart + errPart);
    }
  }

  child.stdout.setEncoding('utf8');
  child.stderr.setEncoding('utf8');
  child.stdout.on('data', chunk => { stdoutBuf += chunk; checkPending(); });
  child.stderr.on('data', chunk => { stderrBuf += chunk; checkPending(); });

  function waitForMarkers() {
    if (exitError) return Promise.reject(exitError);
    if (pending) return Promise.reject(new Error('psql session is already waiting for output'));

    const id = ++seq;
    const outMarker = `__PSQL_DESCRIBE_OUT_${id}__`;
    const errMarker = `__PSQL_DESCRIBE_ERR_${id}__`;
    const result = new Promise((resolve, reject) => {
      pending = { outMarker, errMarker, gotOut: false, gotErr: false, outPart: '', errPart: '', resolve, reject };
    });
    child.stdin.write(`\\echo ${outMarker}\n\\warn ${errMarker}\n`);
    checkPending();
    return result;
  }

  function run(input) {
    if (exitError) return Promise.reject(exitError);
    child.stdin.write(`${input}\n`);
    return waitForMarkers();
  }

  async function close() {
    if (exitError) {
      await closed;
      return;
    }
    try {
      child.stdin.write('\\q\n');
      child.stdin.end();
    } catch {
      child.kill();
    }
    await closed;
  }

  return { run, close, ready: waitForMarkers };
}

function countLines(str) {
  let pos = -1, lineCount = 1;
  while ((pos = str.indexOf('\n', pos + 1)) !== -1) lineCount++;
  return lineCount;
}

let queryFn, pool, psqlSession;

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
  tests = testsStr.split('\n').map(t => t.trim()).filter(Boolean),
  expandedTests = tests.flatMap(test =>
    /^\\h/.test(test)
    ? test
    : [test, test.replace(/( |$)/, 'x$1')]  // add an 'x'
  );

let failed = false;

try {
  psqlSession = openPsqlSession();
  await psqlSession.ready();

  for (let test of expandedTests) {
    // buggy in psql: https://www.postgresql.org/message-id/FEA91EA9-CF32-4920-9674-F2C3E01C3807%40databricks.com
    if (test.startsWith('\\d+x ') || test.startsWith('\\dS+x ')) continue;

    const localOutputArr = [];
    const [psqlOutput] = await Promise.all([
      psqlSession.run(test),
      describe(
        test,
        db.pathname.slice(1),
        queryFn, (...x) => localOutputArr.push(x),
        true,
        null,
        true,
        id => `https://www.postgresql.org/docs/current/${id}.html`
      ).promise,
    ]);
    const localOutput = localOutputArr.map(x => describeDataToString(...x)).join('\n\n');

    const stdPsqlOutput = psqlOutput
      .replace(/\/docs\/\d+\//g, '/docs/current/')
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
      failed = true;
      break;
    }
  }
} finally {
  await psqlSession?.close();
  if (!useHttp) await pool.end();
}

if (failed) process.exitCode = 1;
