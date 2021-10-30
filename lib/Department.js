// db query for departments
const db = require('../db/connection');
const consoleTable = require('console.table');
const prompts = require('./index');

// get all departments
class Department {
    constructor() {

    }

    allDepts() {
        const sql = `SELECT * FROM department`
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err)
            }
            console.table('Departments', rows)
        })
        prompts.startPrompt
    };

    addDept(dept) {
        const sql = `INSERT INTO department (name)
                    VALUES (?)`;
        const params = dept.name;
        db.query(sql, params, (err, rows) => {
            if (err) {
                console.log(err)
            }
            console.log(`${dept.name} has been added to departments.`)
        });
        prompts.startPrompt
    };
}


module.exports = new Department()

