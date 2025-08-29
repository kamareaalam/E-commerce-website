const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addnewproductSchema = new Schema({
    productcategory:{
        type:String,
        require:true,
    },
    productname:{
        type:String,
        require:true,
    },
    productprice: {
        type: Number,
        required: true,
    },
    productoriginalprice: {
        type: Number,
        required: true,
    },
    productphotourl:{
        type:String,
        require:true,
    },
    productdescription:{
        type:String,
        require:true,
    },
    productsize:{
        type:String,
        require:true,
    },
    brand: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Boys', 'Girls', 'Kids'],
        required: true
    },
    bundle: {
        type: String,
        enum: ['Bundles', 'Single style'],
        default: 'Single style'
    },
    country: {
        type: String,
        enum: ['India', 'China', 'Saudi Arabia', 'America', 'Other'],
        default: 'India'
    },
}, {timestamps : true});

module.exports = mongoose.model('addnewproduct', addnewproductSchema);