#!/usr/bin/env node

import pg from 'pg';
import fs from 'fs';
import { describe, describeDataToString } from '../src/describe.mjs';
import { spawnSync } from 'child_process';

const [psqlPath, dbUrl] = process.argv.slice(2);
console.log(`PSQL: ${psqlPath}\nDB:   ${dbUrl.replace(/(?<=^postgres(ql)?:[/][/][^:]+:)[^@]+(?=@)/, '***')}\n`);

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

const
  pool = new pg.Pool({
    connectionString: dbUrl,
    application_name: 'psql',  // to match psql for /dconfig
  }),
  queryFn = sql => pool.query({ text: sql, rowMode: 'array' }),
  testsStr = fs.readFileSync(process.stdin.fd, 'utf-8'),
  tests = testsStr.split('\n').map(t => t.trim()).filter(x => !!x);

for (let test of tests) {
  const psqlOutput = psql(test);

  const localOutputArr = [];
  await describe(pg, test, 'main', queryFn, x => localOutputArr.push(x), true);
  const localOutput = localOutputArr.map(x => describeDataToString(x)).join('\n\n');

  const stdPsqlOutput = psqlOutput.replace(/ +$/gm, '').trim();  // .replace(/\n\(\d+ rows?\)/g, '')
  const stdLocalOutput = localOutput.replace(/ +$/gm, '').trim();

  let pass = stdPsqlOutput === stdLocalOutput;

  // weird exception
  if (!pass && test === '\\dFp+' && stdPsqlOutput.replace(/\n\(\d+ rows?\)/g, '') === stdLocalOutput.replace(/\n\(\d+ rows?\)/g, '')) pass = true;

  const lineCount = countLines(stdLocalOutput);
  console.log(pass ? 'Pass' + ' '.repeat(6 - String(lineCount).length) : '*** FAIL ***', lineCount, ' ' + test);

  if (!pass) {
    fs.writeFileSync('psql.txt', stdPsqlOutput);
    fs.writeFileSync('local.txt', stdLocalOutput);
    break;
  }
}

await pool.end();
