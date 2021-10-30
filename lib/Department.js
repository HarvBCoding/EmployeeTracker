// db query for departments
const db = require('../db/connection');
const consoleTable = require('console.table');
const prompts = require('./lib/index');
const { startPrompt } = require('.');

// get all departments
class Department {
    constructor() {

    }

    allDepts() {
        const sql = `SELECT * FROM department`
        db.promise().query(sql)
            .then(([ rows]) => {
                console.table('Departments', rows)
                startPrompt()
            })
    };

    addDept(dept) {
        const sql = `INSERT INTO department (name)
                    VALUES (?)`;
        const params = dept.name;
        db.query(sql, params, (err, rows) => {
            if (err) {
                console.log(err)
            }
            console.log(`${dept.name} has been added to departments.`);
            startPrompt()
        });
    }
}


module.exports = new Department()

