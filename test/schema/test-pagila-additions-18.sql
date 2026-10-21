-- The PostgreSQL 18 matrix entry uses imresamu/postgis:18-3.6.
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE spatial_landmarks (
  landmark_id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  location geometry(Point, 4326) NOT NULL,
  service_area geometry(Polygon, 4326)
);

CREATE INDEX spatial_landmarks_location_idx
  ON spatial_landmarks USING gist (location);

INSERT INTO spatial_landmarks (name, location, service_area)
VALUES (
  'Greenwich',
  ST_SetSRID(ST_MakePoint(0, 51.4779), 4326),
  ST_GeomFromText(
    'POLYGON((-0.01 51.47, 0.01 51.47, 0.01 51.49, -0.01 51.49, -0.01 51.47))',
    4326
  )
);
