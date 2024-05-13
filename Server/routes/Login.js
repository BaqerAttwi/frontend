import express from 'express';
import multer from 'multer';
import mysql from 'mysql';
import axios from 'axios';


const router = express.Router();

// Create connection to MySQL database

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "socailweb"
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
});

// Middleware to parse request body
router.use(express.json());

// Endpoint to handle user login
router.post('/login', (req, res) => {
  const { emailOrUsername, password } = req.body;

  // SQL query to check if user exists
  const sql = `
    SELECT * 
    FROM Usersinfo 
    WHERE (username = ? OR email = ?) AND password = ?
  `;

  connection.query(sql, [emailOrUsername, emailOrUsername, password], (err, results) => {
    if (err) {
      console.error('Error querying database: ' + err.stack);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length > 0) {
      res.json({ success: true, user: results[0] });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  });
});
export default router;
