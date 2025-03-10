const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my_api_db'
});

db.connect(err => {
    if (err) {
        console.error(' Database connection error:', err);
        return;
    }
    console.log(' Connected to MySQL database via XAMPP');
});

app.post('/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }

    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(query, [name, email], (err, result) => {
        if (err) {
            console.error(' Error inserting data:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.status(201).json({ id: result.insertId, name, email });
    });
});

app.get('/users/add', (req, res) => {
    const { name, email } = req.query; 

    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }

    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(query, [name, email], (err, result) => {
        if (err) {
            console.error(' Error inserting data:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.status(201).json({ id: result.insertId, name, email });
    });
});

app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('❌ Error fetching data:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
