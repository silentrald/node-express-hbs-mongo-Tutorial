const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String,
        maxlength: 30,
        required: true,
        uniqure: true
    },
    password: {
        type: String,
        minlength: 60,
        maxlength: 60,
        required: true
    }
});

module.exports = mongoose.model('User', User);