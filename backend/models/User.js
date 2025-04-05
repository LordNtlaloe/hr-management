const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    first_name: {
        type:String,
        required: [true, "Please Provide A First Name"],
    },
    last_name: {
        type: String,
        required: [true, "Please Provide A Last Name"]        
    },
    email: {
        type: String,
        required: [true, "Your Email Address Is Required"],
        unique: true,
    },

    password: {
        type: String,
        required: [true, "Your Password Is Required"]
    },
    profile_picture: {
        type: String
    },
    role: {
        type: String,
        emum: ["Admin", "HR Manager", "Department Head", "Employee"]
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
})
UserSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next(); // Prevent re-hashing if password is not modified
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model("Users", UserSchema);