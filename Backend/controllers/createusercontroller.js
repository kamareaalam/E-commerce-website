const createuser = require('../models/createusermodel')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

// get all createuser
const createusers = async (req, res) =>{
    const createusers = await createuser.find({}).sort({createdAt: -1})

    res.status(200).json(createusers)
}

// create a new createuser
const getcreateuser = async (req, res) => {
    const { fullname, mobileno, emailid, password, dateofbirth, address, pincode, state, city, role, status } = req.body
    let emptyFields = []
    if (!fullname) {
        emptyFields.push('fullname')
    }
    if (!mobileno) {
        emptyFields.push('mobileno')
    }
    if (!emailid) {
        emptyFields.push('emailid')
    }
    if (!password) {
        emptyFields.push('password')
    }
    if (!dateofbirth) {
        emptyFields.push('dateofbirth')
    }
    if (!address) {
        emptyFields.push('address')
    }
    if (!pincode) {
        emptyFields.push('pincode')
    }
    if (!state) {
        emptyFields.push('state')
    }
    if (!city) {
        emptyFields.push('city')
    }
    if (!role) {
        emptyFields.push('role')
    }
    if (!status) {
        emptyFields.push('status')
    }
    try {
    const newuser = createuser({
        fullname, mobileno, emailid, password, dateofbirth, address, pincode, state, city, role, status
    });
    const createnewuser = await newuser.save()
    res.status(201).json(createnewuser)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//update a createuser
const updateCreateuser = async (req, res) => {
    try {
        const { id } = req.params;

        const { fullname, mobileno, emailid,password, dateofbirth, address, pincode, state, city, role, status } = req.body;

        const updatedUser = await createuser.findByIdAndUpdate(id, { fullname, mobileno, emailid, password, dateofbirth, address, pincode, state, city, role, status }, { new: true } );

        if (!updatedUser) {
            res.status(404).json({ message: 'User not found'})
        }
        res.status(201).json({ message: "User updated Succesfully", user: updatedUser })
        } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Delete a createuser
const DeleteCreateuser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await createuser.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not Found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = { createusers, getcreateuser, updateCreateuser, DeleteCreateuser }