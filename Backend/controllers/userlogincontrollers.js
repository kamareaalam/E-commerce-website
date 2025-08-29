const mongoose = require('mongoose');
const createuser = require('../models/createusermodel');
const jwt = require('jsonwebtoken');

// LOGIN
const Login = async (req, res) => {
    const { emailid, password } = req.body;
    try {
        const user = await createuser.findOne({ emailid });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password", success: false });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid username or password", success: false });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.status(200).json({ message: "Login successful", success: true, data: user, token });
    } catch (error) {
        res.status(500).json({ message: "Server error", success: false, error: error.message });
    }
};


// UPDATE PASSWORD
const updatepassword = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedUser = await createuser.findOneAndUpdate({ _id: id }, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found", success: false });
        } else {
            return res.status(200).json({ message: "Password updated successfully", success: true, data: updatedUser });
        }

    } catch (error) {
        return res.status(500).json({ message: "Server error", success: false, error: error.message });
    }
};

// LOGOUT
const logout = async (req, res) => {
    try {
        return res.status(200).json({ message: "Logout successful", success: true });
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ message: "Server error", success: false, error: error.message });
    }
};

module.exports = { Login, updatepassword, logout };
