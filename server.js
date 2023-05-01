const mysql = require("mysql");
const inquirer = require("inquirer");
// const Ctable = require("console.table");


const connection = mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'password',
      database: 'employee_tracker_db',
    }); 
    connection.connect(function(err){
      if (err) throw err;
      console.log("Connected with ID: " + connection.threadId);
    });
startScreen();
   

function startScreen() {
   inquirer.prompt({
         type: "list",
         choices: [
            "Add department",
            "Add role",
            "Add employee",
            "View departments",
            "View roles",
            "View employees",
            "Update employee role",
            "Quit"
         ],
         message: "Please choose an option.",
         name: "option"
      })
      .then(function(result){
         console.log("You chose: " + result.option);

         switch (result.option) {
            case "Add department":
               addDepartment();
               break;
            case "Add role":
               break;
            case "Add employee":
               addEmployee();
               break;
            case "View departments":
               viewDepartment();
               break;
            case "View roles":
               viewRoles();
               break;
            case "View employees":
               viewEmployees();
               break;
            case "Update employee role":
               updateEmployee();
               break;
            default:
               quit();
         }
      });
}

function addDepartment() {
   inquirer.prompt({
      type: "input",
      message: "What is the name of the department?",
      name: "deptName"
   }).then(function(answer){

      connection.query("INSERT INTO department (name) VALUE (?)", [answer.deptName], function(err, res) {
         if (err) throw err; 
         console.table(res)
         startScreen()

      })
   })
}

function addRole() {
   inquirer
      .prompt([
         {
            type: "input",
            "message": "What is the role?",
            name: "roleName"
         },
         {
            type: "input",
            message: "What is the salary for this role?",
            name: "salaryTotal"
         },
         {
            type: "input",
            message: "what is the department id?",
            name: "deptID"
         }
      ])
      .then(function(answer){
         connection.query("INSERT INTO role (title, salary, department_id) VALUE(?, ?, ?)", [answer.roleName, answer.salaryTotal, answer.deptID], function(err, res) {
            if (err) throw err;
            console.table(res);
            startScreen();
         });
      });
}

function addEmployee() {
   inquirer
      .prompt([
         {
            type: "input",
            message: "What is the first name of the employee?",
            name: "empFirstName"
         },
         {
            type: "input",
            message: "What is the last name of the employee?",
            name: "empLastName"
         },
         {
            type: "input",
            message: "what is tthe employee's role ID number?",
            name: "roleID"
         },
         {
            type: "input",
            message: "What is the manager ID number?",
            name:  "managerID"
         }
      ])
      .then(function(answer){

         connection.query("INSERT INTO employee (FirstName, LastName, RoleID, ManagerID) VALUES (?, ?, ?, ?)", [answer.empFirstName, answer.empLastName, answer.roleID, answer.managerID], function(err, res) {
            if (err) throw err; 
            console.table(res);
            startScreen();
         });
      });
}

function updateEmployee() {
   inquirer.prompt([
      {
         type: "input",
         message: "Which emplyee would you like to update?",
         name: "eeUpdate"
      },
      {
      type: "input",
      message: "What do you want to update date it to?",
      name: "updateRole"
      }
   ])
   .then(function(answer) {

      connection.query('UPDATE employee SET role_id=? WHERE first_name=?', [answer.updateRole, answer.eeUpdate], function(err, res) {
         if (err) throw err;
         console.table(res);
         startScreen();
      });
   });
}

function viewDepartment() {
   let query = "SELECT * FROM department";
   connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      startScreen();
   });
}

function viewRoles() {
   let query = "SELECT * FROM employee";
   connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      startScreen();
   });
}

function viewEmployees() {
   let query = "SELECT * FROM employee";
   connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      startScreen;
   });
}

function quit() {
   connection.end();
   process.exit();
}