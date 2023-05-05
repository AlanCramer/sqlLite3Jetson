CREATE TABLE sensors (
  id INTEGER PRIMARY KEY,
  name TEXT,
  type_id INTEGER,
  mac_address TEXT UNIQUE,
  FOREIGN KEY (type_id) REFERENCES sensor_types(id)
);

CREATE TABLE sensor_types (
  id INTEGER PRIMARY KEY,
  name TEXT
);


CREATE TABLE data_types (
  id INTEGER PRIMARY KEY,
  name TEXT,
  description TEXT,
  units TEXT
);

CREATE TABLE readings (
  id INTEGER PRIMARY KEY,
  sensor_id INTEGER,
  timestamp INTEGER,
  data_type TEXT,   -- the name of the table with the data
  data_id INTEGER,  -- the row of the table
  FOREIGN KEY (sensor_id) REFERENCES sensors(id)
);

CREATE TABLE image_data (
  id INTEGER PRIMARY KEY,
  filename TEXT,
  timestamp INTEGER,
  FOREIGN KEY (id) REFERENCES readings(data_id)
);

CREATE TABLE motion_events (
  id INTEGER PRIMARY KEY,
  motion_detected INTEGER,  -- I'm thinking, "motion changed"
  timestamp INTEGER,
  FOREIGN KEY (id) REFERENCES readings(data_id)
);
