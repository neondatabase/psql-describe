# psql-describe

psql's `\d` (describe) family of commands ported to JavaScript.

* From the Postgres master branch (17devel), we take `exec_command_d`, `exec_command_list` and `exec_command_sf_sv` from `command.c`, and all of `describe.c`, from `src/bin/psql`.
* We use plenty of RegExp search-and-replace to turn this C code into valid JS syntax.
* We implement some C library functions, such as `strlen` and `strchr`, and some Postgres support functions, such as `printTable` and `printQuery`, in JavaScript.
* We write tests to catch (and then fix) problems, mostly related to pointer arithmetic, pointer dereferencing, and pointer output parameters.

This approach means that many of the 8000+ lines of code in `describe.mjs` have not actually been looked at. If you find bugs, please file an issue.

## Usage

For now, please see `demo-src/demo.js` and `test/test.mjs` for examples.

## Tests

The tests compare this software's output against `psql` for the commands in `test/tests.txt`. Output is expected to be character-for-character identical, except for differences in trailing space at the end of lines.

In case of failure, the tests halt and a `psql.txt` and `local.txt` are written, which you can then `diff`.

To make the tests work on your machine, you'll need to create a test database (see below) and update the DB connection strings in the `test` command in `package.json`.

### Database

Tests should be run against the [Pagila](https://github.com/devrimgunduz/pagila) data set, with these additions:

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
