const inquirer = require("inquirer")
// const db 
const mysql = require('mysql2')
const express = require('express');
const router = express.Router();
const path = require('path');
const { execArgv } = require("process");
const { response } = require("express");


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
        }
    })
}


function addDepartment(){

}

function addRole(){

}

function addEmployee(){

    
}