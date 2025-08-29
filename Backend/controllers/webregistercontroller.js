const mongoose = require('mongoose');
const Register = require("../models/webregistermodel")
 

// create register
const registers = async (req, res) => {
    try {
        const register = new Register(req.body);
        await register.save();
        res.status(201).json({ message: 'User registered successfully', data: register });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// update register
const updateregister = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body

        const updatedUser = await Register.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "Register not found" });
        }
        res.status(200).json({ message: "Register updated successfully", data: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {registers, updateregister};
