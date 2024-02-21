const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    pseudo: String,
    password: String,
    experience: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};
