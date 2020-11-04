const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    userId: {
        type: String,
        ref: 'User'
    },
    // userId: {
    //     type: String,
    //     ref: 'User'
    // },
    // orderId: {
    //     type: String
    // },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false,
    },
    address: {
        type: String,
        required: true
    },
    deliverStatus: {
        type: Boolean,
        default: false,
    },
    note: {
        type: String
    },
    comment: {
        title: { type: String },
        content: { type: String, default: "" },
        isComment: { type: Number, default: 0 }
      },
    created: {
        type: Date,
        default: Date.now,
        required: true
    },
    totalPrice: {
        type: Number
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    infoPaid: {
        type: String,
    },
});

module.exports = mongoose.model('Order', schema);