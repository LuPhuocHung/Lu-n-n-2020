const Cart = require('./../models/cart1');
const Book = require('./../models/book');
const Order = require('./../models/order');

module.exports = {

    // add A book in Cart
    addBookToCart:  (req, res, next) => {
        const bookId = req.params.bookId;
        const cart = new Cart(req.session.cart ? req.session.cart : {});
    
        Book.findById(bookId, function (err, book) {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            }
            cart.add(book, book.id);
            req.session.cart = cart;
            console.log(req.session.cart);
            res.status(200).json({
                message: 'Add to cart successfully '
            });
        });
    },


    // Reduce a book in Cart 
    reduceBookInCart:  (req, res, next) => {
        const bookId = req.params.bookId;
        const cart = new Cart(req.session.cart ? req.session.cart : {});
    
        cart.reduceByOne(bookId);
        req.session.cart = cart;
        res.status(200).json({
            message: ' successfully'
        });
    },

    // Remove A book in Cart
    removeBookInCart:  (req, res, next) => {
        const bookId = req.params.bookId;
        const cart = new Cart(req.session.cart ? req.session.cart : {});
    
        cart.removeItem(bookId);
        req.session.cart = cart;
        res.status(200).json({
            message: ' successfully'
        });
    },

    // Show List Book in Cart
    getListBookInCart:  (req, res, next) => {
        if (!req.session.cart) {
            return res.status(400).json({
                message: 'Cart Null'
            });
        }
        const cart = new Cart(req.session.cart);
        res.status(200).json(
            cart.generateArray()     
        );
    },

    // Checkout and Create Order
    createOrder:  (req, res, next) => {
        if (!req.session.cart) {
          res.status(400).json({
              message:'cart null'
          });
        }
        const cart = new Cart(req.session.cart);
        const totalPrice = cart.totalPrice ;
        const order = new Order({
                email: req.body.email,
                cart: cart,
                phone: req.body.phone,
                address: req.body.address,
                name: req.body.name,
            });
            order.save(function (err, result) {
                if(err)
                {
                    res.status(500).json({
                        error:err
                    });
                }else{
                   // req.session.cart = null;
                    res.status(200).json({
                        totalPrice: totalPrice,
                        message: 'Successfully bought book!'
                    });
                }
            });
        }
}