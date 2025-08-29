const express = require('express');
const{getWishlist, Wishlist, removeWishlist} = require('../controllers/addtowishlistcontroller');

const router  = express.Router();

// add to wishlist
router.post('/addwishlist', Wishlist)

router.get('/addwishlist/list/', getWishlist)

router.delete('/addwishlist/remove/:id', removeWishlist)

module.exports = router