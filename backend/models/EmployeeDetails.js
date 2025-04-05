const mongoose = require("mongoose");

const employeeDetailsSchema = ({
    employee_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Employee"
    },
    employee_number: { 
        type: String, 
        required: true, 
        unique: true 
    },
    date_of_employment: { type: Date, 
        required: true 
    },
    grade: { 
        type: String, 
        required: true 
    },
    department_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Department" 
    },
    position: { 
        type: String, required: true 
    },
    has_warning: { 
        type: Boolean, 
        required: true 
    },
    warning_count: {
        type: Number, 
        required: true 
    },
    ministry_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Ministry" 
    },
});

module.exports = mongoose.model("EmployeeDetails", employeeDetailsSchema);
