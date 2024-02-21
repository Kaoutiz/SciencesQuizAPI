const { Question } = require('../models/Question');

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
    incrementerChoixReponse
};
