#!/usr/bin/env node

import fs from 'node:fs';
import { spawn, spawnSync } from 'node:child_process';
import { helpIndex } from '../src/sql-help.generated.mjs';

const POSTGRES_VERSIONS = [
  { major: '14', tag: '14' },
  { major: '15', tag: '15' },
  { major: '16', tag: '16' },
  { major: '17', tag: '17' },
  { major: '18', tag: '18' },
  { major: '19', tag: '19beta3' },
];
const PAGILA_REVISION = 'e0e35a666f31a786b9d3c06cb83799fc46db25d4';
const PAGILA_SCHEMA_URL =
  `https://raw.githubusercontent.com/devrimgunduz/pagila/${PAGILA_REVISION}/pagila-schema.sql`;
const PAGILA_DATA_URL =
  `https://raw.githubusercontent.com/devrimgunduz/pagila/${PAGILA_REVISION}/pagila-data.sql`;
const POSTGRES_PASSWORD = 'postgres';
const POSTGRES_DB = 'psqldescribe';

function usage() {
  return `Usage: node test/test-matrix.mjs [options]

Run database-dependent tests against official PostgreSQL container images.
PostgreSQL 19beta3 psql is used as the reference client for every server.

Options:
  --runtime podman|docker   Container runtime (auto-detected by default)
  --versions LIST          Comma-separated majors, e.g. 14,17,19
  --no-pull                Use locally cached images without pulling updates
  -h, --help               Show this help
`;
}

function parseArgs(args) {
  let runtime;
  let pull = true;
  let versions = POSTGRES_VERSIONS;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '-h' || arg === '--help') {
      process.stdout.write(usage());
      process.exit(0);
    } else if (arg === '--no-pull') {
      pull = false;
    } else if (arg === '--runtime' || arg === '--versions') {
      const value = args[++i];
      if (!value) throw new Error(`${arg} requires a value`);
      if (arg === '--runtime') runtime = value;
      else versions = selectVersions(value);
    } else if (arg.startsWith('--runtime=')) {
      runtime = arg.slice('--runtime='.length);
    } else if (arg.startsWith('--versions=')) {
      versions = selectVersions(arg.slice('--versions='.length));
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }

  if (runtime && runtime !== 'podman' && runtime !== 'docker') {
    throw new Error(`unsupported container runtime: ${runtime}`);
  }

  return { runtime, pull, versions };
}

function selectVersions(value) {
  const requested = value.split(',').map(version => version.trim()).filter(Boolean);
  const selected = requested.map(version => {
    const match = POSTGRES_VERSIONS.find(
      candidate => candidate.major === version || candidate.tag === version,
    );
    if (!match) throw new Error(`unsupported PostgreSQL version: ${version}`);
    return match;
  });
  if (selected.length === 0) throw new Error('--versions must not be empty');
  return selected;
}

function runtimeWorks(runtime) {
  return spawnSync(runtime, ['info'], { stdio: 'ignore' }).status === 0;
}

function detectRuntime(requested) {
  if (requested) {
    if (!runtimeWorks(requested)) {
      throw new Error(`${requested} is not available or its service is not running`);
    }
    return requested;
  }

  for (const candidate of ['podman', 'docker']) {
    if (runtimeWorks(candidate)) return candidate;
  }
  throw new Error('neither Podman nor Docker is available');
}

function run(command, args, { input, env, capture = false } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      env: env ? { ...process.env, ...env } : process.env,
      stdio: [input === undefined ? 'inherit' : 'pipe', capture ? 'pipe' : 'inherit', capture ? 'pipe' : 'inherit'],
    });
    let output = '';

    if (capture) {
      child.stdout.setEncoding('utf8');
      child.stderr.setEncoding('utf8');
      child.stdout.on('data', chunk => output += chunk);
      child.stderr.on('data', chunk => output += chunk);
    }
    if (input !== undefined) child.stdin.end(input);

    child.on('error', reject);
    child.on('close', code => {
      if (code === 0) resolve(output);
      else reject(new Error(`${command} ${args.join(' ')} exited with status ${code}${output ? `\n${output}` : ''}`));
    });
  });
}

