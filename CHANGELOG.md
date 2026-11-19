## 0.2.0 (2026-11-19)

The C is now translated to JS automatically, from Postgres `REL_19_0`, by XSLT stylesheets (see [xslt/README.md](xslt/README.md)), replacing the RegExp-assisted, hand-fixed port of earlier versions. The output is tested against psql's on Postgres 14 to 19.

**Breaking change:** the optional arguments to `describe()` are now an options object, and some are renamed. So this:

```js
describe(cmd, dbName, runQuery, outputFn, echoHidden, sversion, std_strings, docsURLTemplate)
```

becomes:

```js
describe(cmd, dbName, runQuery, outputFn, { echoHidden, serverVersion, standardConformingStrings, docsURLTemplate })
```

Other changes:

- The promise now resolves to `{ success, remainder, commands }` (or `null` if cancelled): whether every command succeeded, what wasn't run (e.g. SQL after the backslash commands, which psql would send to the server), and how many commands ran. The resolved value was previously `true`, but undocumented.
- A new `multipleCommands` option runs every backslash command at the start of `cmd`, as psql does with the lines it reads: e.g. `\dt film \dv`, `\dt \\ SELECT 1`, or `\dt` and `\dv` on lines of their own, followed by SQL. The default, `false`, runs only the first, as `psql -c` does.
- `cancel()` now resolves the promise to `null` at once, without waiting for a query in flight.
- The `\h` SQL help is a separate file, `sql-help.js`, loaded the first time `\h` runs: so it's left out of the main bundle (by Vite, webpack, etc.), which is about a third smaller. If it can't be loaded, `\h` gives an error.
- The `x` (expanded output) option, added to most `\d` commands in Postgres 18, is supported.
- `\?` help is now generated from psql's `help.c` (keeping only the commands this library supports), and `\h` help from the Postgres SGML docs (rather than from psql's generated `sql_help.c`).
- Argument parsing follows psql's more closely: e.g. octal and hex escapes in single-quoted arguments are bytes, read as UTF-8, and `\0` ends an argument.
- Type declarations cover the new options and result.

## 0.1.7 (2025-10-02)

Updated for Postgres 18 (`REL_18_0`).

## 0.1.6 (2024-11-05)

Updated for Postgres 17 (`REL_17_0`).
