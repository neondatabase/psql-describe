-- WITHOUT OVERLAPS reporting
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

-- PG18 column metadata: identity, stored/virtual generation and compression
CREATE TABLE feature_columns (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  source_text TEXT COMPRESSION pglz,
  stored_length INTEGER
    GENERATED ALWAYS AS (char_length(source_text)) STORED,
  virtual_upper TEXT
    GENERATED ALWAYS AS (upper(source_text)) VIRTUAL
);

INSERT INTO feature_columns (source_text)
VALUES ('alpha'), ('bravo'), ('charlie');

-- PG18 WITHOUT OVERLAPS constraint reporting
CREATE TABLE temporal_table (
  entity_id INTEGER NOT NULL,
  valid_period DATERANGE NOT NULL,
  description TEXT,
  PRIMARY KEY (entity_id, valid_period WITHOUT OVERLAPS)
);

INSERT INTO temporal_table
VALUES
  (1, daterange('2025-01-01', '2025-07-01'), 'first half'),
  (1, daterange('2025-07-01', '2026-01-01'), 'second half');

-- PG18 publication metadata for generated columns
CREATE PUBLICATION generated_columns_publication
  FOR TABLE feature_columns
  WITH (publish_generated_columns = stored);
