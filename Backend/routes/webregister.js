const express = require('express');
const {registers, updateregister} = require('../controllers/webregistercontroller');
const auth = require("../middleware/auth");
const router = express.Router();

// create single register
router.post('/register', registers);

// update 
router.put('/register/update/:id', updateregister);

module.exports = router
