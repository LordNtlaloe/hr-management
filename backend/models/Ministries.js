const mongoose = require("mogoose");

const ministrySchema = ({
    ministry_name: { type: String, required }
})

module.exports = mongoose.model("Ministry", ministrySchema)