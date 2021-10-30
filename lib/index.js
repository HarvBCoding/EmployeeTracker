const db = require('../db/connection');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const Department = require('./Department');
const Employee = require('./Employee');
const Role = require('./Role');

module.exports = {
    newDept: function() {
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
            this.startPrompt()
        })
    },
    startPrompt: function() {
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
                    // run function to show all departments and then use break statement
                    Department.allDepts();
                    this.startPrompt()
                    break;
                case 'View all roles':
                    // call function to show all roles w/ break statement
                    Role.allRoles();
                    this.startPrompt()
                    break;
                case 'View all employees':
                    // call function to show all employees w/ break statement
                    Employee.allEmployees();
                    this.startPrompt()
                    break;
                case 'Add a department':
                    // call function that will prompt user for necessary information to create a dept, use user input to create the department
                    this.newDept()
                    break;
                case 'Add a role':
                    // call function to prompt user for info to build a role and then create the role and add it to roles w/ query
                case 'Add an employee':
                    // call function to prompt user for info to build an employee
                case 'Update an employee role':
                    // call function that will either ask which value of the employee they would like to update or just ask for salary change
            }
        }).catch (err => {
            console.log(err)
        })
    }
}