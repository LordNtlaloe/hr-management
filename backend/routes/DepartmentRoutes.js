const express = require("express");
const {
    getDepartments,
    getDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment,
} = require("../controllers/DepartmentController");

const department = express.Router();

// Define your routes
department.get("/departments", getDepartments);
department.post("/add-department", createDepartment);
department.get("/departments/:id", getDepartment);
department.put("/departments/:id", updateDepartment);
department.delete("/departments/:id", deleteDepartment);


module.exports = department;