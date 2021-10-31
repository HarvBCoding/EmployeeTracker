const db = require('../db/connection');
const consoleTable = require('console.table');

class Employee {
    constructor() {

    }

    allEmployees() {
        const sql = `SELECT employee.*,
                    manager.first_name AS managerFirst,
                    manager.last_name AS managerLast,
                    role.title AS title,
                    role.salary AS salary,
                    role.departmentId AS departmentId,
                    department.name AS departmentName
                    FROM employee
                    JOIN role ON employee.roleId = role.id
                    JOIN department ON role.departmentId = department.id
                    JOIN manager ON employee.managerId = manager.id;
                    
                    SELECT manager.*,
                    role.title AS title,
                    role.salary AS salary,
                    role.departmentId AS departmentId,
                    department.name AS departmentName
                    FROM manager
                    JOIN role ON manager.roleId = role.id
                    JOIN department ON role.departmentId = department.id;
                    `
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err)
            };
            let final = (rows.flat());
            console.table('Employees', final);
        });
    }
}

module.exports = new Employee()