async function download(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`could not download ${url}: HTTP ${response.status}`);
  return response.text();
}

async function loadCachedFixture(url, filename) {
  const cacheDirectory = new URL('./cache/', import.meta.url);
  const cachePath = new URL(`${PAGILA_REVISION}-${filename}`, cacheDirectory);

  try {
    const fixture = fs.readFileSync(cachePath, 'utf8');
    console.log(`Using cached ${filename}`);
    return fixture;
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  console.log(`Downloading ${filename}`);
  const fixture = await download(url);
  fs.mkdirSync(cacheDirectory, { recursive: true });
  fs.writeFileSync(cachePath, fixture);
  return fixture;
}

const { runtime: requestedRuntime, pull, versions } = parseArgs(process.argv.slice(2));
const runtime = detectRuntime(requestedRuntime);
const imagePrefix = process.env.POSTGRES_IMAGE_PREFIX || 'docker.io/library/postgres';
const runId = `${process.pid}-${Date.now()}`;
const network = `psql-describe-${runId}`;
const containers = [];
const schemaDirectory = new URL('./schema/', import.meta.url);
const commandsDirectory = new URL('./commands/', import.meta.url);
const additions = fs.readFileSync(new URL('./schema/test-pagila-additions.sql', import.meta.url), 'utf8');
const databaseTests = fs.readFileSync(new URL('./commands/tests.txt', import.meta.url), 'utf8');
const helpTests = helpIndex.map(entry => `\\h ${entry[0]}`).join('\n');
const versionedAdditions = findVersionedFiles(schemaDirectory, /^test-pagila-additions-(\d+)\.sql$/);
const versionedDatabaseTests = findVersionedFiles(commandsDirectory, /^tests-(\d+)\.txt$/);
let cleaningUp = false;

function findVersionedFiles(directory, pattern) {
  return fs.readdirSync(directory)
    .map(filename => {
      const match = filename.match(pattern);
      return match && {
        filename,
        minimumVersion: Number(match[1]),
        contents: fs.readFileSync(new URL(filename, directory), 'utf8'),
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.minimumVersion - b.minimumVersion);
}

function filesForVersion(files, version) {
  return files.filter(file => file.minimumVersion <= Number(version.major));
}

function image(version) {
  return `${imagePrefix}:${version.tag}`;
}

function containerName(version) {
  return `psql-describe-pg${version.major}-${runId}`;
}

function cleanup() {
  if (cleaningUp) return;
  cleaningUp = true;

  for (const container of containers.reverse()) {
    spawnSync(runtime, ['rm', '--force', container], { stdio: 'ignore' });
  }
  spawnSync(runtime, ['network', 'rm', network], { stdio: 'ignore' });
}

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    cleanup();
    process.exit(signal === 'SIGINT' ? 130 : 143);
  });
}

async function waitUntilReady(container) {
  let consecutiveReadyChecks = 0;

  for (let attempt = 0; attempt < 120; attempt++) {
    const status = spawnSync(
      runtime,
      ['exec', container, 'pg_isready', '-U', 'postgres', '-d', POSTGRES_DB],
      { stdio: 'ignore' },
    ).status;
    consecutiveReadyChecks = status === 0 ? consecutiveReadyChecks + 1 : 0;
    // initdb briefly starts and then stops a temporary server. Waiting for
    // several successful checks avoids racing that shutdown.
    if (consecutiveReadyChecks === 4) return;
    await new Promise(resolve => setTimeout(resolve, 250));
  }

  await run(runtime, ['logs', container]);
  throw new Error(`${container} did not become ready`);
}

