# psql-describe

psql's `\d` (describe) family of commands ported to JavaScript.

* From Postgres `REL_19_0`, we take `exec_command_sf_sv`, `print_with_linenumbers`, `lookup_object_oid`, `get_create_object_cmd`, `exec_command_d`, `exec_command_list` and from `command.c`, and all of `describe.c` and `sql_help.c`, from `src/bin/psql` (note that `sql_help.c` is generated during compilation of psql: to get hold of it, you first need to run `./configure` in the Postgres repo root followed by `make` in `src/bin/psql`).
* We use plenty of RegExp search-and-replace to turn this C code into valid JS syntax.
* We implement some C library functions, such as `strlen` and `strchr`, and some Postgres support functions, such as `printTable` and `printQuery`, in JavaScript.
* We write tests to catch problems, mostly related to pointer arithmetic, pointer dereferencing, and pointer output parameters. Then we fix them.

This approach means that some of the 13,000+ lines of code in `describe.mjs` may never actually have been looked at. If you find a bug, please file an issue.

This library is [on npm](https://www.npmjs.com/package/psql-describe) and [powers backslash commands in the Neon SQL Editor](https://neon.tech/blog/bringing-psqls-d-to-your-web-browser).

## Usage

The key export is the `describe()` function:

```typescript
describe(
  cmd,
  dbName,
  runQuery,
  outputFn,
  echoHidden = false,
  sversion = null,
  std_strings = true, 
  docsURLTemplate = (id) => `https://www.postgresql.org/docs/19/${id}.html`,
): { promise, cancel };
```

* `cmd` (string) is the desired describe command, including the leading backslash, such as `\d` (don't forget you may need to escape the backslash in a literal string).
* `dbName` (string) is the name of the connected database.
* `runQuery` is an async function that takes a SQL query (string) and must return *unparsed* query results in the same format used by node-postgres when specifying `rowMode: 'array'`.
* `outputFn` is a function that receives output for display: this output will be either a string or a table object (see below).
* `echoHidden` (boolean) has the same effect as the `-E` argument to psql: if `true`, all SQL queries are output to `outputFn`, in addition to the final results.
* `sversion` (number) should be the same value as `SHOW server_version_num` executed on the server. It is used to determine what features the database supports. If it is not provided, the server is queried for it.
* `std_strings` (boolean) indicates the value of `standard_conforming_strings` in the database.
* `docsURLTemplate` (function) specifies how a docs page ID is transformed into a URL, for use with `\h`. 

The function returns an object with two keys: `{ promise, cancel }`: 

* `promise` is a `Promise` that resolves when the command completes. 
* `cancel()` is a function you can call to abort the command.

The outputs of `describe()`, as passed to the `outputFn` argument, are a mix of plain strings and JS objects representing tables.

To format these outputs for display, two additional functions are exported:

* ```describeDataToString(item)```

This function passes though string items unchanged. When an object item is passed in, a formatted plain-text table is returned, identical to those produced by the psql CLI.

* ```describeDataToHtml(item)```

This function HTML-escapes string items, and formats object items as HTML tables (whose contents are HTML-escaped).

## Limitation

The `x` option to provide expanded output, which was added to most commands in Postgres 18, is not supported. If it is supplied, it is ignored, except that a message noting that it is unsupported is appended to the output.

## Tests

The database-dependent tests compare this software's output against the PostgreSQL 19 `psql` client for the commands in `test/tests.txt`. Output should be character-for-character identical, except for differences in trailing whitespace. The same client is tested against the latest official PostgreSQL 14, 15, 16, 17, and 18 container images and the PostgreSQL 19 beta 3 image, so that all server-version branches are exercised.

In case of failure, the tests halt and a `psql.txt` and `local.txt` are written, which you can then `diff`.

The SQL help tests are compared against the PostgreSQL 19 `psql` client once, rather than being repeated for every server version. The JavaScript implementation does not query the database for these commands; the reference client only needs a connection so that `psql` can start.

The full test command automatically uses Podman if it is available, then Docker:

```bash
npm test
```

The matrix pulls current images for the floating PostgreSQL 14–18 major-version tags before running. You can select a runtime or a subset of versions, or use already-cached images:

```bash
npm run test:matrix -- --runtime docker
npm run test:matrix -- --versions 18,19 --no-pull
```

The matrix downloads Pagila on first use and caches it in the ignored `test/cache` directory. It creates disposable containers and a private container network, loads the fixtures, and removes the containers and network when it finishes.

Commands in `test/tests-N.txt` and fixtures in `test/test-pagila-additions-N.sql` are included only for PostgreSQL `N` and later. The unversioned files apply to every tested version.

### Testing an existing database

To run the database tests directly, create a database named `psqldescribe` containing the [Pagila](https://github.com/devrimgunduz/pagila) data set, with a few additions:

```bash
PAGILA_REVISION=e0e35a666f31a786b9d3c06cb83799fc46db25d4
curl https://raw.githubusercontent.com/devrimgunduz/pagila/$PAGILA_REVISION/pagila-schema.sql | psql psqldescribe
curl https://raw.githubusercontent.com/devrimgunduz/pagila/$PAGILA_REVISION/pagila-data.sql | psql psqldescribe
psql psqldescribe < test/test-pagila-additions.sql
node test/test.mjs /path/to/psql postgres://localhost/psqldescribe < test/tests.txt
```

## License

This package is released under the [Postgres license](LICENSE).
