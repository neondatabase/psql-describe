#!/usr/bin/env node

import pg from 'pg';
import fs from 'fs';
import { describe, describeDataToString } from '../src/describe.mjs';
import { spawnSync } from 'child_process';

const [psqlPath, dbUrl, transport] = process.argv.slice(2);
const useHttp = transport === 'http';

console.log(`
PSQL:      ${psqlPath}
DB:        ${dbUrl.replace(/(?<=^postgres(ql)?:[/][/][^:]+:)[^@]+(?=@)/, '***')}
Transport: ${useHttp ? 'http' : 'pg'}
`);

function psql(input) {
  const { stdout, stderr } = spawnSync(psqlPath, [dbUrl, '-E'], {
    input,
    env: { ...process.env, PGCLIENTENCODING: 'UTF8' },  // to match node-postgres for /dconfig
  });
  return stdout.toString('utf-8') + stderr.toString('utf-8');
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
  const psqlOutput = psql(test);

  const localOutputArr = [];
  await describe(test, 'main', queryFn, x => localOutputArr.push(x), true).promise;
  const localOutput = localOutputArr.map(x => describeDataToString(x)).join('\n\n');

  const stdPsqlOutput = psqlOutput.replace(/ +$/gm, '').trim();
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
