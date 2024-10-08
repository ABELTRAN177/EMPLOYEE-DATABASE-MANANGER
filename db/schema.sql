-- drop tables if they exist
DROP TABLE IF EXISTS EMPLOYEE CASCADE;
DROP TABLE IF EXISTS ROLE CASCADE;
DROP TABLE IF EXISTS DEPARTMENT CASCADE;

CREATE TABLE DEPARTMENT (
    id SERIAL PRIMARY KEY,
    department_name VARCHAR(30) UNIQUE NOT NULL,
);

CREATE TABLE ROLE (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) Unique NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES DEPARTMENT(id)
    -- would not make sense to have a role without a department
    -- so instead of set to null we cascade 
    ON DELETE CASCADE
);


CREATE TABLE EMPLOYEE (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
);


--  placed at the end to avoid foreign key constraint errors
ALTER TABLE EMPLOYEE
ADD FOREIGN KEY (role_id) REFERENCES ROLE(id) ON DELETE CASCADE;

ALTER TABLE EMPLOYEE
ADD FOREIGN KEY (manager_id) REFERENCES EMPLOYEE(id) ON DELETE SET NULL;


