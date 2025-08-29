
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { login, updatepassword, logout } = require('../controllers/weblogincontroller');

// login
router.post('/weblogin', login);

// update password
router.put('/weblogin/update/:id', updatepassword);

// logout
router.post('/logout', auth, logout);

module.exports = router;