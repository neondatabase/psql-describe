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
