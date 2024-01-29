# psql-describe

psql's `\d` (describe) family of commands ported to JavaScript.

* From the Postgres master branch (17devel), we take `exec_command_d`, `exec_command_list` and `exec_command_sf_sv` from `command.c`, and all of `describe.c` and `sql_help.c`, from `src/bin/psql`.
* We use plenty of RegExp search-and-replace to turn this C code into valid JS syntax.
* We implement some C library functions, such as `strlen` and `strchr`, and some Postgres support functions, such as `printTable` and `printQuery`, in JavaScript.
* We write tests to catch (and then fix) problems, mostly related to pointer arithmetic, pointer dereferencing, and pointer output parameters.

This approach means that many of the 8000+ lines of code in `describe.mjs` have not actually been looked at. If you find bugs, please file an issue.


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
  docsURLTemplate = (id) => `https://www.postgresql.org/docs/current/${id}.html`,
): { promise, cancel };```
```

* `cmd` (string) is the desired describe command, including the leading backslash, such as `\d` (don't forget you may need to escape the backslash in a literal string).
* `dbName` (string) is the name of the connected database.
* `runQuery` is an async function that takes a SQL query (string) and must return *unparsed* query results in the same format used by node-postgres when specifying `rowMode: 'array'`.
* `outputFn` is a function that receives output for display: this output will be either a string or a table object (see below).
* `echoHidden` (boolean) has the same effect as the `-E` argument to psql: if `true`, all SQL queries are output to `outputFn`, in addition to the final results.
* `sversion` (number) should be the same value as `SHOW server_version_num` executed on the server. It is used to determine what features the database supports. If it is not provided, the server is queried for it.
* `std_strings` (boolean) indicates the value of `standard_conforming_strings` in the database.
* `docsURLTemplate` (function) specifies how a docs page ID is transformed into a URL, for use with `\\h`. 

The function returns an object with two keys: `{ promise, cancel }`: 

* `promise` is a `Promise` that resolves when the command completes. 
* `cancel()` is a function you can call to abort the command.

The outputs of `describe()`, as passed to the `outputFn` argument, are a mix of plain strings and JS objects representing tables.

To format these outputs for display, two additional functions are exported:

* ```describeDataToString(item)```

This function passes though string items unchanged. When an object item is passed in, a formatted plain-text table is returned, identical to those produced by the psql CLI.

* ```describeDataToHtml(item)```

This function HTML-escapes string items, and formats object items as HTML tables (whose contents are HTML-escaped).


## Tests

The tests compare this software's output against `psql` for the commands in `test/tests.txt`. Output is expected to be character-for-character identical, except for differences in trailing space at the end of lines.

In case of failure, the tests halt and a `psql.txt` and `local.txt` are written, which you can then `diff`.

To make the tests work on your machine, you'll need to create a test database (see below) and update the DB connection strings in the `test` command in `package.json`.

To match output, psql must be compiled from Postgres commit eb36c6ac8478e664edebe8131ffa23c394e487cc.

### Database

Tests should be run against a database named `psqldescribe` containing the [Pagila](https://github.com/devrimgunduz/pagila) data set, with a few additions:

```bash
curl https://raw.githubusercontent.com/devrimgunduz/pagila/master/pagila-schema.sql | psql psqldescribe
curl https://raw.githubusercontent.com/devrimgunduz/pagila/master/pagila-data.sql | psql psqldescribe
psql psqldescribe < test/test-pagila-additions.sql
```
