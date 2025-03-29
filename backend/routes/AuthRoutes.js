const express = require("express");
const { authMiddleware, checkRole } = require("./AuthMiddleware");
const { Signup, Login, Logout } = require("../controllers/AuthController");

const auth = express.Router();

auth.post("/signup", Signup);
auth.post("/login", Login);
auth.post("/logout", Logout);

auth.get("/dashboard", authMiddleware, checkRole(["Data-Officer", "Admin"]), (req, res) => {
    res.json({ status: true, user: req.user });
});


module.exports = auth;