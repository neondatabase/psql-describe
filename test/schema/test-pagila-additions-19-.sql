-- Property graph reporting with \dG and \d
CREATE PROPERTY GRAPH pagila_graph
  VERTEX TABLES (
    actor
      KEY (actor_id)
      LABEL actor PROPERTIES (first_name, last_name),
    film
      KEY (film_id)
      LABEL film PROPERTIES (title, rating)
  )
  EDGE TABLES (
    film_actor
      KEY (actor_id, film_id)
      SOURCE KEY (actor_id) REFERENCES actor (actor_id)
      DESTINATION KEY (film_id) REFERENCES film (film_id)
      LABEL acted_in NO PROPERTIES
  );

COMMENT ON PROPERTY GRAPH pagila_graph IS
  'Actors connected to the films in which they appeared';

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
