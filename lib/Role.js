const db = require('../db/connection');
const consoleTable = require('console.table');
const prompts = require('./lib/index');

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
        });
    }
}

module.exports = new Role()