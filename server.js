const express = require('express');
const mysql = require('mysql2');
const db = require('./db/connection');
const consoleTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// require functions from folder
const prompts = require('./lib/index')
const Department = require('./lib/Department');
const Employee = require('./lib/Employee');
const Role = require('./lib/Role');


db.connect(err => {
    if (err) throw err;
    console.log('Database connected');
});

startPrompt()
