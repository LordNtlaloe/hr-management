const express = require("express");
const {
    getEmployeeDetails,
    getEmployeeDetail,
    createEmployeeDetails,
    updateEmployeeDetails,
    deleteEmployeeDetails,
} = require("../controllers/EmployeeDetailsController");

const employeeDetails = express.Router();

// Define your routes
users.get("/employee-details", getEmployeeDetails);
users.post("/add-employee-details", createEmployeeDetails);
users.get("/employee-details/:employee_number", getEmployeeDetail);
users.put("/employee-details/:employee_number", updateEmployeeDetails);
users.delete("/employee-details/:employee_number", deleteEmployeeDetails);


module.exports = employeeDetails;