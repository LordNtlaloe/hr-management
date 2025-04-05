const express = require("express");
const {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployees
} = require("../controllers/EmployeeController");

const employee = express.Router();

employee.get("/employees", getEmployees);
employee.get("/employees-search", searchEmployees);
employee.get("/employees/:id", getEmployee);
employee.post("/create-employee", createEmployee);
employee.put("/update-employee/:id", updateEmployee);
employee.patch("/edit-employee/:id", updateEmployee); 
employee.delete("/delete-employee/:id", deleteEmployee);

module.exports = employee;