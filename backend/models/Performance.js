import mongoose from "mongoose";

const PerformanceSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    evaluator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    review_date: {
        type: Date,
        required: true   
    },
    rating: {
        type: String,
        emun: ["Poor", "Satisfactory", "Average", "Good", "Exceptional"],
        required: true
    },
    evalutor_comments: {
        type: String,
        required: true
    }
})

export default mongoose.model("Performance", PerformanceSchema)