async function startServer(version) {
  const container = containerName(version);
  const alias = `pg${version.major}`;

  await run(runtime, [
    'run',
    '--detach',
    '--rm',
    '--name', container,
    '--network', network,
    '--network-alias', alias,
    '--env', `POSTGRES_PASSWORD=${POSTGRES_PASSWORD}`,
    '--env', `POSTGRES_DB=${POSTGRES_DB}`,
    '--publish', '127.0.0.1::5432',
    image(version),
  ], { capture: true });
  containers.push(container);
  await waitUntilReady(container);

  const portOutput = await run(runtime, ['port', container, '5432/tcp'], { capture: true });
  const port = portOutput.trim().match(/:(\d+)$/)?.[1];
  if (!port) throw new Error(`could not determine host port from: ${portOutput}`);

  return {
    alias,
    container,
    hostUrl: `postgres://postgres:${POSTGRES_PASSWORD}@127.0.0.1:${port}/${POSTGRES_DB}`,
    networkUrl: `postgres://postgres:${POSTGRES_PASSWORD}@${alias}:5432/${POSTGRES_DB}`,
  };
}

async function loadSql(container, label, sql) {
  process.stdout.write(`Loading ${label} ... `);
  await run(
    runtime,
    ['exec', '-i', container, 'psql', '-v', 'ON_ERROR_STOP=1', '-U', 'postgres', '-d', POSTGRES_DB],
    { input: sql, capture: true },
  );
  console.log('done');
}

async function setupDatabase(server, version, pagilaSchema, pagilaData) {
  await loadSql(server.container, 'Pagila schema', pagilaSchema);
  await loadSql(server.container, 'Pagila data', pagilaData);
  await loadSql(server.container, 'psql-describe additions', additions);
  for (const fixture of filesForVersion(versionedAdditions, version)) {
    await loadSql(server.container, fixture.filename, fixture.contents);
  }
}

async function runTests(server, referenceContainer, label, tests) {
  console.log(`\n${label}`);
  await run(
    process.execPath,
    ['test/test.mjs', 'container-psql', server.hostUrl],
    {
      input: tests,
      env: {
        PSQL_CONTAINER_RUNTIME: runtime,
        PSQL_CONTAINER: referenceContainer,
        PSQL_DATABASE_URL: server.networkUrl,
      },
    },
  );
}

try {
  console.log(`Container runtime: ${runtime}`);
  console.log(`PostgreSQL versions: ${versions.map(version => version.tag).join(', ')}`);

  const requiredImages = new Map(
    [...versions, POSTGRES_VERSIONS.at(-1)].map(version => [image(version), version]),
  );
  if (pull) {
    for (const imageName of requiredImages.keys()) {
      console.log(`Pulling ${imageName}`);
      await run(runtime, ['pull', imageName]);
    }
  }

  const [pagilaSchema, pagilaData] = await Promise.all([
    loadCachedFixture(PAGILA_SCHEMA_URL, 'pagila-schema.sql'),
    loadCachedFixture(PAGILA_DATA_URL, 'pagila-data.sql'),
  ]);

  await run(runtime, ['network', 'create', network], { capture: true });

  const referenceVersion = POSTGRES_VERSIONS.at(-1);
  const referenceServer = await startServer(referenceVersion);

  await runTests(referenceServer, referenceServer.container, 'SQL help', helpTests);

  for (const version of versions) {
    const server = version.major === referenceVersion.major
      ? referenceServer
      : await startServer(version);

    await setupDatabase(server, version, pagilaSchema, pagilaData);
    const tests = [
      databaseTests,
      ...filesForVersion(versionedDatabaseTests, version).map(file => file.contents),
    ].join('\n');
    await runTests(
      server,
      referenceServer.container,
      `PostgreSQL ${version.tag}`,
      tests,
    );

    if (server !== referenceServer) {
      await run(runtime, ['rm', '--force', server.container], { capture: true });
      containers.splice(containers.indexOf(server.container), 1);
    }
  }
} catch (error) {
  console.error(`\nTest matrix failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  cleanup();
}
