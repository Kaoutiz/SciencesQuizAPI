// controller.js
const bcrypt = require('bcrypt');
const { User } = require('./db');

async function createUser(req, res) {
    try {
        const { email, password } = req.body;

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur avec le mot de passe hashé
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        
        res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error: error.message });
    }
}

module.exports = {
    createUser
};
