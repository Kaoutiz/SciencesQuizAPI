// controller.js
const bcrypt = require('bcrypt');
const { User, Question } = require('./db');

async function registerUser(req, res) {
    try {
        const { pseudo, password } = req.body;

        const existingUser = await User.findOne({ pseudo });
        if (existingUser) {
            return res.status(400).json({ message: 'Ce pseudo est déjà utilisé' });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur avec le mot de passe hashé
        const newUser = new User({ pseudo, password: hashedPassword });
        await newUser.save();
        
        res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error: error.message });
    }
}

async function loginUser(req, res) {
    try {
        const { pseudo, password } = req.body;

        // Recherche de l'utilisateur par pseudo
        const user = await User.findOne({ pseudo });

        // Vérification si l'utilisateur existe
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Vérification du mot de passe
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        res.status(200).json({ message: 'Connexion réussie', user });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la connexion', error: error.message });
    }
}

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
    registerUser,
    loginUser,
    recupererQuestions
};
