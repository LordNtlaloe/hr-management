import mongoose from "mongoose";

const LeaveRequestSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    leave_type: {
        type: String,
        enum: ["Sick Leave", "Annual Leave", "Maternity Leave", "Other"],
        required: true
    },
    status: {
        type: String,
        emum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    },
    reason_for_leave: {
        type: String,
        required: true
    }
});

export default mongoose.model("LeaveRequest", LeaveRequestSchema);