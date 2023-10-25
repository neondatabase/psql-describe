
import pg from '@neondatabase/serverless';
import { neon, Pool } from '@neondatabase/serverless';
import { describe, describeDataToString } from '../src/describe.mjs';

document.querySelector('#gobtn').addEventListener('click', async () => {
  const connectionString = document.querySelector('#dburl').value;
  const dbName = connectionString.match(/[/]\w+(?=\?|$)/)[0];
  const cmd = document.querySelector('#sql').value;
  const echoHidden = document.querySelector('#echohidden').checked;
  // const queryFn = neon(connectionString, { arrayMode: true, fullResults: true });
  const pool = new Pool({ connectionString });
  const queryFn = sql => pool.query({ text: sql, rowMode: 'array' });
  const tableData = await describe(pg, cmd, dbName, queryFn, echoHidden);
  const output = describeDataToString(tableData);
  document.querySelector('#output').innerText = output;
});

