INSERT INTO department (name)
VALUES ("Security"), ("Arc Reactor"), ("Engineering"), ("Hospitality"), ("Leadership");

INSERT INTO role (title, salary, department_id)
VALUE ("Head of Security", 25000.00, 2), ("Scientist", 600000.00, 3), ("Engineer", 600000.00, 4), ("Butler", 200000.00, 1), ("CEO", 800000.00, 5);

INSERT INTO employee (FirstName, LastName, RoleID, ManagerID)
VALUE ("John", "Appleseed", 1, 3), ("Bill", "Gates", 1, 1), ("Steve", "Jobs", 3, 2), ("Jeff", "Bezos", 5, 2), ("Kobe", "Bryant", 5, 2);