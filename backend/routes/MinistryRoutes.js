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
ministry.get("/ministries", getMinistries);
ministry.post("/add-ministry", createMinistry);
ministry.get("/ministries/:id", getMinistry);
ministry.put("/ministries/:id", updateMinistry);
ministry.delete("/ministries/:id", deleteMinistry);


module.exports = ministry;