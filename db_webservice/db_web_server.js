const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3001;
const secret = 'mysecretkey';

// Open the SQLite database
const db = new sqlite3.Database('dev.db');

// this ain't right, should be read from the detabase
// there is a table with the event types (called data_types)
const IMAGE_EVENT = 1;
const MOTION_EVENT = 2;


// Middleware to check JWT token and set req.user
function authenticateToken(req, res, next) {
    // Temporarily disable security
    req.user = { username: 'dummyUser' }; // Set a dummy user object
    next();
  
    // Uncomment the following lines when you want to enable security
    /*
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, secret, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
    */
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

// Define a route for getting sensor data
app.get('/api/data_types', authenticateToken, (req, res) => {
  // Query the database for sensor data
  db.all('SELECT * FROM data_types', (err, rows) => {
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
app.get('/api/motion-readings', authenticateToken, (req, res) => {

  console.log("got a motion-readings request");
  // Query the database for motion event data
  db.all('SELECT * FROM motion_data', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      // Return the data as JSON
      res.json(rows);
    }
  });
});

app.get('/api/people-detected', authenticateToken, (req, res) => {
    const query = `
      SELECT r.timestamp, i.peopleDetected
      FROM readings r
      JOIN image_data i ON r.data_id = i.id
      WHERE r.data_type_id = (SELECT id FROM data_types WHERE name = 'image_data')
      ORDER BY r.timestamp;
    `;
  
    db.all(query, (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        // Return the data as JSON
        res.json(rows);
      }
    });
  });


// Writing apis from sensors


app.post('/motion-reading', (req, res) => {
  const { sensorId, motion, time_read } = req.body;
  const MOTION_EVENT_ID = 2;

  console.log("got a motion-reading request");

  db.serialize(() => {
    db.run('PRAGMA foreign_keys = ON;');
    db.run('BEGIN TRANSACTION');

    // Step 1: Add to motion_data table
    let motionQuery = 'INSERT INTO motion_data(motion_detected) VALUES (?)';
    db.run(motionQuery, [motion], function (err) {
      if (err) {
        console.log(" error in the motion query");
        return res.status(500).json({ error: err.message });
      }
      console.log(` added motion query, row: ${this.lastID}`);

      let motionId = this.lastID;

      // Step 2: Add to readings table
      let readingsData = [null, sensorId, time_read, Date.now(), MOTION_EVENT_ID, motionId];
      let readingsQuery = 'INSERT INTO readings VALUES (?, ?, ?, ?, ?, ?)';
      db.run(readingsQuery, readingsData, (err) => {
        if (err) {
          db.run('ROLLBACK');
          console.log(" error with reading, rolling back");
          return res.status(500).json({ error: err.message });
        }

        db.run('COMMIT');
        console.log(" added motion event");
        return res.status(200).json({ message: 'Data added' });
      });
    });
  });
});



// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on network port ${port}`);
});
