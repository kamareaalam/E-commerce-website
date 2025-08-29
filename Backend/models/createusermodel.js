
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CreateUserSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    mobileno: {
        type: Number,
        required: true,
    },
    emailid: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    dateofbirth: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('createuser', CreateUserSchema);
