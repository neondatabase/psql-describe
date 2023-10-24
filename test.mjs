#!/usr/bin/env node

import pg from 'pg';
import fs from 'fs';
import { describe, describeToString } from './describe.mjs';
import { execFileSync } from 'child_process';

const [psqlPath, dbUrl] = process.argv.slice(2);
console.log(`PSQL: ${psqlPath}\nDB:   ${dbUrl.replace(/(?<=^postgres(ql)?:[/][/][^:]+:)[^@]+(?=@)/, '***')}\n`);

function psql(input) {
  return execFileSync(psqlPath, [dbUrl, '-E'], { input }).toString('utf-8');
}

const
  pool = new pg.Pool({ connectionString: dbUrl }),
  queryFn = async sql => pool.query({ text: sql, rowMode: 'array' }),
  testsStr = fs.readFileSync(process.stdin.fd, 'utf-8'),
  tests = testsStr.split('\n').map(t => t.trim()).filter(x => x);

for (let test of tests) {
  const psqlOutput = psql(test);

  const tableData = await describe(pg, test, 'main', queryFn, true);
  const localOutput = describeToString(tableData);

  const stdPsqlOutput = psqlOutput.replace(/\n\(\d+ rows\)/g, '').replace(/ +$/gm, '');
  const stdLocalOutput = localOutput.replace(/ +$/gm, '') + '\n\n';

  const pass = stdPsqlOutput === stdLocalOutput;
  console.log(pass ? 'PASS:' : 'FAIL:', test);

  if (!pass) {
    fs.writeFileSync('psql.txt', stdPsqlOutput);
    fs.writeFileSync('local.txt', stdLocalOutput);
    break;
  }
}

await pool.end();
