const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    orderId: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['COD', 'UPI', 'CARD', 'NETBANKING'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
    },
    paymentDetails: {
        cardNumber: String,
        upiId: String,
        bankName: String,
        transactionId: String
    },
    amount: {
        type: Number,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
