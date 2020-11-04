const express = require('express');
const router = express.Router();
const cartController = require('./../controllers/carts');
// authentication
router.use((req, res, next) => {
    next();
});

router.get('/add/:bookId', cartController.addBookToCart);

router.get('/reduce/:bookId', cartController.reduceBookInCart );

router.get('/remove/:bookId', cartController.removeBookInCart);

router.get('/shoppingcart', cartController.getListBookInCart);


router.post('/checkout', cartController.createOrder);


module.exports = router;