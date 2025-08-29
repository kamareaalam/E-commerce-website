const AddNewProduct = require("../models/addnewproductmodel");

const product = async (req, res) => {
    try {
        const product = await AddNewProduct.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { product };

