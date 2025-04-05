const EmployeeDetails = require("../models/EmployeeDetails");

// Get all employee details
const getEmployeeDetails = async (req, res) => {
    try {
        const employeeDetails = await EmployeeDetails.find({})
            .populate("employee_id", "first_name last_name email phone_number")  // Populate employee details
            .populate("department_id", "department_name")                         // Populate department details
            .populate("ministry_id", "ministry_name");                            // Populate ministry details
        
        res.status(200).json(employeeDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get single employee detail by ID
const getEmployeeDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await EmployeeDetails.findById(id)
            .populate("employee_id", "name")
            .populate("department_id", "name")
            .populate("ministry_id", "name");

        if (!employee) {
            return res.status(404).json({ message: "Employee details not found" });
        }

        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create employee details
const createEmployeeDetails = async (req, res) => {
    try {
        const data = req.body;

        const employeeDetails = await EmployeeDetails.create(data);
        res.status(201).json(employeeDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update employee details
const updateEmployeeDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const employeeDetails = await EmployeeDetails.findByIdAndUpdate(id, data, {
            new: true,
        });

        if (!employeeDetails) {
            return res.status(404).json({ message: "Employee details not found" });
        }

        res.status(200).json(employeeDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete employee details
const deleteEmployeeDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await EmployeeDetails.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "Employee details not found" });
        }

        res.status(200).json({ message: "Employee details deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getEmployeeDetails,
    getEmployeeDetail,
    createEmployeeDetails,
    updateEmployeeDetails,
    deleteEmployeeDetails,
};
