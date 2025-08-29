const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const wishlistSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    productname: {
        type: String,
        required: true,
    },
    productprice: {
        type: String,
        required: true,
    },
    productphotourl: {
        type: String,
        required: true
    },
    productsize: {
        type: String,
        required: true
    },
    productdescription:{
        type: String,
        require: true
    }
} ,{timestamps: true});

module.exports = mongoose.model('wishlist', wishlistSchema)