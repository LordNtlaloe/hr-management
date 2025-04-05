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
employeeDetails.get("/employee-details", getEmployeeDetails);
employeeDetails.post("/add-employee-details", createEmployeeDetails);
employeeDetails.get("/employee-details/:employee_number", getEmployeeDetail);
employeeDetails.put("/employee-details/:employee_number", updateEmployeeDetails);
employeeDetails.delete("/employee-details/:employee_number", deleteEmployeeDetails);


module.exports = employeeDetails;