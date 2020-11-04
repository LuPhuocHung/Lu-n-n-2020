const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    books: [{
        bookId: {
            type: String,
            ref: 'Book'
        },
        title: {
            type: String
        },
        price: Number,
        qty: Number,

    }],
    totalPrice: {
        type: Number,
        required: true
    },
    totalQty: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Cart', cartSchema);