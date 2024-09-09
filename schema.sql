CREATE TABLE DEPARTMENT (
    ID SERIAL PRIMARY KEY,
    NAME VARCHAR(30) Unique NOT NULL
);

CREATE TABLE EMPLOYEE (
    ID SERIAL PRIMARY KEY,
    FIRST_NAME VARCHAR(30) NOT NULL,
    LAST_NAME VARCHAR(30) NOT NULL,
    ROLE_ID INT NOT NULL,
    MANAGER_ID INT
);

CREATE TABLE ROLE (
    ID SERIAL PRIMARY KEY,
    TITLE VARCHAR(30) Unique NOT NULL,
    SALARY DECIMAL NOT NULL,
    DEPARTMENT_ID INT NOT NULL
);

