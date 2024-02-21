const bcrypt = require('bcrypt');
const { User } = require('../models/User');

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

module.exports = {
    registerUser
};