const mongoose = require("mongoose");
const LeaveRequest = require("../models/LeaveRequest");

const getLeaveRequests = async (req, res) => {
    try {
        const leave_request = await LeaveRequest.find({});
        return res.status(200).json(leave_request);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getLeaveRequest = async (res, req) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Selected Leave Request Does Not Exist" })
        }
        const leave_request = await LeaveRequest.findById(id)
            .populate("employee_id");

        if (!leave_request) {
            return res.status(404).json({ message: "Invalid Request" })
        }

        return res.status(200).json(leave_request);
    }
    catch (error) {
        return res.status(500).json({ message: error.massage });
    }
}

const createLeave = async (res, req) => {
    try {
        const { employee_id, start_date, end_date, leave_type, status, reason_for_leave } = req.body;
        if (!employee_id || start_date || end_date || leave_type || status || reason_for_leave) {
            return res.status(400).json({ message: "All Fields Must Be Filled In" });
        }

        const existing_leave_request = await LeaveRequest.findOne({ employee_id });
        if (existing_leave_request) {
            return res.status(400).json({ message: "Employee Has Already Requested Leave" });
        }

        const leave_request = await LeaveRequest.create(req.body);
        return res.status(201).json(leave_request);
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const updateLeave = async (req, res) => {
    try {
        const { id } = req.params;
        const update_data = req.body;

        if (update_data) {
            return res.status(400).json({ message: "Employee Id Cannot Be Updated" });
        }

        const leave_request = await LeaveRequest.findByIdAndUpdate(id, update_data, { new: true, runValidators: true })
        if (!leave_request) {
            return res.status(404).json({ message: "Leave Request Not Found" });
        }
        return res.status(200).json(leave_request);
    }
    catch (error) {
        return res.status(500).json({ mesage: error.message });
    }
}

const deleteLeave = async (req, res) => {
    try {
        const { id } = req.params;
        const leave_request = await LeaveRequest.findByIdAndDelete(id);

        if (!leave_request) {
            return res.status(404).json({ message: "Leave Request Does Not Exist" });
        }
        return res.status(200).json({ message: "Leave Has Been Deleted Successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getLeaveRequest,
    getLeaveRequests,
    createLeave,
    updateLeave,
    deleteLeave
}