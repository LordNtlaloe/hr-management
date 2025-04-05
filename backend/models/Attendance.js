import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
    employee: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    current_date: {
        type: Date,
        required: true
    },
    check_in: {
        type: Date,
        required: true
    },
    check_out: {
        type: Date,
        required: true
    },
    status:{
        type: String,
        enum: ["Present", "Absent", "On Leave"],
        required: true
    }
});

export default mongoose.model("Attendance", AttendanceSchema);