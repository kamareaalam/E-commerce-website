const express = require('express')
const {Login, updatepassword, logout} = require('../controllers/userlogincontrollers')
const auth = require('../middleware/auth');

const router = express.Router()

// loginuser
router.post('/userlogin', Login)

// update password
router.put('/userlogin/update/:id', updatepassword)

// logout
router.put('/logout', logout)

module.exports = router