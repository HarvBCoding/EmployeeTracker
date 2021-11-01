const express = require('express');
const mysql = require('mysql2');
const db = require('./db/connection');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const Department = require('./lib/Department');
const Employee = require('./lib/Employee');
const Role = require('./lib/Role');

const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// prompt to update an employee role
const updateEmployeePrompt = () => {
    const sql = `SELECT id, title FROM role;
                SELECT id, first_name, last_name, roleId FROM employee;
                SELECT id, first_name, last_name, roleId FROM manager;`
    // query the database for the information from table to use as choices
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        };
        // list of role
        let roleList = rows[0]
        let roleChoices = roleList.map(obj => {
            return `${obj.id}) ${obj.title}`
        })

        // list of employees
        let employeeList = rows[1]
        let employeeChoices = employeeList.map(obj => {
            return `${obj.id}) ${obj.first_name} ${obj.last_name}`
        });

        // list of managers
        let managerList = rows[2]
        let managerChoices = managerList.map(obj => {
            return `${obj.id}) ${obj.first_name} ${obj.last_name}`
        });

        // merge employees and managers together for one list
        let finalList = managerChoices.concat(employeeChoices)

        return inquirer.prompt([
            {
                type: 'list',
                name: 'id',
                message: 'Which employee would you like to update?',
                choices: finalList
            },
            {
                type: 'list',
                name: 'roleId',
                message: 'What title will the employee now have?',
                choices: roleChoices
            }
        ]).then( answer => {
            // take the answer and split at the ID
            let idArr = answer.id.split(')')
            let empId = idArr[0]

            // get role ID
            let roleArr = answer.roleId.split(')')
            let newRoleId = roleArr[0]

            // create new object with IDs
            const updateEmp = {id: empId, roleId: newRoleId}

            // pass information to employee constructor to update
            Employee.updateEmployee(updateEmp)
            // back to main menu
            startPrompt()
        }).catch(err => console.log(err))
    })
}

// prompt to add a new employee
const newEmployeePrompt = () => {
    const sql = `SELECT id, title FROM role;
                SELECT id, first_name, last_name FROM manager;`

    // query database for information from role and manager table
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        };
        // create role choices from rows
        let roleList = rows[0]
        let roleChoices = roleList.map(obj => {
            return `${obj.id}) ${obj.title}`
        });

        // create manager choices from rows
        let managerList = rows[1]
        let managerChoices = managerList.map(obj => {
            return `${obj.id}) ${obj.first_name} ${obj.last_name}`
        })
        return inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the first name of the employee you would like to add?',
                validate: firstInput => {
                    if (firstInput) {
                        return true;
                    } else {
                        console.log('Please enter a first name!')
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the last name of the employee you would like to add?',
                validate: lastInput => {
                    if (lastInput) {
                        return true;
                    } else {
                        console.log('Please enter a last name!')
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'roleId',
                message: 'What title will the employee have?',
                choices: roleChoices
            },
            {
                type: 'list',
                name: 'managerId',
                message: 'Who is the employees manager?',
                choices: managerChoices
            }
        ]).then( answer => {
            // split answer to get role ID
            let roleArr = answer.roleId.split(")")
            let roleId = roleArr[0]

            // split answer to get manager ID
            let managerArr = answer.managerId.split(")")
            let managerId = managerArr[0]

            const employee = { 
                first_name: answer.first_name, 
                last_name: answer.last_name, 
                roleId: roleId, 
                managerId: managerId}

            // send employee object to be added to database
            Employee.addEmployee(employee)
            startPrompt()

        }).catch(err => console.log(err))
    })
}

// prompt to add role
const newRolePrompt = () => {
    // query database to get the name and id from department table
    db.query(`SELECT id, name FROM department`, (err, rows) => {
        if (err) {
            console.log(err)
        };
        // create list to chose department from
        let list = rows.map(obj => {
            return `${obj.id}) ${obj.name}`
        })
        return inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role you would like to add? (Required)',
                validate: roleInput => {
                    if (roleInput) {
                        return true;
                    } else {
                        console.log('Please enter a title for the new role!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary amount for the new role?',
                validate: salaryInput => {
                    if (salaryInput) {
                        return true;
                    } else {
                        console.log('Please enter a salary amount!')
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'departmentId',
                message: 'What department is the new role associated with?',
                choices: list
            }
        ]).then( answer => {
            
            // split answer to get roleId
            let deptArr = answer.departmentId.split(")")
            let deptId = deptArr[0]

            let role = { 
                title: answer.title, 
                salary: answer.salary, 
                departmentId: deptId }
            
            // send role object to be added to database
            Role.addRole(role);
            // start main menu again
            startPrompt();

        }).catch(err => console.log(err))
    })
}

// prompt to add a new department
const newDeptPrompt = () => {
    return inquirer.prompt(
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department you would like to add? (Required)',
            validate: deptInput => {
                if (deptInput) {
                    return true;
                } else {
                    console.log('Please enter a department name!');
                    return false;
                }
            }
        }
    ).then( answer => {
        // send answer to be added to database as a department
        Department.addDept(answer);
        // main menu
        startPrompt();
    }).catch(err => console.log(err))
}

// main menu prompt
const startPrompt = () => {
    return inquirer.prompt(
        {
            type: 'list',
            name: 'startList',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        }
    ).then( reply => {
        switch (reply.startList) {
            case 'View all departments':
                // show all departments
                Department.allDepts();
                startPrompt()
                break;
            case 'View all roles':
                // show all roles
                Role.allRoles();
                startPrompt()
                break;
            case 'View all employees':
                // show all employees
                Employee.allEmployees();
                startPrompt()
                break;
            case 'Add a department':
                // add a new department
                newDeptPrompt()
                break;
            case 'Add a role':
                // add a new role
                newRolePrompt()
                break;
            case 'Add an employee':
                // add a new employee
                newEmployeePrompt()
                break;
            case 'Update an employee role':
                // update employee
                updateEmployeePrompt()
                break;
        }
    }).catch (err => {
        console.log(err)
    })
}
const init = () => {
    startPrompt()
}

init();
