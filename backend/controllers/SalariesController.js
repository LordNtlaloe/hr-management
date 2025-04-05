const Salary = require('../models/Salary');

// Create salary record
const createSalary = async (req, res) => {
    try {
        const salary = await Salary.create(req.body);
        res.status(201).json(salary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get salaries for a user
const getEmployeeSalaries = async (req, res) => {
    try {
        const salaries = await Salary.find({ user: req.params.id });
        res.status(200).json(salaries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all salary records (admin/hr)
const getAllSalaries = async (req, res) => {
    try {
        const salaries = await Salary.find().populate('user');
        res.status(200).json(salaries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    createSalary, 
    getEmployeeSalaries, 
    getAllSalaries 
};
