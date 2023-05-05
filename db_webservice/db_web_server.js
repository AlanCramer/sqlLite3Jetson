const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const secret = 'mysecretkey';

// Open the SQLite database
const db = new sqlite3.Database('path/to/database.db');

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Middleware to check JWT token and set req.user
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Define a route for getting sensor data
app.get('/api/sensors', authenticateToken, (req, res) => {
  // Query the database for sensor data
  db.all('SELECT * FROM sensors', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      // Return the data as JSON
      res.json(rows);
    }
  });
});

// Define a route for getting sensor type data
app.get('/api/sensor-types', authenticateToken, (req, res) => {
  // Query the database for sensor type data
  db.all('SELECT * FROM sensor_types', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      // Return the data as JSON
      res.json(rows);
    }
  });
});

// Define a route for getting readings data
app.get('/api/readings', authenticateToken, (req, res) => {
  // Query the database for readings data
  db.all('SELECT * FROM readings', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      // Return the data as JSON
      res.json(rows);
    }
  });
});

// Define a route for getting image data
app.get('/api/image-data', authenticateToken, (req, res) => {
  // Query the database for image data
  db.all('SELECT * FROM image_data', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      // Return the data as JSON
      res.json(rows);
    }
  });
});

// Define a route for getting motion event data
app.get('/api/motion-events', authenticateToken, (req, res) => {
  // Query the database for motion event data
  db.all('SELECT * FROM motion_events', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      // Return the data as JSON
      res.json(rows);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
