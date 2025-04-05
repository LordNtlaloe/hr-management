const Employee = require("../models/Employee");

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid employee ID" });
        }

        // Fetch employee and populate related fields (employee details, department, ministry, etc.)
        const employee = await Employee.findById(id)
            .populate('employee_details') // Assuming employee_details is the reference to employee details
            .populate('department_id')   // Assuming department_id references the Department collection
            .populate('ministry_id');    // Assuming ministry_id references the Ministry collection

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createEmployee = async (req, res) => {
    try {
        const { first_name, last_name, email } = req.body;

        // Validate required fields
        if (!first_name || !last_name || !email) {
            return res.status(400).json({
                message: "First name, last name, and email are required fields"
            });
        }

        // Check if email already exists
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({
                message: "Employee with this email already exists"
            });
        }

        const employee = await Employee.create(req.body);
        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({
            message: error.message,
            details: error.errors // Include validation error details if available
        });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Don't allow updating email if it's provided in the request
        if (updateData.email) {
            return res.status(400).json({
                message: "Email cannot be updated"
            });
        }

        const employee = await Employee.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({
            message: error.message,
            details: error.errors
        });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByIdAndUpdate(
            id,
            { is_active: false },
            { new: true }
        );

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({
            message: 'Employee deactivated successfully',
            employee
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const searchEmployees = async (req, res) => {
    try {
        const { query } = req.query;
        const employees = await Employee.find({
            $or: [
                { first_name: { $regex: query, $options: 'i' } },
                { last_name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        });
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployees
};