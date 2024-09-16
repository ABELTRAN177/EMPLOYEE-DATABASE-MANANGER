INSERT INTO DEPARTMENT (name)
VALUES ('Information Technology'), 
('Sales'), 
('Finance & Accounting'), 
('Research & Development'), 
('Human Resources');

INSERT INTO ROLE (title, salary, department_id)
VALUES ('Software Engineer', 100000, 1),
('Network Technician', 80000, 1),
('Account Executive', 90000, 2),
('Sales Manager', 120000, 2),
('Accountant', 80000, 3),
('Financial Analyst', 95000, 3),
('Research Analyst', 85000, 4),
('Research Scientist', 90000, 4),
('HR Manager', 110000, 5),
('HR Coordinator', 70000, 5);


INSERT INTO EMPLOYEE (first_name, last_name, role_id, manager_id)
VALUES ('John', 'McTavish', 1, NULL),
('Jane', 'Smith', 2, 1),
('Alice', 'Johnson', 3, NULL),
('Bob', 'Brown', 4, 3),
('Nathan', 'Drake', 5, NULL),
('Simon', 'Riley', 6, 5),
('Eve', 'Green', 7, NULL),
('Frank', 'Woods', 8, 7),
('Grace', 'Red', 9, NULL),
('John', 'Price', 10, 9);

