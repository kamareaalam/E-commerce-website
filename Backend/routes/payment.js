const express = require('express');
const { createPayment, getAllPayments, getPaymentById, updatePaymentStatus} = require('../controllers/paymentcontroller');

const router = express.Router();

// Create new payment
router.post('/payment', createPayment);

// Get all payments
router.get('/payment/list', getAllPayments);

// Get payment by ID
router.get('/payment/:id', getPaymentById);

// Update payment status
router.put('/payment/status/:id', updatePaymentStatus);

module.exports = router;
