const express = require("express");
const inquirer = require("inquirer");
const {userInput} = require('pg');

const app = express();
const PORT = 3001;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {userInput}= new userInput({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5050, //??
});

userInput.connect();

const run = async () => {
    const {schema} = await inquirer.prompt([
        {
        type: "list",
        name: "schema",
        message: "where would you like to be directed?",
        choices: ["EMPLOYEE", "ROLE", "DEPARTMENT"],
        },
    ]);

    const res = await userInput.query(`SELECT * FROM ${schema}`);
    console.table(res.rows);

    userInput.end();
};


const mainMenu = async () => {
    const answer = await inquirer.prompt({
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
            "View all employees",
            "View all roles",
            "View all departments",
            "Add an employee",
            "Add a role",
            "Add a department",
            "Update an employee role",
            "Quit"
        ]
    });

    switch (answer.option) {
        case "View all employees":
            viewEmployees();
            break;
        case "View all roles":
            viewRoles();
            break;
        case "View all departments":
            viewDepartments();
            break;
        case "Add an employee":
            addEmployee();
            break;
        case "Add a role":
            addRole();
            break;
        case "Add a department":
            addDepartment();
            break;
        case "Update an employee role":
            updateEmployeeRole();
            break;
        case "Quit":
            quit();
            break;
    }
};

mainMenu();



app.listen(PORT, () => {console.log(`API server now on port http://localhost:PORT`);});