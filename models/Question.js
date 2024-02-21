const mongoose = require('mongoose');

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

module.exports = {
    Question
};
