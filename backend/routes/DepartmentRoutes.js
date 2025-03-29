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
users.get("/departments", getDepartments);
users.post("/add-departments", createDepartment);
users.get("/departments/:id", getDepartment);
users.put("/departments/:id", updateDepartment);
users.delete("/departments/:id", deleteDepartment);


module.exports = department;