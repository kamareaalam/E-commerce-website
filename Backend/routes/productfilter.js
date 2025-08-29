const express = require('express');
const router = express.Router();
const { filterProducts } = require('../controllers/productfiltercontroller');

router.get('/productfilter', filterProducts);

module.exports = router;