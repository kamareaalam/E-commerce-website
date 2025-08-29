const mongoose = require('mongoose');
const wishlist = require('../models/addtowishlistmodel');
// const cart = require('../models/addtocartmodel');

// get wishlist

const getWishlist = async (req, res) => {
    try {
        const getWishlist = await wishlist.find({}).sort({ createdAt: -1 });
        res.json({ getWishlist });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch cart items', error: error.message });
    }
};

// add to wishlist
const Wishlist = async (req, res) => {
    try {
        const {
            userId,
            productId,
            productname,
            productprice,
            productphotourl,
            productdescription,
            productsize
        } = req.body;
        console.log("REQ.BODY.PRODUCTSIZE:", req.body.productsize);

        const existingWishlist = await wishlist.findOne({ userId, productId });
        if (existingWishlist) {
            return res.status(409).json({ message: 'Product already in wishlist' });
        }

        const newWishlistItem = new wishlist({
            userId,
            productId,
            productname,
            productprice,
            productphotourl,
            productdescription,
            productsize
        });

        await newWishlistItem.save();

        return res.status(201).json({ message: 'Product added to wishlist', newWishlistItem });

    } catch (error) {
        console.error('Wishlist Error:', error);
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


// remove wishlist
const removeWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const removeWishlist = await wishlist.findByIdAndDelete(id);
        if (!removeWishlist) {
            res.status(404).json({ message: "Not found" });
        }
        res.status(201).json({ message: 'Delete Successfully', data: removeWishlist });
    } catch (error) {
        res.status(500).json({ message: 'server error', error: error.message });
    }
}




module.exports = { getWishlist, Wishlist , removeWishlist}