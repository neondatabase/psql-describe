-- PG19 publication forms and table/sequence membership reporting
CREATE PUBLICATION filtered_columns_publication
  FOR TABLE actor (actor_id, first_name)
  WHERE (actor_id < 100);

CREATE PUBLICATION schema_publication
  FOR TABLES IN SCHEMA myschema;

CREATE PUBLICATION all_tables_except_publication
  FOR ALL TABLES EXCEPT (TABLE actor);

CREATE PUBLICATION all_sequences_publication
  FOR ALL SEQUENCES;

-- A disconnected subscription still populates all \dRs metadata without
-- requiring another PostgreSQL server or creating a replication slot.
CREATE SUBSCRIPTION pagila_subscription
  SERVER foreign_server
  PUBLICATION filtered_columns_publication
  WITH (
    connect = false,
    slot_name = NONE,
    retain_dead_tuples = true,
    max_retention_duration = 1000,
    wal_receiver_timeout = '80s'
  );

COMMENT ON SUBSCRIPTION pagila_subscription IS
  'Disconnected subscription used for describe-command tests';

-- Extended statistics kinds, expressions, target and PG19 verbose description
CREATE STATISTICS audit_stats_all (ndistinct, dependencies, mcv)
  ON release_year, language_id, rating
  FROM film;

CREATE STATISTICS audit_stats_expression
  ON (lower(title)), rating
  FROM film;

ALTER STATISTICS audit_stats_expression SET STATISTICS 500;
COMMENT ON STATISTICS audit_stats_all IS
  'Extended statistics covering all supported kinds';
COMMENT ON STATISTICS audit_stats_expression IS
  'Expression statistics with a non-default target';

ANALYZE film;
