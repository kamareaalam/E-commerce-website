const express = require('express');
const router = express.Router();


const { product } = require("../controllers/productdetailscontroller");

router.get("/productdetails/:id", product);

module.exports = router;
