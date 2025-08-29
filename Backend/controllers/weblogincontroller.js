const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Register = require("../models/webregistermodel");

// login
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Register.findOne({ email, password });
        if (!user){
            return res.status(401).json({ message: "Invalid email or password", success: false });
        } else{
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.status(200).json({ message: "Login successful", success: true, data: user, token });
        }

    } catch (error) {
        res.status(500).json({ message: "Server error", success: false, error: error.message });
    }
};


// update password
const updatepassword = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedUser = await Register.findOneAndUpdate({ _id: id }, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found", success: false });
        } else {
            return res.status(200).json({ message: "Password updated successfully", success: true, data: updatedUser });
        }

    } catch (error) {
        return res.status(500).json({ message: "Server error", success: false, error: error.message });
    }
};

// logout
const logout = async (req, res) => {
    try {
        return res.status(200).json({ message: "Logout successful", success: true });
    } catch (error) {
        return res.status(500).json({ message: "Server error", success: false, error: error.message });
    }
};

module.exports = { login, updatepassword, logout };

