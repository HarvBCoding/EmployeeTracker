const mysql = require('mysql2');

// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'MischiefManaged',
        database: 'employees_db'
    },
    console.log('Connected to employee database.')
);

module.exports = db;