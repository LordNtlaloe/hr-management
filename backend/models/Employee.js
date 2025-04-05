const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "First name is required"]
    },
    last_name: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    phone_number: {
        type: String
    },
    address: {
        street: String,
        city: String,
        state: String,
        postal_code: String,
        country: String
    },
    profile_picture: {
        type: String // URL to profile image
    },
    date_of_birth: {
        type: Date
    },
    gender: {
        type: String,
        enum: ["Male", "Female"]
    },
    is_active: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

EmployeeSchema.pre("save", function (next) {
    this.updated_at = Date.now();
    next();
});

module.exports = mongoose.model("Employee", EmployeeSchema);
