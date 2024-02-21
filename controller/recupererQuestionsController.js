const { Question } = require('../models/Question');

// Fonction pour gérer une requête pour récupérer les questions
async function recupererQuestions(req, res) {
    try {
        // Récupérer toutes les questions de la collection
        const questions = await Question.find();
        res.json(questions); // Envoyer les questions en tant que réponse JSON
    } catch (erreur) {
        console.error('Erreur lors de la récupération des questions :', erreur);
        res.status(500).send('Erreur lors de la récupération des questions');
    }
}

module.exports = {
    recupererQuestions
};