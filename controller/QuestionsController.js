const { Question } = require('../models/Question');

let derniereQuestionIndex = -1; // Variable pour stocker l'index de la dernière question sélectionnée

async function recupererQuestions(req, res) {
    try {
        // Récupérer le nombre total de documents dans la collection
        const count = await Question.countDocuments();

        let randomIndex;
        // Si toutes les questions ont déjà été sélectionnées, réinitialiser
        if (count === 1 || count === 0 || derniereQuestionIndex === count - 1) {
            derniereQuestionIndex = -1;
            randomIndex = Math.floor(Math.random() * count);
        } else {
            // Générer un index aléatoire différent de celui de la dernière question sélectionnée
            do {
                randomIndex = Math.floor(Math.random() * count);
            } while (randomIndex === derniereQuestionIndex);
        }

        // Récupérer la question correspondant à l'index généré
        const randomQuestion = await Question.findOne().skip(randomIndex);

        // Mettre à jour l'index de la dernière question sélectionnée
        derniereQuestionIndex = randomIndex;

        res.json(randomQuestion); // Envoyer la question choisie au hasard en tant que réponse JSON
    } catch (erreur) {
        console.error('Erreur lors de la récupération des questions :', erreur);
        res.status(500).send('Erreur lors de la récupération des questions');
    }
}

async function incrementerChoixReponse(req, res) {
    try {
        const questionId = req.params.id; // Récupérer l'ID de la question depuis les paramètres de l'URL
        const reponseNumero = req.params.reponse; // Récupérer le numéro de la réponse depuis les paramètres de l'URL
        
        // Vérifier si la question existe
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question non trouvée' });
        }

        // Vérifier si le numéro de réponse est valide
        const numeroReponse = parseInt(reponseNumero);
        if (numeroReponse < 1 || numeroReponse > 4) {
            return res.status(400).json({ message: 'Numéro de réponse invalide' });
        }

        // Incrémenter le choix de la réponse correspondante
        const reponseField = `reponse${numeroReponse}.choix`;
        await Question.findByIdAndUpdate(questionId, { $inc: { [reponseField]: 1 } });

        res.status(200).json({ message: `Choix de la réponse ${reponseNumero} incrémenté avec succès` });
    } catch (error) {
        console.error('Erreur lors de l\'incrémentation du choix de la réponse :', error);
        res.status(500).json({ message: 'Erreur lors de l\'incrémentation du choix de la réponse' });
    }
}

module.exports = {
    recupererQuestions,
    incrementerChoixReponse
};