const express = require('express');
const mysql = require('mysql2');
const db = require('./db/connection');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// require functions from folder
const Department = require('./lib/Department');
const Employee = require('./lib/Employee');
const Role = require('./lib/Role');

// start inquirer 
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
                // run function to show all departments and then use break statement
                
            case 'View all roles':
                // call function to show all roles w/ break statement
            case 'View all employees':
                // call function to show all employees w/ break statement
            case 'Add a department':
                // call function that will prompt user for necessary information to create a dept, use user input to create the department
            case 'Add a role':
                // call function to prompt user for info to build a role and then create the role and add it to roles w/ query
            case 'Add an employee':
                // call function to prompt user for info to build an employee
            case 'Update an employee role':
                // call function that will either ask which value of the employee they would like to update or just ask for salary change
        }
    })
}
// start w/ list with all applicable choices
// prompt with cases for each choice


db.connect(err => {
    if (err) throw err;
    console.log('Database connected');
});

startPrompt()