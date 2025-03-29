const User = require("../models/User");
const EmployeeDetails = require("../models/EmployeeDetails")


const getEmployeeDetails = async (req, res) => {
    try {
        const employeeDetails = await EmployeeDetails.find({});
        res.status(200).json(employeeDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEmployeeDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await EmployeeDetails.findById(id);
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createEmployeeDetails = async (req, res) => {
    try {
        const { employee } = req.body;

        // Validate user id
        const employeeExists = await User.findById(employee);
        if (!employeeExists) {
            return res.status(400).json({ message: "Invalid Employee Number" });
        }

        // Create the create employee details document
        const employeeDetails = await EmployeeDetails.create(req.body);
        res.status(201).json(employeeDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateEmployeeDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { employee } = req.body;

        if (employeey) {
            const employeeExists = await User.findById(employee);
            if (!employeeExists) {
                return res.status(400).json({ message: "Invalid Employee Number" });
            }
        }

        const employeeDetails = await EmployeeDetails.findByIdAndUpdate(id, req.body, { new: true });
        if (!employeeDetails) {
            return res.status(404).json({ message: "Employee Details Not Found" });
        }

        res.status(200).json(employeeDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteEmployeeDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const employeeDetails = await EmployeeDetails.findByIdAndDelete(id);

        if (!employeeDetails) {
            return res.status(404).json({ message: "Employee Details Not Found" });
        }

        res.status(200).json({ message: "Security Employee Details Deleted successfully" });
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