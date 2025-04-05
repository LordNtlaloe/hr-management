const mongoose = require("mongoose");

const departmentSchema = ({
    department_name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Department", departmentSchema)