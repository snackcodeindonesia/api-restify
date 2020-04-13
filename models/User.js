const mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        max: 255,
        min: 3
    },
    email: {
        type: String,
        require: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        require: true,
        max: 255,
        min: 6
    },
    is_active: {
        type: Boolean,
        default: 'false'
    },
    createdAt: {
        type: Date,
        require: true
    },
    updatedAt: {
        type: Date,
        require: true
    },
    deletedAt: {
        type: Date,
        require: true
    }
});

module.exports = mongoose.model('Users', usersSchema);