
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        orderId: { type: String, required: true },
        items: [
            {
                productId: String,
                name: String,
                description: String,
                photo: String,
                quantity: Number,
                price: Number,
                status: { type: String, default: "Ordered" },
            },
        ],
        totalAmount: Number,
        address: {
            name: String,
            mobileno: String,
            pincode: String,
            address: String,
            city: String,
            state: String,
        },
        status: { type: String, default: "Confirmed" },
        deliveryDate: Date,


        payment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
