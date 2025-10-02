CREATE TABLE playing_with_neon(id SERIAL PRIMARY KEY, name TEXT NOT NULL, value REAL);
INSERT INTO playing_with_neon(name, value)
  SELECT LEFT(md5(i::TEXT), 10), random() FROM generate_series(1, 10) s(i);

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
  OPTIONS (host 'localhost', port '5432', dbname 'psqldescribe');
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
ALTER DATABASE psqldescribe SET statement_timeout TO 60000;
CREATE USER myuser;
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

-- WITHOUT OVERLAPS in PG18+
CREATE EXTENSION btree_gist;
CREATE TABLE employees (
  emp_id INTEGER,
  emp_name VARCHAR(100) NOT NULL,
  department VARCHAR(50) NOT NULL,
  position VARCHAR(50) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  valid_period tstzrange NOT NULL DEFAULT tstzrange(now(), 'infinity', '[)'),
  PRIMARY KEY (emp_id, valid_period WITHOUT OVERLAPS)
);
