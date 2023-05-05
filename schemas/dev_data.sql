-- Insert some fake sensor types
INSERT INTO sensor_types (name) VALUES ('Motion');
INSERT INTO sensor_types (name) VALUES ('Camera');
INSERT INTO sensor_types (name) VALUES ('Thermal Camera');

-- Insert some fake sensors
INSERT INTO sensors (name, type_id, mac_address) VALUES ('Sensor 1', 1, '00:11:22:33:44:55');
INSERT INTO sensors (name, type_id, mac_address) VALUES ('Sensor 2', 2, 'AA:BB:CC:DD:EE:FF');
INSERT INTO sensors (name, type_id, mac_address) VALUES ('Sensor 3', 3, '11:22:33:44:55:66');

-- Insert some fake data types
INSERT INTO data_types (name, description, units) VALUES ('Temperature', 'Temperature reading', 'Celsius');
INSERT INTO data_types (name, description, units) VALUES ('Humidity', 'Humidity reading', 'Percent');
INSERT INTO data_types (name, description, units) VALUES ('Motion', 'Motion detection event', '');

-- Insert some fake readings for each sensor
INSERT INTO readings (sensor_id, timestamp, data_type_id, value) VALUES (1, 1618285787, 1, 23.5);
INSERT INTO readings (sensor_id, timestamp, data_type_id, value) VALUES (1, 1618285792, 1, 24.0);
INSERT INTO readings (sensor_id, timestamp, data_type_id, value) VALUES (1, 1618285797, 1, 23.8);
INSERT INTO readings (sensor_id, timestamp, data_type_id, value) VALUES (2, 1618285802, 2, 'image001.jpg');
INSERT INTO readings (sensor_id, timestamp, data_type_id, value) VALUES (2, 1618285807, 2, 'image002.jpg');
INSERT INTO readings (sensor_id, timestamp, data_type_id, value) VALUES (2, 1618285812, 2, 'image003.jpg');
INSERT INTO readings (sensor_id, timestamp, data_type_id, value) VALUES (3, 1618285817, 3, 1);
INSERT INTO readings (sensor_id, timestamp, data_type_id, value) VALUES (3, 1618285822, 3, 0);
INSERT INTO readings (sensor_id, timestamp, data_type_id, value) VALUES (3, 1618285827, 3, 1);
