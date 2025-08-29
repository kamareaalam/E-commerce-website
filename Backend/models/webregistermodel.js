const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RegisterSchema = new Schema({
    fullname:{
        type: String,
        require:true,
    },
    mobileno:{
        type:Number,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    dob:{
        type:String,
        require:true,
    },
    pincode:{
        type:String,
        require:false,
    },
    address:{
        type:String,
        require:true,
    },
    city:{
        type:String,
        require:true,
    },
    state:{
        type:String,
        require:true,
    },
    isLoggedIn:{ 
        type: Boolean,
        default: false,
    }
}, {timestamps: true});

module.exports = mongoose.model('Register', RegisterSchema)