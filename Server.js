const express = require('express');
const inquirer = require('inquirer');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// connects to the database
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: process.env.DB_DATABASE,
    password: 'password',
    port: 5432,
});


// sets the layout of the database
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
            return pool.end();
    }
}
const viewEmployees = async () => {
    const res = await pool.query("SELECT * FROM EMPLOYEE");
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
            name: "first_name",
            message: "What is the employee's first name?",
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?",
        },
        {
            type: "input",
            name: "role_id",
            message: "What is the employee's role ID?",
        },
        {
            type: "input",
            name: "manager_id",
            message: "What is the employee's manager ID?",
        },
    ]);

    await pool.query("INSERT INTO EMPLOYEE ( first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)", [ answer.first_name, answer.last_name, answer.role_id, answer.manager_id]);
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
            name: "department_id",
            message: "What is the department ID?",
        },
    ]);

    await pool.query("INSERT INTO ROLE (title, salary, department_id) VALUES ($1, $2, $3)", [answer.title, answer.salary, answer.department_id]);
    console.log("Role added!");
    mainMenu();
}

const addDepartment = async () => {
    const answer = await inquirer.prompt({
        type: "input",
        name: "department_name",
        message: "What is the name of the department?",
    });
    await pool.query("INSERT INTO DEPARTMENT (department_name) VALUES ($1)", [answer.department_name]);
    console.log("Department added!");
    mainMenu();
}

const updateEmployeeRole = async () => {
    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "employee_id",
            message: "What is the ID of the employee you want to update?",
        },
        {
            type: "input",
            name: "new_role_id",
            message: "What is the new role ID?",
        },
    ]);

    await pool.query("UPDATE EMPLOYEE SET role_id = $1 WHERE id = $2", [answer.new_role_id, answer.employee_id]);
    console.log("Employee role updated!");
    mainMenu();
}
// runs the main menu
mainMenu();

// not using a port for now, added it for best practice
app.listen(PORT, () => { console.log(`API server now on port http://localhost:${PORT}`); });