-- Insert some fake sensor types
INSERT INTO sensor_types (name) VALUES ('Motion');
INSERT INTO sensor_types (name) VALUES ('Camera');
INSERT INTO sensor_types (name) VALUES ('Thermal Camera');

-- Insert some fake sensors
INSERT INTO sensors (name, type_id, mac_address) VALUES ('Sensor 1', 1, '00:11:22:33:44:55');
INSERT INTO sensors (name, type_id, mac_address) VALUES ('Sensor 2', 2, 'AA:BB:CC:DD:EE:FF');
INSERT INTO sensors (name, type_id, mac_address) VALUES ('Sensor 3', 3, '11:22:33:44:55:66');
INSERT INTO sensors (name, type_id, mac_address) VALUES ('Sensor 4', 1, '22:33:44:55:66:77');
INSERT INTO sensors (name, type_id, mac_address) VALUES ('Sensor 5', 2, 'BB:CC:DD:EE:FF:00');
INSERT INTO sensors (name, type_id, mac_address) VALUES ('Sensor 6', 3, '33:44:55:66:77:88');

-- Insert some fake data types
INSERT INTO data_types (name, description, units) VALUES ('Temperature', 'Temperature reading', 'Celsius');
INSERT INTO data_types (name, description, units) VALUES ('Humidity', 'Humidity reading', 'Percent');
INSERT INTO data_types (name, description, units) VALUES ('Motion', 'Motion detection event', '');
INSERT INTO data_types (name, description, units) VALUES ('Image', 'Image file', '');
INSERT INTO data_types (name, description, units) VALUES ('Temperature 2', 'Second temperature reading', 'Celsius');

-- Insert some fake readings for each sensor
INSERT INTO readings (sensor_id, timestamp, data_type_id, data_id) VALUES (1, 1618285787, 1, NULL);
INSERT INTO readings (sensor_id, timestamp, data_type_id, data_id) VALUES (1, 1618285792, 1, NULL);
INSERT INTO readings (sensor_id, timestamp, data_type_id, data_id) VALUES (1, 1618285797, 1, NULL);
INSERT INTO readings (sensor_id, timestamp, data_type_id, data_id) VALUES (2, 1618285802, 2, NULL);
INSERT INTO readings (sensor_id, timestamp, data_type_id, data_id) VALUES (2, 1618285807, 2, NULL);
INSERT INTO readings (sensor_id, timestamp, data_type_id, data_id) VALUES (2, 1618285812, 2, NULL);
INSERT INTO readings (sensor_id, timestamp, data_type_id, data_id) VALUES (3, 1618285817, 3, NULL);
INSERT INTO readings (sensor_id, timestamp, data_type_id, data_id) VALUES (3, 1618285822, 3, NULL);
INSERT INTO readings (sensor_id, timestamp, data_type_id, data_id) VALUES (3, 1618285827, 3, NULL);
INSERT INTO readings (sensor_id, timestamp, data_type_id, data_id) VALUES (4, 1618285832, 1, NULL);
INSERT INTO readings (sensor_id, timestamp, data_type_id, data_id) VALUES (4, 1618285837, 1, NULL);

