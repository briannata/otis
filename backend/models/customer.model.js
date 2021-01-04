const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    phone: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
        minlength: 10
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;