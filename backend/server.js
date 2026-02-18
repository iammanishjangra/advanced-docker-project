const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
  host: process.env.DB_HOST || 'mysql',
  user: process.env.MYSQL_USER || 'user',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'miniproject'
};

let connection;

function handleDisconnect() {
  connection = mysql.createConnection(dbConfig);

  connection.connect(function(err) {
    if(err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    } else {
        console.log('Connected to database');
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            content TEXT NOT NULL
        )`;
        connection.query(createTableQuery, (err, results) => {
            if (err) {
                console.error('Error creating table:', err);
            } else {
                console.log('Table checked/created');
            }
        });
    }
  });

  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

app.post('/add', (req, res) => {
  const content = req.body.content;
  if (!content) {
    return res.status(400).send('Content is required');
  }
  const query = 'INSERT INTO messages (content) VALUES (?)';
  connection.query(query, [content], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Error saving data');
    }
    res.status(201).send('Data saved');
  });
});

app.get('/all', (req, res) => {
  const query = 'SELECT * FROM messages';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Error fetching data');
    }
    res.json(results);
  });
});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM messages WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      return res.status(500).send('Error deleting data');
    }
    res.send('Data deleted');
  });
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
