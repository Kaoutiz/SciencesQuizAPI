// db.js
const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    pseudo: String,
    password: String
});

const User = mongoose.model('User', userSchema);

const questionSchema = new mongoose.Schema({
    categorie: String,
    question: String,
    reponse1: {
        texte: String,
        choix: Number
    },
    reponse2: {
        texte: String,
        choix: Number
    },
    reponse3: {
        texte: String,
        choix: Number
    },
    reponse4: {
        texte: String,
        choix: Number
    },
    bonne_reponse: String
});

// Modèle pour la collection Question
const Question = mongoose.model('Question', questionSchema);

async function connectDB() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

module.exports = {
    connectDB,
    User,
    Question
};
