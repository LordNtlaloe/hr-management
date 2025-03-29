const mongoose = require("mogoose");

const departmentSchema = ({
    department_name: { type: String, required }
})

module.exports = mongoose.model("Department", departmentSchema)