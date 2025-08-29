const Order = require("../models/ordermodel");

const Orderdetails = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json({ order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { Orderdetails };
