const mongoose = require('mongoose');
const cart = require('../models/addtocartmodel');

// get all addtocart
const getaddtocart = async (req, res) => {
    try {
        const getaddtocart = await cart.find({}).sort({ createdAt: -1 });
        res.json({ addcarts: getaddtocart });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch cart items', error: error.message });
    }
};
// add to cart
const addtocart = async (req, res) => {
    try {
        const { userid, productID } = req.body;

        const existingCartItem = await cart.findOne({ userid, productID });

        if (existingCartItem) {
            existingCartItem.qty += 1;
            await existingCartItem.save();
            return res.status(200).json({ message: 'Product quantity updated successfully', data: existingCartItem });
        } else {
            const newCart = new cart(req.body);
            await newCart.save();
            return res.status(201).json({ message: 'Added to cart successfully', data: newCart });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// update
const updateCart = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await cart.findByIdAndUpdate(id, req.body, { new: true });

        if (!updated) {
            return res.status(404).json({ message: "Not found" });
        }

        res.status(200).json({ message: "Updated successfully", data: updated });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// delete
const deleteCart = async(req,res)=>{
    try{
        const {id}= req.params;
        const deleteCart = await cart.findByIdAndDelete(id);
        if(!deleteCart){
            res.status(404).json({ message: "Not found" });
        }
        res.status(201).json({ message: 'Delete Successfully', data: deleteCart });
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports = { getaddtocart, addtocart, deleteCart, updateCart};
