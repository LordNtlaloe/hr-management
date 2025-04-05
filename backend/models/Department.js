const mongoose = require("mongoose");

const departmentSchema = ({
    department_name: {
        type: String,
        required: true
    },
    department_head: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    }
})

module.exports = mongoose.model("Department", departmentSchema)