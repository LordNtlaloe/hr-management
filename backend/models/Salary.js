import mongoose from "mongoose";

const SalarySchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    month: {
        type: String,
        required: true        
    },
    year: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        emum: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
        required: true
    },
    deductions: {
        type: Number,
        required: true
    },
    bonus: {
        type: Number,
    },
    net_salary: {
        type: Number,
        required: true
    }
})

export default mongoose.model("Salary", SalarySchema);