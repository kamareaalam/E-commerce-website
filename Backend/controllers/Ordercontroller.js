const Order = require("../models/ordermodel");


const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("payment");

        res.status(200).json({
            message: "Orders fetched successfully",
            data: orders,
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


const createOrder = async (req, res) => {
    try {
        const { orderId, items, totalAmount, address } = req.body;

        const estimatedDelivery = new Date();
        estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

        const newOrder = new Order({ orderId, items, totalAmount, address, deliveryDate: estimatedDelivery, status: "Confirmed", });

        await newOrder.save();

        res.status(201).json({ message: "Order placed successfully", order: newOrder });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};



const deliverOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        const order = await Order.findById(orderId).populate("payment");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        order.status = "Delivered";

        if (order.payment) {
            if (order.payment.paymentStatus === "Pending") {
                order.payment.paymentStatus = "Paid"; 
                await order.payment.save();
            }
        }

        if (order.paymentMethod === "COD" && order.payment) {
            order.payment.paymentStatus = "Paid";
            await order.payment.save();
        }

        await order.save();

        res.status(200).json({ message: "Order delivered successfully", data: order, });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status: "Cancelled" },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order cancelled", data: updatedOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order deleted successfully", data: deletedOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

 // Replace an item in the order
 const replaceitem = async(req,res)=>{
    try{
        const { itemId } = req.params;
        const { reason } = req.body;

        const order = await Order.findOne({ "items._id": itemId });
        if (!order) return res.status(404).json({ message: "Order not found" });

        const item = order.items.id(itemId);
        item.status = "Replacement Initiated";
        item.replacementReason = reason || "No reason provided";

        await order.save();
        res.status(200).json({ message: "Replacement initiated successfully" });
    }catch(error){
        res.status(500).json({message: error.message});
    }
 }

// Track an item in the order
const trackitem = async (req, res) => {
    try {
        const { itemId } = req.params;

        const order = await Order.findOne({ "items._id": itemId });
        if (!order) return res.status(404).json({ message: "Order not found" });

        const item = order.items.id(itemId);
        const trackingInfo = {
            currentStatus: item.status || "Packed",
            estimatedDelivery: order.deliveryDate || "Not Available"
        };

        res.status(200).json({ trackingInfo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





module.exports = {
    createOrder,
    getAllOrders,
    cancelOrder,
    replaceitem,
    trackitem,
    deleteOrder,
    deliverOrder
};
