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
  prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      message: "What is the employee's last name?"
    }
  ])
    .then(res => {
      let firstName = res.first_name;
      let lastName = res.last_name;

      db.findAllRoles()
        .then(([rows]) => {
          let roles = rows;
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
          }));

          prompt({
            type: "list",
            name: "roleId",
            message: "What is the employee's role?",
            choices: roleChoices
          })
            .then(res => {
              let roleId = res.roleId;

              db.findAllEmployees()
                .then(([rows]) => {
                  let employees = rows;
                  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                  }));

                  managerChoices.unshift({ name: "None", value: null });

                  prompt({
                    type: "list",
                    name: "managerId",
                    message: "Who is the employee's manager?",
                    choices: managerChoices
                  })
                    .then(res => {
                      let employee = {
                        manager_id: res.managerId,
                        role_id: roleId,
                        first_name: firstName,
                        last_name: lastName
                      }

                      db.createEmployee(employee);
                    })
                    .then(() => console.log(
                      `Added ${firstName} ${lastName} to the database`
                    ))
                    .then(() => startQuestions())
                })
            })
        })
    })
};

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
        message: "What department is this role in?",
        name: "departmentName",
      },
    ])
    .then((response) => {
      connection.query(
        "SELECT name FROM DEPARTMENT ",
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
  prompt([
    {
      name: "name",
      message: "What is the name of the department?"
    }
  ])
    .then(res => {
      let name = res;
      db.createDepartment(name)
        .then(() => console.log(`Added ${name.name} to the database`))
        .then(() => startQuestions())
    })
}


function viewEmployees() {
db.findAllEmployees().then(([rows]) => {
  let employees =rows;
  console.table(employees);
}) .then (() => startQuestions());
  };

function viewRoles() {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.log("Viewing Roles");
    console.table(res);
    startQuestions();
  });
}

function viewDepartment() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => startQuestions());
}


function finish(){
    console.log("Thank you! and goodbye");
    process.exit();
}

startQuestions();