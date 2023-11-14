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

let cancelFn;

function end() {
  goBtn.value = goBtnUsualTitle;
  spinner.style.display = 'none';
  cancelFn = undefined;
}

async function go() {
  if (cancelFn === undefined) {
    goBtn.value = "Cancel";
    spinner.style.display = 'block';

    const connectionString = document.querySelector('#dburl').value;
    let dbName, dbHost;
    try {
      const parsedConnnectionString = parse(connectionString);
      dbName = parsedConnnectionString.pathname.slice(1);
      dbHost = parsedConnnectionString.hostname;

    } catch (err) {
      alert('Invalid database URL');
      end();
      return;
    }

    const
      cmd = document.querySelector('#sql').value,
      echoHidden = document.querySelector('#echohidden').checked,
      htmlOutput = document.querySelector('#html').checked;

    sessionStorage.setItem('form', JSON.stringify({ connectionString, cmd, echoHidden, htmlOutput }));

    const headers = {
      'Neon-Connection-String': connectionString,
      'Neon-Raw-Text-Output': 'true',  // because we want raw Postgres text format
      'Neon-Array-Mode': 'true',  // this saves data and post-processing even if we return objects, not arrays
      'Neon-Pool-Opt-In': 'true',
    };

    queryFn = async (sql) => {
      const response = await fetch(`https://${dbHost}/sql`, {
        method: 'POST',
        body: JSON.stringify({ query: sql, params: [] }),
        headers,
      });

      const json = await response.json();
      if (response.status === 200) return json;

      const
        jsonMsg = json.message,
        msgMatch = jsonMsg.match(/ERROR: (.*?)\n/),
        errMsg = msgMatch ? msgMatch[1] : jsonMsg;

      throw new Error(errMsg);
    }

    let outputEl = document.querySelector('#output');
    outputEl.innerHTML = '';
    if (!htmlOutput) outputEl = outputEl.appendChild(document.createElement('pre'));

    let firstOutput = true;
    const outputFn = htmlOutput ?
      x => outputEl.innerHTML += describeDataToHtml(x) :
      x => {
        outputEl.innerHTML += (firstOutput ? '' : '\n\n') + describeDataToString(x, true);
        firstOutput = false;
      };

    const { promise, cancel } = describe(cmd, dbName, queryFn, outputFn, echoHidden);
    cancelFn = cancel;
    const status = await promise;

    if (status !== null) end();  // if this query was cancelled, ignore that it returned; otherwise:

  } else {
    cancelFn();
    end();
  }
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
  if (e.key === "Enter") go();
  e.preventDefault();
})

document.querySelector('#examples').addEventListener('click', (e) => {
  if (e.target.nodeName === 'A') document.querySelector('#sql').value = e.target.textContent;
  e.preventDefault();
});

const spinner = document.querySelector('#spinner');


