const mongoose= require('mongoose');
const AddNewProduct = require('../models/addnewproductmodel');


// get all product 
const products = async(req, res)=>{
    const products = await AddNewProduct.find({}).sort({createdAt: -1})

    res.status(200).json(products)
}

// add new product
const addNewProduct = async (req, res) => {
    try {
        const { productprice, productoriginalprice, ...rest } = req.body;

        const price = Number(productprice);
        const original = Number(productoriginalprice);

        let discount = 0;
        if (original > 0) {
            discount = Math.round(((original - price) / original) * 100);
        }

        const newProduct = new AddNewProduct({
            productprice: price,
            productoriginalprice: original,
            discount,
            ...rest,
        });

        await newProduct.save();

        res.status(201).json({
            message: 'Product added successfully',
            data: newProduct,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



//update product
const updateproduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updateproduct = await AddNewProduct.findByIdAndUpdate(id, updateData, { new: true });

        if (!updateproduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', data: updateproduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// dalete product
const deleteproduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await AddNewProduct.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ message: 'Product deleted successfully', data: deletedProduct });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = {addNewProduct, updateproduct, products, deleteproduct}
