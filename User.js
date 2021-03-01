//User has one cart in this scenario
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        cartID: String,
        password: String

    })

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;