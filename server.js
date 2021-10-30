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

const init = () => {
    prompts.startPrompt();
}

init();


