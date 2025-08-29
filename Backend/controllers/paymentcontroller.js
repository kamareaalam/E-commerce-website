const Payment = require('../models/paymentmodel');
const Order = require("../models/ordermodel");

// Get all payments
const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create new payment
const createPayment = async (req, res) => {
    try {
        const { orderId, paymentMethod, paymentDetails, amount } = req.body;
        // Default status
        // let paymentStatus = "Paid";
        // Agar COD hai to Pending rakho
        if (paymentMethod === "COD") {
            paymentStatus = "Pending";
        }

        const newPayment = new Payment({
            orderId,
            paymentMethod,
            paymentStatus,
            paymentDetails,
            amount,
        });

        await newPayment.save();

        await Order.findByIdAndUpdate(orderId, { payment: newPayment._id });

        res.status(201).json({
            message: "Payment Successful",
            data: newPayment,
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};




// Get payment by ID
const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) return res.status(404).json({ message: 'Payment not found' });
        res.json(payment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update payment status
const updatePaymentStatus = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, { paymentStatus: req.body.paymentStatus }, { new: true });

        if (!payment) return res.status(404).json({ message: 'Payment not found' });
        res.json({ message: 'Payment status updated', data: payment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createPayment, getAllPayments, getPaymentById, updatePaymentStatus, };
