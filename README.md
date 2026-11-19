# psql-describe

psql's `\d` (describe) family of commands ported to JavaScript.

* From Postgres `REL_19_0`, we translate psql's C to JS automatically: its backslash-command handling and everything that the `\d` describe commands and `\sf`, `\sv`, `\lo_list`, `\z`, `\?` and `\h` need from `command.c`, `describe.c`, `help.c`, `print.c`, `string_utils.c` and `common.c`.
* The translation is done by XSLT stylesheets, working on tree-sitter's parse of the C serialized to XML. These insert the translated C into a hand-written JS runtime that provides the C library functions that psql needs, such as `strchr` and `PQexec`, and the table output.
* We generate the `\h` SQL help from the Postgres SGML doc files (rather like how `create_help.pl` generates `sql_help.c` for `psql`).
* We test the output against psql's on Postgres 14 to 19.

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
  {
    echoHidden = false,
    serverVersion = null,
    standardConformingStrings = true,
    docsURLTemplate = (id) => `https://www.postgresql.org/docs/19/${id}.html`,
    multipleCommands = false,
  } = {},
): { promise, cancel };
```

* `cmd` (string) is the desired describe command, including the leading backslash, such as `\d` (don't forget you may need to escape the backslash in a literal string).
* `dbName` (string) is the name of the connected database.
* `runQuery` is an async function that takes a SQL query (string) and must return *unparsed* query results in the same format used by node-postgres when specifying `rowMode: 'array'`.
* `outputFn` is a function that receives output for display: either a string or a table object (see below).

The last argument, which is optional, is an object of options, any of which may be left out (anything else, or an unknown option, throws a `TypeError`):

* `echoHidden` (boolean) has the same effect as the `-E` argument to psql: if `true`, all SQL queries are output to `outputFn`, in addition to the final results.
* `serverVersion` (number) should be the same value as `SHOW server_version_num` executed on the server. It is used to determine what features the database supports. If it is not provided, the server is queried for it.
* `standardConformingStrings` (boolean) indicates the value of `standard_conforming_strings` in the database.
* `docsURLTemplate` (function) specifies how a docs page ID is transformed into a URL, for use with `\h`. 
* `multipleCommands` (boolean) says whether to run every backslash command at the start of `cmd`, as psql does with the lines it reads (interactively, or from a file): e.g. `\dt film \dv` runs `\dt film` and then `\dv` (and so does `\dt film \\ \dv`). A line ends the commands on it, and the commands go on while the next line starts with a backslash: so `\dt\n\dv\nSELECT 1;` runs `\dt` and then `\dv`, and leaves `SELECT 1;`. If it's `false`, the default, only the first command runs, as with `psql -c` (which treats all of `cmd` as one line). Either way, anything left over is returned as `remainder` (see below).

The function returns an object with two keys: `{ promise, cancel }`: 

* `promise` is a `Promise` that resolves when the command completes, to an object `{ success, remainder, commands }`, or to `null` if it was cancelled:
  * `success` (boolean) is `false` if any command failed (as when `psql -c` exits with an error, e.g. for `\dz`, an invalid command), or a query failed (e.g. `runQuery` rejected), and otherwise `true`.
  * `remainder` (string) is what wasn't run, from its first non-whitespace character, or `''` if that's nothing. If `multipleCommands` is `true`, that's anything after the backslash commands, which psql would send as SQL: e.g. `\dt \\ SELECT 1;` runs `\dt`, and leaves `SELECT 1;`. So you can pass any input to `describe()`, and run the `remainder` as SQL. (After an error, the rest of that line is ignored, as in psql, but any commands on the lines after it still run.)
  * `commands` (number) is how many backslash commands ran, including any that failed: e.g. `0` for `SELECT 1`, which leaves just the `remainder`.
* `cancel()` is a function you can call to abort the command: `promise` then resolves to `null` at once, without waiting for any query in progress to finish, and no more output or queries follow.

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

In a single-quoted argument, octal and hex escapes are bytes, as in psql, not characters, as in JS. A run of them is read as UTF-8: so `\dt 'caf\303\251'` and `\dt 'caf\xc3\xa9'` both look for `café`, but `\dt 'caf\351'` doesn't (`\351` alone isn't valid UTF-8, and becomes U+FFFD, where psql would send the byte, and get an error back). And `\0` ends the argument, as it ends a C string: `\dt 'a\0b'` looks for `a`.


## Building

The repo has three build outputs, all committed:

* `generated/` holds the translation: `describe.mjs`, which is the runtime with the translated C filled in, and `sql-help.generated.mjs`. You make these with `npm run translate`. That needs Git and Perl, and Python for the C preprocessor [pcpp](https://github.com/ned14/pcpp):

  ```bash
  python3 -m venv .venv
  .venv/bin/pip install -r xslt/requirements.txt
  source .venv/bin/activate

  npm run translate
  ```

  This runs two steps, which you can also run separately. `npm run parse` reads the Postgres source, and writes the parsed and typed C to the .gitignored `build` directory, plus the SQL help. By default, the source is the version pinned in `xslt/fetch-postgres.sh`, which it fetches into `build/postgres` (once, as a sparse clone of about 8 MB), but you can give it another tree, e.g. `npm run parse -- ../postgres`. Then `npm run transform` parses the runtime, and translates the C into it. When you're working on the `c-to-js` stylesheets or the runtime, only the second step needs rerunning. See [xslt/README.md](xslt/README.md) for the details.

* `index.js` and `sql-help.js` are the published bundle of `generated/describe.mjs`, made with `npm run build` (which runs `esbuild`). The tests run this step themselves. The SQL help is a third of the library's size, so `index.js` loads `sql-help.js` with `import()` only when `\h` is first used, and a bundler such as Vite or webpack makes it a separate chunk. (If it can't be loaded, e.g. because the network is down, `\h` gives an error, and `success` is `false`.)

* `demo/demo.js` is the demo's bundle, made with `npm run bundle-demo`.

`npm run end-to-end` makes all of these from scratch (fetching Postgres if need be), and then runs all the tests. CI runs `npm run ci`, which is the same, except that before testing it checks that the outputs it made are what's committed: so run `end-to-end` and commit what it changes along with your other changes.


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

The database-dependent tests compare this software's output against the PostgreSQL 19 `psql` client for the commands in `test/commands/tests-*.txt`. Output should be character-for-character identical, except for differences in trailing whitespace. And each command must fail (`success: false`) exactly when psql's does: psql runs with `ON_ERROR_STOP`, so a failed command ends its session (which the tests then restart).

The same client is tested against the latest official PostgreSQL 14, 15, 16, 17 and 19 container images, and `imresamu/postgis:18-3.6` for PostgreSQL 18 with PostGIS (because the official PostGIS image is not multi-arch). This exercises all server-version branches and adds coverage of PostGIS objects.

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

## Releasing

1. Bump the version in `package.json` and `package-lock.json` (e.g. `npm version --no-git-tag-version minor`).
2. Make sure `CHANGELOG.md` has a heading for the new version, with the release date (e.g. `## 0.2.0 (2026-11-19)`).
3. Merge to `main`, and wait for CI to pass.

Then, from a clean `main` matching `origin/main`, run `npm run tag-release`. This checks that the version isn't yet on npm, that the CHANGELOG has a dated heading for it, and that the Test workflow passed on `main` for the current commit (which means the committed build output is up to date). Then it creates and pushes an annotated `vX.Y.Z` tag.

Publish using that `vX.Y.Z` tag.

## License

This package is released under the [Postgres license](LICENSE).
