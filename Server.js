const express = require('express');
const inquirer = require('inquirer');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

// app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// connects to the database
const pool = new Pool({
    user: 'postgress',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
});


// client.connect();


const mainMenu = async () => {
    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "view all employees",
                "view all roles",
                "view all departments",
                "add an employee",
                "add a role",
                "add a department",
                "update an employee role",
                "quit"
            ],
            loop: false,
        },
    ]);

    switch (answer.action) {
        case "view all employees":
            return viewEmployees();
        case "view all roles":
            return viewRoles();
        case "view all departments":
            return viewDepartments();
        case "add an employee":
            return addEmployee();
        case "add a role":
            return addRole();
        case "add a department":
            return addDepartment();
        case "update an employee role":
            return updateEmployeeRole();
        case "quit":
            return client.end();
    }
}
const viewEmployees = async () => {
    const res = await pool.query("SELECT * FROM employee");
    console.table(res.rows);
    mainMenu();
}
const viewRoles = async () => {
    const res = await pool.query("SELECT * FROM ROLE");
    console.table(res.rows);
    mainMenu();
}
const viewDepartments = async () => {
    const res = await pool.query("SELECT * FROM DEPARTMENT");
    console.table(res.rows);
    mainMenu();
}

const addEmployee = async () => {
    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "employeeId",
            message: "What is the employee's ID?",
        },
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?",
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?",
        },
        {
            type: "input",
            name: "jobTitle",
            message: "What is the employee's title?",
        },
        {
            type: "input",
            name: "department",
            message: "what department does the employee belong to?",
        },
        {
            type: "input",
            name: "salary",
            message: "What is the employee's salary?",
        },
        {
            type: "input",
            name: "managerId",
            message: "What is the employee's manager ID?",
        },
    ]);

    await pool.query("INSERT INTO EMPLOYEE (employeeId, firstName, lastName, jobTitle, department, salary, managerId) VALUES ($1, $2, $3, $4, $5, $6, $7)", [answer.employeeId, answer.firstName, answer.lastName, answer.jobTitle, answer.department, answer.salary, answer.managerId]);
    console.log("Employee added!");
    mainMenu();
}

const addRole = async () => {
    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of the role?",
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?",
        },
        {
            type: "input",
            name: "departmentId",
            message: "What is the department ID?",
        },
    ]);

    await pool.query("INSERT INTO ROLE (title, salary, departmentId) VALUES ($1, $2, $3)", [answer.title, answer.salary, answer.departmentId]);
    console.log("Role added!");
    mainMenu();
}

const addDepartment = async () => {
    const answer = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "What is the name of the department?",
    });
    await pool.query("INSERT INTO DEPARTMENT (name) VALUES ($1)", [answer.name]);
    console.log("Department added!");
    mainMenu();
}

const updateEmployeeRole = async () => {
    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "employeeId",
            message: "What is the employee's ID?",
        },
        {
            type: "input",
            name: "roleId",
            message: "What is the new role ID?",
        },
    ]);

    await pool.query("UPDATE EMPLOYEE SET roleId = $1 WHERE employeeId = $2", [answer.roleId, answer.employeeId]);
    console.log("Employee role updated!");
    mainMenu();
}

mainMenu();

app.listen(PORT, () => { console.log(`API server now on port http://localhost:${PORT}`); });