const inquirer = require('inquirer');
// const db
const mysql = require("mysql2");
const express = require('express');;
const router = express.Router();
const path = require("path");
const { execArgv } = require("process");
const { response } = require("express");
// const Connection = require("mysql2/typings/mysql/lib/Connection");
const { start } = require("repl");
const connection = require("./db/connection");
const { finished } = require("stream");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function startQuestions() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "Select from the list",
        choices: [
          "View Roles",
          "View Departments",
          "View Employees",
          "Add Role",
          "Add New Employee",
          "Add Department",
          "Finish",
        ],
      },
    ])

    .then((response) => {
      //switch case statements for resonse
      switch (response.choices) {
        case "Add New Employee":
          addEmployee();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Role":
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

          case "Finish":
            finish();
            break;
      }
    });
}

function addEmployee() {
  console.log("new employee incoming");
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employees first name.",
        name: "firstName",
      },
      {
        type: "input",
        message: "Enter the employees last name.",
        name: "lastName",
      },
      {
        type: "input",
        message: "Enter the employees ID number",
        name: "empId",
      },

      {
        type: "input",
        message: "Enter the employees managers ID?",
        name: "managerId",
      },
    ])
    .then(function (response) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: response.firstName,
          last_name: response.lastName,
          role_id: response.empId,
          manager_id: response.managerId,
        },
        (err) => {
          if (err) throw err;
          console.log("Success!");
          startQuestions();
        }
      );
    });
}

function addRole() {
  console.log("new role incoming");
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the new Role name.",
        name: "name",
      },
      {
        type: "input",
        message: "Enter the salary for this role.",
        name: "salary",
      },
      {
        type: "input",
        message: "Enter the ID for this department",
        name: "deptId",
      },
    ])
    .then(function (response) {
      connection.query(
        "INSERT INTO roles SET ?",
        {
          title: response.name,
          salary: response.salary,
          department_id: response.deptId,
        },
        (err) => {
          if (err) throw err;
          console.log("Success!");
          startQuestions();
        }
      );
    });
}

function addDepartment() {
  console.log("new employee incoming");
  inquirer
    .prompt([
      {
        type: "input",
        message:
          "Enter the name of the new Department you would like to include",
        name: "newdept",
      },
    ])
    .then(function (response) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          dept_name: response.newdept,
        },
        (err) => {
          if (err) throw err;
          console.log("Success!");
          startQuestions();
        }
      );
    });
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.log("Viewing Employees");
    console.table(res);
    startQuestions();
  });
}
function viewRoles() {
  connection.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err;
    console.log("Viewing Roles");
    console.table(res);
    startQuestions();
  });
}

function viewDepartment() {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.log("Viewing Departments");
    console.table(res);
    startQuestions();
  });
}


function finish(){
    console.log("Thank you! and goodbye");
    process.exit();
}

startQuestions();