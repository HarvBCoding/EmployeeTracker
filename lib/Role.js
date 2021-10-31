const db = require('../db/connection');
const consoleTable = require('console.table');

class Role {
    constructor() {

    }

    allRoles() {
        const sql = `SELECT role.*,
                     department.name AS departmentName
                     FROM role
                     LEFT JOIN department
                     ON role.departmentId = department.id`;
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err)
            };
            console.table('Roles', rows);
        })
    };

    addRole(role) {
        const sql = `INSERT INTO role (title, salary, departmentId)
                    VALUES (?,?,?)`;
        const params = [role.title, role.salary, role.departmentId];
        db.promise().query(sql, params, (err, rows) => {
            if (err) {
                console.log(err)
            };
            console.log(`${rows.affectedRows} role added.`)
        });
    };
}

module.exports = new Role()
