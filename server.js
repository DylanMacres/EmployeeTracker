const inquirer = require("inquirer")
// const db 
const mysql = require('mysql2')
const express = require('express');
const router = express.Router();
const path = require('path');
const { execArgv } = require("process");
const { response } = require("express");
// const Connection = require("mysql2/typings/mysql/lib/Connection");
const { start } = require("repl");
const connection = require("./db/connection")



const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({extended: false}));
app.use(express.json());


function startQuestions() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message:"Select from the list",
            choices: [
                "View Roles",
                "View Departments",
                "View Employees",
                "Add Role",
                "Add New Employee",
                "Add Department",
                "Finish",
            ],
        }   
    ])


    .then((response) => {
        //switch case statements for resonse
        switch(response.choices){
            case 'Add New Employee':
                addEmployee();
                break;

            case 'Add Department':
                addDepartment();
                break;

            case 'Add Role':
                addRole();
                break;
            case "View Departments":
            viewDepartment();
            break;
            case "View Roles":
                viewRoles();
                break;
            case "View Employees":
                viewEmployees();
                break;

        }
    })
}


function addDepartment(){

}

function addRole(){

}

function addEmployee(){

    
}

function viewEmployees(){
    connection.query('SELECT * FROM employee', (err, res) => {
        if(err) throw err;
       console.log("Viewing Employees");
       console.table(res);
       startQuestions();
    });

}
function viewRoles(){
    connection.query('SELECT * FROM roles', (err, res) => {
        if(err) throw err;
       console.log("Viewing Roles");
       console.table(res);
       startQuestions();
    });

}

function viewDepartment(){
connection.query('SELECT * FROM department', (err, res) => {
    if(err) throw err;
   console.log("Viewing Departments");
   console.table(res);
   startQuestions();
});

}

