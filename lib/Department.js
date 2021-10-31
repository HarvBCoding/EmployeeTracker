// db query for departments
const db = require('../db/connection');
const consoleTable = require('console.table');

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
    };

    addDept(dept) {
        const sql = `INSERT INTO department (name)
                    VALUES (?)`;
        const params = dept.name;
        db.query(sql, params, (err, rows) => {
            if (err) {
                console.log(err)
            };
            console.log(`${rows.affectedRows} department added.`)
        });
    };
}


module.exports = new Department()
