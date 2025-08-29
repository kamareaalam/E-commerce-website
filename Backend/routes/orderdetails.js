const express = require("express");
const router = express.Router();

const { Orderdetails } = require("../controllers/orderdetailcontroller");

router.get("/orderdetails/:orderId", Orderdetails);

module.exports = router;
