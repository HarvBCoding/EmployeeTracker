const db = require('../db/connection');
const consoleTable = require('console.table');
const prompts = require('./index');

class Employee {
    constructor() {

    }

    allEmployees() {
        const sql = `SELECT * FROM employee`
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err)
            };
            console.table('Employees', rows);
        });
    }
}

module.exports = new Employee()