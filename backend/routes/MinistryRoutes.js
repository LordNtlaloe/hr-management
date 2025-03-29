const express = require("express");
const {
    getMinistries,
    getMinistry,
    createMinistry,
    updateMinistry,
    deleteMinistry,
} = require("../controllers/MinistryController");

const ministry = express.Router();

// Define your routes
users.get("/ministries", getMinistries);
users.post("/add-ministries", createMinistry);
users.get("/ministries/:id", getMinistry);
users.put("/ministries/:id", updateMinistry);
users.delete("/ministries/:id", deleteMinistry);


module.exports = ministry;