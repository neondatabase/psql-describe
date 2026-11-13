# psql-describe

psql's `\d` (describe) family of commands ported to JavaScript.

* From Postgres `REL_19_RC2`, we translate psql's C to JS automatically: its backslash-command handling, and everything that the describe commands, `\sf`, `\sv`, `\lo_list`, `\z`, `\?` and `\h` need from `command.c`, `describe.c`, `help.c`, `print.c` and `string_utils.c`.
* The translation is done by XSLT stylesheets, working on tree-sitter's parse of the C, as XML. They insert the translated C into a hand-written JS runtime, which provides the C library functions that psql uses, such as `strchr` and `PQexec`, and the table output.
* We generate the `\h` SQL help from the Postgres SGML doc files (rather like how `create_help.pl` generates `sql_help.c` for `psql`).
* We test the output against psql's, on Postgres 14 to 19.

For details of how the translation works, see [xslt/README.md](xslt/README.md). If you find a bug, please file an issue.

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
* `outputFn` is a function that receives output for display: either a string or a table object (see below).
* `echoHidden` (boolean) has the same effect as the `-E` argument to psql: if `true`, all SQL queries are output to `outputFn`, in addition to the final results.
* `sversion` (number) should be the same value as `SHOW server_version_num` executed on the server. It is used to determine what features the database supports. If it is not provided, the server is queried for it.
* `std_strings` (boolean) indicates the value of `standard_conforming_strings` in the database.
* `docsURLTemplate` (function) specifies how a docs page ID is transformed into a URL, for use with `\h`. 

The function returns an object with two keys: `{ promise, cancel }`: 

* `promise` is a `Promise` that resolves when the command completes. 
* `cancel()` is a function you can call to abort the command.

The outputs of `describe()`, as passed to the `outputFn` argument, are a mix of plain strings and JS objects representing tables.

To format these outputs for display, three additional functions are exported:

* ```describeDataToString(item)```

  Passes through string items unchanged. When an object item is passed in, a formatted plain-text table is returned, identical to those produced by the psql CLI. If `item.opt.expanded` is truthy then the table will be in expanded form.

* ```describeDataToHtml(item)```

  HTML-escapes string items, and formats object items as HTML tables (whose contents are HTML-escaped). If `item.opt.expanded` is truthy then the table will be in expanded form.

* ```htmlEscape(str, convertWhitespace)```
  
  Returns its argument HTML-escaped. If `convertWhitespace` is truthy, spaces are replaced with `&nbsp;` and newlines with `<br />`.


## Limitations

Text table formatting matches psql default formatting options: `format aligned`, `border 1`, `tuples_only off`, and so on. Other styles are not supported.

The `x` expanded output option (added to most commands in Postgres 18, formerly unsupported) _is_ now supported.


## Building

The repo has three build outputs, all committed:

* `generated/` holds the translation: `describe.mjs`, which is the runtime with the translated C filled in, and `sql-help.generated.mjs`. You make these from a Postgres source tree, with `npm run translate`. That needs Python, for the C preprocessor [pcpp](https://github.com/ned14/pcpp):

  ```bash
  python3 -m venv .venv
  .venv/bin/pip install -r xslt/requirements.txt
  source .venv/bin/activate

  npm run translate
  ```

  This runs two steps, which you can also run separately. `npm run parse` reads the Postgres source tree (`../postgres` by default, or e.g. `npm run parse -- path/to/postgres`), and writes the parsed and typed C to the .gitignored `build` directory, plus the SQL help. Then `npm run transform` translates the C into the runtime. When you're working on the runtime or the stylesheets, only the second step needs rerunning. See [xslt/README.md](xslt/README.md) for the details.

* `index.js` is the published bundle of `generated/describe.mjs`, made with `npm run build` (which runs `esbuild`). The tests run this step themselves.

* `demo/demo.js` is the demo's bundle, made with `npm run bundleDemo`.


### Building psql on a Mac

The tests use Docker or Podman to run Postgres and psql. But to compare against a local psql built from the same Postgres source tree as this library, on a Mac:

```bash
cd ../postgres
brew install icu4c pkgconfig

PATH="/opt/homebrew/opt/icu4c/bin:/opt/homebrew/opt/icu4c/sbin:$PATH" \
LDFLAGS="-L/opt/homebrew/opt/icu4c/lib" \
CPPFLAGS="-I/opt/homebrew/opt/icu4c/include" \
PKG_CONFIG_PATH="/opt/homebrew/opt/icu4c/lib/pkgconfig" \
./configure

cd src/bin/psql
MACOSX_DEPLOYMENT_TARGET="$(sw_vers -productVersion)" make
```


## Tests

The database-dependent tests compare this software's output against the PostgreSQL 19 `psql` client for the commands in `test/commands/tests-*.txt`. Output should be character-for-character identical, except for differences in trailing whitespace.

The same client is tested against the latest official PostgreSQL 14, 15, 16, and 17 container images, `imresamu/postgis:18-3.6` for PostgreSQL 18, and the official PostgreSQL 19rc2 image. This exercises all server-version branches and adds coverage of PostGIS objects.

In case of failure, the tests halt and a `psql.txt` and `local.txt` are written, which you can then `diff`.

The `\h` SQL help tests are compared against the PostgreSQL 19 `psql` client once, rather than being repeated for every server version. The JavaScript implementation does not query the database for these commands; the reference client only needs a connection so that `psql` can start.

The full test command automatically uses Podman if it is available, otherwise Docker:

```bash
npm test
```

The matrix pulls current images before running. You can select a runtime or a subset of versions, or use already-cached images:

```bash
npm run test:matrix -- --runtime docker
npm run test:matrix -- --versions 18,19 --no-pull
```

The matrix downloads Pagila on first use and caches it in the .gitignored `test/cache` directory. It creates disposable containers and a private container network, loads the fixtures, and removes the containers and network when it finishes.

Version suffixes on command and fixture files select the PostgreSQL versions to which they apply: `-18` means exactly version 18, `-15-16` means versions 15 through 16 inclusive, and `-18-` means version 18 and later.

## License

This package is released under the [Postgres license](LICENSE).
