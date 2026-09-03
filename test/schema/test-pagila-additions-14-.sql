CREATE TABLE playing_with_neon(id SERIAL PRIMARY KEY, name TEXT NOT NULL, value REAL);
INSERT INTO playing_with_neon(name, value)
  SELECT LEFT(md5(i::TEXT), 10), random() FROM generate_series(1, 10) s(i);

-- extensions with \dx
CREATE EXTENSION citext;

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
CREATE USER MAPPING FOR CURRENT_USER SERVER foreign_server OPTIONS (user 'bob', password 'secret');

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

-- custom types, functions, operators, casts and collations: the official
-- postgres image bundles no rich extension (e.g. PostGIS), so we add our own
-- to exercise \dT, \df, \do, \dC and \dO against user-defined objects

-- composite and range types with \dT
CREATE TYPE dimensions AS (width numeric, height numeric, depth numeric);
CREATE TYPE floatrange AS RANGE (subtype = float8);

-- functions with varied argument styles for \df
CREATE FUNCTION box_volume(dims dimensions) RETURNS numeric
  LANGUAGE sql IMMUTABLE AS $$ SELECT dims.width * dims.height * dims.depth $$;
CREATE FUNCTION sum_all(VARIADIC vals numeric[]) RETURNS numeric
  LANGUAGE sql IMMUTABLE AS $$ SELECT coalesce(sum(v), 0) FROM unnest(vals) AS v $$;
CREATE FUNCTION greet(who text DEFAULT 'world') RETURNS text
  LANGUAGE sql IMMUTABLE AS $$ SELECT 'hello ' || who $$;

-- a user-defined operator with \do
CREATE FUNCTION dimensions_eq(dimensions, dimensions) RETURNS boolean
  LANGUAGE sql IMMUTABLE AS $$ SELECT box_volume($1) = box_volume($2) $$;
CREATE OPERATOR === (
  LEFTARG = dimensions, RIGHTARG = dimensions,
  FUNCTION = dimensions_eq, COMMUTATOR = ===
);

-- a user-defined cast with \dC
CREATE FUNCTION dimensions_as_text(dimensions) RETURNS text
  LANGUAGE sql IMMUTABLE AS
  $$ SELECT format('%s x %s x %s', $1.width, $1.height, $1.depth) $$;
CREATE CAST (dimensions AS text)
  WITH FUNCTION dimensions_as_text(dimensions) AS ASSIGNMENT;

-- a user-defined collation with \dO
CREATE COLLATION traditional FROM "C";

-- RLS policies and trigger/rule firing states with \d+ and \dp
CREATE ROLE app_reader;
CREATE TABLE secured_table (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  owner_name name NOT NULL DEFAULT current_user,
  public_value text,
  private_value text
);
GRANT SELECT, INSERT, UPDATE ON secured_table TO app_reader;
ALTER TABLE secured_table ENABLE ROW LEVEL SECURITY;
ALTER TABLE secured_table FORCE ROW LEVEL SECURITY;
CREATE POLICY secured_select ON secured_table
  FOR SELECT TO app_reader
  USING (owner_name = current_user);
CREATE POLICY secured_update ON secured_table
  AS RESTRICTIVE FOR UPDATE TO app_reader
  USING (owner_name = current_user)
  WITH CHECK (owner_name = current_user);

CREATE FUNCTION secured_trigger() RETURNS trigger
  LANGUAGE plpgsql AS $$
  BEGIN
    RETURN NEW;
  END;
  $$;
CREATE TRIGGER secured_enabled_trigger
  BEFORE UPDATE ON secured_table
  FOR EACH ROW EXECUTE FUNCTION secured_trigger();
CREATE TRIGGER secured_disabled_trigger
  BEFORE UPDATE ON secured_table
  FOR EACH ROW EXECUTE FUNCTION secured_trigger();
CREATE TRIGGER secured_replica_trigger
  BEFORE UPDATE ON secured_table
  FOR EACH ROW EXECUTE FUNCTION secured_trigger();
CREATE TRIGGER secured_always_trigger
  BEFORE UPDATE ON secured_table
  FOR EACH ROW EXECUTE FUNCTION secured_trigger();
ALTER TABLE secured_table DISABLE TRIGGER secured_disabled_trigger;
ALTER TABLE secured_table ENABLE REPLICA TRIGGER secured_replica_trigger;
ALTER TABLE secured_table ENABLE ALWAYS TRIGGER secured_always_trigger;

CREATE TABLE security_audit (
  source text NOT NULL,
  secured_id bigint
);
CREATE RULE secured_disabled_rule AS
  ON UPDATE TO secured_table DO ALSO
  INSERT INTO security_audit VALUES ('disabled rule', NEW.id);
CREATE RULE secured_replica_rule AS
  ON UPDATE TO secured_table DO ALSO
  INSERT INTO security_audit VALUES ('replica rule', NEW.id);
CREATE RULE secured_always_rule AS
  ON UPDATE TO secured_table DO ALSO
  INSERT INTO security_audit VALUES ('always rule', NEW.id);
ALTER TABLE secured_table DISABLE RULE secured_disabled_rule;
ALTER TABLE secured_table ENABLE REPLICA RULE secured_replica_rule;
ALTER TABLE secured_table ENABLE ALWAYS RULE secured_always_rule;

-- Index and constraint detail states with \d+ and \di+
CREATE TABLE indexed_table (
  id bigint PRIMARY KEY,
  email text NOT NULL,
  category text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  active_period daterange NOT NULL,
  payload jsonb,
  CONSTRAINT feature_deferrable_unique
    UNIQUE (email) DEFERRABLE INITIALLY DEFERRED,
  CONSTRAINT feature_exclusion
    EXCLUDE USING gist (active_period WITH &&) DEFERRABLE
);
INSERT INTO indexed_table
VALUES
  (1, 'one@example.com', 'first', true, daterange('2025-01-01', '2025-02-01'), '{}'),
  (2, 'two@example.com', 'second', false, daterange('2025-02-01', '2025-03-01'), '{}');
CREATE INDEX feature_partial_idx
  ON indexed_table (category) WHERE active;
CREATE INDEX feature_expression_idx
  ON indexed_table (lower(email));
CREATE INDEX feature_clustered_idx
  ON indexed_table (category, id);
CLUSTER indexed_table USING feature_clustered_idx;
CREATE UNIQUE INDEX feature_replica_identity_idx
  ON indexed_table (id, email);
ALTER TABLE indexed_table
  REPLICA IDENTITY USING INDEX feature_replica_identity_idx;

-- Partition parent, child, partitioned-index and zero-partition details
CREATE TABLE empty_partitioned (
  id bigint NOT NULL,
  recorded_on date NOT NULL
) PARTITION BY RANGE (recorded_on);

