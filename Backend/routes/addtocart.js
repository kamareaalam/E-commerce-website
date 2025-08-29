const express = require('express')
const {addtocart, getaddtocart, deleteCart, updateCart} = require('../controllers/addtocartcontroller')

const router = express.Router();

// get add to cart
 router.get('/add/list', getaddtocart)
 
// add to cart
router.post('/add', addtocart);
// delete
router.delete('/add/delete/:id', deleteCart)
//update
router.put('/add/list/:id', updateCart)

module.exports = router