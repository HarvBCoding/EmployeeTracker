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

// query db to get options for role


const newRolePrompt = () => {
    db.query(`SELECT id, name FROM department`, (err, rows) => {
        if (err) {
            console.log(err)
        };
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
            
            // add a case statement here
            let deptArr = answer.departmentId.split(")")
            let deptId = deptArr[0]
            let role = [answer.title, answer.salary, deptId]
            Role.addRole(role);
            startPrompt();
        }).catch(err => console.log(err))
    })
}

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
        Department.addDept(answer);
        startPrompt();
    }).catch(err => console.log(err))
}

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
                // prompt for name of new dept
                newDeptPrompt()
                break;
            case 'Add a role':
                // call function to prompt user for info to build a role and then create the role and add it to roles w/ query
                newRolePrompt()
                break;
            case 'Add an employee':
                // call function to prompt user for info to build an employee
            case 'Update an employee role':
                // call function that will either ask which value of the employee they would like to update or just ask for salary change
        }
    }).catch (err => {
        console.log(err)
    })
}
const init = () => {
    startPrompt()
}

init();


