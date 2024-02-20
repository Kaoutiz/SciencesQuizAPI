// db.js
const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

const userSchema = new mongoose.Schema({
    pseudo: String,
    password: String
});

const User = mongoose.model('User', userSchema);

module.exports = {
    connectDB,
    User
};
