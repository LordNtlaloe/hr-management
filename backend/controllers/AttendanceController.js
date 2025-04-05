const { default: mongoose } = require("mongoose");
const Attendance = require("../models/Attendance");

const getAttendances = async (res, req) => {
    try {
        const attendance = await Attendance.find({});
        return res.status(200).json(attendance);
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Selected Attedance Request Does Not Exist" });
        }

        const attendance = await Attendance.findById(id).populate("employee_id");
        if (!attendance) {
            return res.status(404).json({ message: "Invalid Request" });
        }

        return res.status(200).json(attendance);
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const markAttendance = async (req, res) => {
    try {
        const { employee_id, current_date, check_in, check_out, status } = req.body;

        if (!employee_id || current_date || check_in || check_out || status) {
            return res.status(400).json({ message: "All Fields Must Be Filled In" })

        }

        const attendance = await Attendance.create(req.body);
        return res.status(201).json(attendance);
    }

    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getAttendanceByEmployeeId = async (req, res) => {
    try {
        const attendance_records = await Attendance.find({ employee: req.employee_id })
        return res.status(201).json(attendance_records);
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAttendance,
    getAttendances,
    markAttendance,
    getAttendanceByEmployeeId
}