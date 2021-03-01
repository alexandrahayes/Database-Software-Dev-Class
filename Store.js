//Store items may have many carts that they belong to
const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema(
    {
        itemName: String,
        itemID: String,
        itemQuantity: Number

    })

const StoreModel = mongoose.model('Store', StoreSchema);

module.exports = StoreModel;