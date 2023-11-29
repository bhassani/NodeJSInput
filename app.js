//npm install express mysql body-parser
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL database connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Serve HTML form with a textbox
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
  const value = req.body.textboxValue;

  // Insert the value into the database
  const query = 'INSERT INTO your_table (column_name) VALUES (?)';
  db.query(query, [value], (err, result) => {
    if (err) {
      console.error('Error inserting into the database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log('Value inserted into the database');
    res.send('Value inserted into the database');
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
