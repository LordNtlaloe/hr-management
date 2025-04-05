const mongoose = require("mongoose");

const ministrySchema = ({
    ministry_name: { 
        type: String, 
        required: true 
    }
})

module.exports = mongoose.model("Ministry", ministrySchema)