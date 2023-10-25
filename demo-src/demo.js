
import pg from '@neondatabase/serverless';
import { neon, Pool } from '@neondatabase/serverless';
import { describe, describeDataToString, describeDataToHtml } from '../src/describe.mjs';

const goBtn = document.querySelector('#gobtn');
const goBtnUsualTitle = goBtn.value;
goBtn.addEventListener('click', async () => {
  const connectionString = document.querySelector('#dburl').value;
  const dbName = connectionString.match(/[/]\w+(?=\?|$)/)[0];
  const cmd = document.querySelector('#sql').value;
  const echoHidden = document.querySelector('#echohidden').checked;
  // const queryFn = neon(connectionString, { arrayMode: true, fullResults: true });
  const pool = new Pool({ connectionString });
  const queryFn = sql => pool.query({ text: sql, rowMode: 'array' });
  goBtn.disabled = true;
  goBtn.value = "Working ...";
  const tableData = await describe(pg, cmd, dbName, queryFn, echoHidden);
  goBtn.disabled = false;
  goBtn.value = goBtnUsualTitle;
  const output = describeDataToHtml(tableData);
  document.querySelector('#output').innerHTML = output;
});

