
import pg from '@neondatabase/serverless';
import { Pool } from '@neondatabase/serverless';
import { describe, describeDataToString, describeDataToHtml } from '../src/describe.mjs';

function parse(url, parseQueryString) {
  const { protocol } = new URL(url);
  // we now swap the protocol to http: so that `new URL()` will parse it fully
  const httpUrl = 'http:' + url.substring(protocol.length);
  let { username, password, host, hostname, port, pathname, search, searchParams, hash } = new URL(httpUrl);
  password = decodeURIComponent(password);
  const auth = username + ':' + password;
  const query = parseQueryString ? Object.fromEntries(searchParams.entries()) : search;
  return { href: url, protocol, auth, username, password, host, hostname, port, pathname, search, query, hash };
}

async function go() {
  const connectionString = document.querySelector('#dburl').value;
  let dbName;
  try { dbName = parse(connectionString).pathname.slice(1); }
  catch (err) {
    alert('Invalid connection string');
    return;
  }

  const cmd = document.querySelector('#sql').value;
  const echoHidden = document.querySelector('#echohidden').checked;
  const htmlOutput = document.querySelector('#html').checked;

  sessionStorage.setItem('form', JSON.stringify({ connectionString, cmd, echoHidden, htmlOutput }));

  const pool = new Pool({ connectionString });
  const queryFn = sql => pool.query({ text: sql, rowMode: 'array' });

  goBtn.disabled = true;
  goBtn.value = "Working ...";

  let outputEl = document.querySelector('#output');
  if (!htmlOutput) outputEl = outputEl.appendChild(document.createElement('pre'));
  outputEl.innerHTML = '';

  const outputFn = htmlOutput ?
    x => outputEl.innerHTML += describeDataToHtml(x) :
    x => outputEl.innerHTML += describeDataToString(x, true) + '\n\n';

  await describe(pg, cmd, dbName, queryFn, outputFn, echoHidden);
  goBtn.disabled = false;
  goBtn.value = goBtnUsualTitle;
}

window.addEventListener('load', () => {
  const saveData = sessionStorage.getItem('form');
  if (!saveData) return;
  const { connectionString, cmd, echoHidden, htmlOutput } = JSON.parse(saveData);
  document.querySelector('#dburl').value = connectionString;
  document.querySelector('#sql').value = cmd;
  document.querySelector('#echohidden').checked = echoHidden;
  document.querySelector('#html').checked = htmlOutput;
});

const goBtn = document.querySelector('#gobtn');
const goBtnUsualTitle = goBtn.value;
goBtn.addEventListener('click', go);

document.querySelector('#sql').addEventListener('keyup', (e) => {
  if (e.key === "Enter" && goBtn.disabled === false) go();
  e.preventDefault();
})

document.querySelector('#examples').addEventListener('click', (e) => {
  if (e.target.nodeName === 'A' && goBtn.disabled === false) {
    document.querySelector('#sql').value = e.target.textContent;
    go();
  }
  e.preventDefault();
});

