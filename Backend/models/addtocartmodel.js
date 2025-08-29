const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addtocartSchema = new Schema({
    userid:{
        type:String,
        required: false,
    },
    productId:{
        type:String,
        required: false,
    },
    productname: {
        type: String,
        required: true,
    },
    productdescription:{
        type:String,
        required: true,
    },
    productprice: {
        type: String,
        required: true,
    },
    productphotourl:{
        type:String,
        required: true
    },
    productsize:{
        type:String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('cart', addtocartSchema);
