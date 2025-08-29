const express = require('express')
const {createOrder, getAllOrders, deleteOrder, cancelOrder, replaceitem, trackitem, deliverOrder } = require('../controllers/Ordercontroller')

const router = express.Router()

// create order
router.post("/order", createOrder);

// order list 
router.get("/order/list", getAllOrders);

// order cancel
router.put("/order/:id", cancelOrder)

// Replace item
router.put("/order/replace/:itemId", replaceitem)

// Track item
router.get("/order/track/:itemId", trackitem)

// delete 
router.delete("/order/:id", deleteOrder)

// delivered order
router.put("/order/deliver/:id", deliverOrder);

module.exports = router
