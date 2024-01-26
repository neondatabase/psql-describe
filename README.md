# psql-describe

psql's `\d` (describe) family of commands ported to JavaScript.

* From the Postgres master branch (17devel), we take `exec_command_d`, `exec_command_list` and `exec_command_sf_sv` from `command.c`, and all of `describe.c`, from `src/bin/psql`.
* We use plenty of RegExp search-and-replace to turn this C code into valid JS syntax.
* We implement some C library functions, such as `strlen` and `strchr`, and some Postgres support functions, such as `printTable` and `printQuery`, in JavaScript.
* We write tests to catch (and then fix) problems, mostly related to pointer arithmetic, pointer dereferencing, and pointer output parameters.

This approach means that many of the 8000+ lines of code in `describe.mjs` have not actually been looked at. If you find bugs, please file an issue.


## Usage

The key export is the `describe()` function:

```describe(cmd, dbName, runQuery, outputFn, echoHidden = false, sversion = null, std_strings = true): { promise, cancel };```

* `cmd` (string) is the desired describe command, including the leading backslash, such as `\d` (don't forget you may need to escape the backslash in a literal string).
* `dbName` (string) is the name of the connected database.
* `runQuery` is an async function that takes a SQL query (string) and must return *unparsed* query results in the same format used by node-postgres when specifying `rowMode: 'array'`.
* `outputFn` is a function that receives output for display: this will be either a string or a table object (see below).
* `echoHidden` (boolean) has the same effect as the `-E` argument to psql: if `true`, all SQL queries are output to `outputFn`, in addition to the final results.
* `sversion` (number) should be the same value as `SHOW server_version_num` executed on the server. It is used to determine what features the database supports. If it is not provided, the server is queried for it.
* `std_strings` (boolean) indicates the value of `standard_conforming_strings` in the database.

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


### Database

Tests should be run against the [Pagila](https://github.com/devrimgunduz/pagila) data set, with the following additions:

```
-- extensions with \dx
CREATE EXTENSION citext;
CREATE EXTENSION postgis;

-- descriptions with \dd
COMMENT ON OPERATOR CLASS char_bloom_ops USING brin IS 'example op class comment';
COMMENT ON TRIGGER last_updated ON staff IS 'example trigger comment';

-- default privileges with \ddp
CREATE SCHEMA myschema;
ALTER DEFAULT PRIVILEGES IN SCHEMA myschema GRANT SELECT ON TABLES TO PUBLIC;
ALTER DEFAULT PRIVILEGES IN SCHEMA myschema GRANT INSERT ON TABLES TO PUBLIC;

-- foreign data with \dE, \det
-- echo "1,Bob,1987-12-23T12:01:02.123\n2,Anne,1987-12-23T12:01:02.124" > datadir/test.csv
CREATE EXTENSION file_fdw;
CREATE SERVER csvfile FOREIGN DATA WRAPPER file_fdw;
CREATE FOREIGN TABLE birthdays (
    id int,
    name text,
    birthdate timestamptz
  ) 
  SERVER csvfile
  OPTIONS ( filename 'test.csv', format 'csv' );

-- foreign data with \deu
CREATE EXTENSION postgres_fdw;
CREATE SERVER foreign_server
  FOREIGN DATA WRAPPER postgres_fdw
  OPTIONS (host 'localhost', port '5435', dbname 'main');
CREATE USER MAPPING FOR george SERVER foreign_server OPTIONS (user 'bob', password 'secret');

-- procedures with \dfp
CREATE PROCEDURE myproc(a integer, b integer)
  LANGUAGE SQL AS $$
    SELECT a + b;  -- NB. this is silly because procs don't return anything
  $$;

-- large objects with \dl
SELECT lo_create(0);
SELECT lo_create(0);
SELECT lo_create(0);

-- partitioned indices with \dPi
CREATE INDEX payments_customer_id_idx ON payment(customer_id);
CREATE INDEX payments_payment_id_idx ON payment(payment_id);

-- role or DB settings with \drds
ALTER DATABASE main SET statement_timeout TO 60000;
ALTER ROLE myuser SET statement_timeout TO 30000;

-- publications with \dRp
CREATE PUBLICATION mypub FOR TABLE actor, film;
CREATE PUBLICATION myotherpub FOR TABLE city, customer;

-- extended stats with \dX
CREATE STATISTICS estats1 (ndistinct) ON release_year, language_id FROM film;
CREATE STATISTICS estats2 (ndistinct) ON release_year, rating FROM film;

-- event triggers with \dy
CREATE OR REPLACE FUNCTION do_nothing_on_command() RETURNS event_trigger
  LANGUAGE plpgsql AS $$
  BEGIN
    -- do nothing
  END;
  $$;
CREATE EVENT TRIGGER do_nothing_ddl ON ddl_command_start EXECUTE FUNCTION do_nothing_on_command();
```
