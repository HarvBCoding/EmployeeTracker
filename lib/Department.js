// db query for departments
const express = require('express');
const db = require('../db/connection');
const consoleTable = require('console.table');

// get all departments
class Department {
    constructor(id, name) {
        this.name = name;
        this.id = id;

    }

    allDepts() {
        const sql = `SELECT * FROM department`
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err)
            };
            console.table('Departments', rows);
        });
    }
}

