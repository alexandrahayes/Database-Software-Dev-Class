const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.ObjectId,
            ref: 'User'
        },
        cartItems: {
            type: mongoose.ObjectId,
            ref: 'Store'
        },


    })

const CartModel = mongoose.model('Cart', CartSchema);

module.exports = CartModel;