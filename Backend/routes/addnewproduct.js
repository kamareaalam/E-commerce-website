const express = require('express');
const {addNewProduct, updateproduct, products, deleteproduct} = require('../controllers/addnewproductcontroller')

const router = express.Router();


// get all product
router.get('/addnewproduct/list', products);

// add nre product
router.post('/addnewproduct', addNewProduct);

//update product
router.put('/addnewproduct/updateproduct/:id', updateproduct);

//delete product
router.delete('/addnewproduct/delete/:id', deleteproduct)

module.exports = router