CREATE TABLE DEPARTMENT (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE ROLE (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) Unique NOT NULL,
    salary DECIMAL NOT NULL,
    department INT NOT NULL,
    FOREIGN KEY (department) REFERENCES DEPARTMENT(id)
    -- would not make sense to have a role without a department
    -- so instead of set to null we cascade 
    ON DELETE CASCADE
);


CREATE TABLE EMPLOYEE (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES ROLE(id)
    ON DELETE CASCADE
    FOREIGN KEY (manager_id) REFERENCES EMPLOYEE(id)
    ON DELETE SET NULL
);


