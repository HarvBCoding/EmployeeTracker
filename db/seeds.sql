INSERT INTO department (name)
VALUES
    ('Legal'),
    ('Finance'),
    ('Sales'),
    ('Engineering');

INSERT INTO role (title, salary, departmentId)
VALUES
    ('Sales Lead', 80000, 3),
    ('Salesperson', 50000, 3),
    ('Lead Engineer', 150000, 4),
    ('Software Engineer', 120000, 4),
    ('Accountant', 125000, 2),
    ('Accounting Lead', 145000, 2),
    ('Legal Team Lead', 250000, 1),
    ('Lawyer', 190000, 1);

INSERT INTO manager (first_name, last_name, roleId)
VALUES
    ('Sophia', 'Livingston', 1),
    ('Noah', 'Dawson', 3),
    ('Jaxon', 'Harvey', 6),
    ('Emma', 'Nelson', 7);

INSERT INTO employee (first_name, last_name, roleId, managerId)
VALUES
    ('Liam', 'Richards', 2, 1),
    ('Olivia', 'Hanson', 4, 2),
    ('Riley', 'Matthews', 5, 3),
    ('Elijah', 'Greyson', 8, 4);