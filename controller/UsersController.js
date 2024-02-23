const bcrypt = require('bcrypt');
const { User } = require('../models/User');
const { FriendAsk } = require('../models/FriendAsk');
const { Friend } = require('../models/Friend');

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

async function demanderAmi(req, res) {
    try {
        const { userId, friendId } = req.body;

        // Vérifier si les utilisateurs sont déjà amis dans la collection "friends"
        const existingFriendship = await Friend.findOne({
            $or: [
                { userId, friendId },
                { userId: friendId, friendId: userId }
            ]
        });

        if (existingFriendship) {
            return res.status(401).json({ message: 'Vous êtes déjà amis avec cet utilisateur' });
        }

        // Vérifier si une demande existe déjà de l'utilisateur A vers l'utilisateur B
        const existingRequestToFriend = await FriendAsk.findOne({ userId, friendId });
        if (existingRequestToFriend) {
            return res.status(402).json({ message: 'Vous avez déjà une demande d\'ami en attente pour cet utilisateur' });
        }

        // Vérifier si une demande existe déjà de l'utilisateur B vers l'utilisateur A
        const existingRequestFromFriend = await FriendAsk.findOne({ userId: friendId, friendId: userId });
        if (existingRequestFromFriend) {
            return res.status(403).json({ message: 'Vous avez déjà envoyé une demande d\'ami à cet utilisateur' });
        }

        // Créer une nouvelle demande d'ami
        const friendRequest = new FriendAsk({ userId: friendId, friendId: userId });
        await friendRequest.save();

        res.status(200).json({ message: 'Demande d\'ami envoyée avec succès', friendRequest });
    } catch (error) {
        console.error('Erreur lors de la demande d\'ami :', error);
        res.status(500).json({ message: 'Erreur lors de la demande d\'ami', error: error.message });
    }
}


async function changerEtatDemande(req, res) {
    try {
        const { userId, friendId, nouvelEtat } = req.body;

        // Vérifier si la demande existe
        const demandeExistante = await FriendAsk.findOne({ userId, friendId });
        if (!demandeExistante) {
            return res.status(404).json({ message: 'Demande d\'ami non trouvée' });
        }

        // Modifier l'état de la demande
        demandeExistante.status = nouvelEtat;
        await demandeExistante.save();

        // Si la demande est acceptée, créer une entrée dans la collection des amis
        if (nouvelEtat === 'accepted') {
            const nouvelAmi = new Friend({ userId, friendId });
            await nouvelAmi.save();
        }

        res.status(200).json({ message: 'État de la demande d\'ami modifié avec succès', demande: demandeExistante });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la modification de l\'état de la demande d\'ami', error: error.message });
    }
}

async function updateUserExperience(req, res) {
    try {
        const { userId } = req.params;
        const { experience } = req.body;

        // Rechercher l'utilisateur par ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Mettre à jour l'expérience de l'utilisateur
        user.experience = experience;
        await user.save();

        res.status(200).json({ message: 'Expérience de l\'utilisateur mise à jour avec succès', user });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'expérience de l\'utilisateur', error: error.message });
    }
}

async function rechercherUtilisateurParPseudo(req, res) {
    try {
        const { pseudo } = req.params;

        // Recherche des utilisateurs par pseudo (cas insensible à la casse)
        const utilisateurs = await User.find({ pseudo: { $regex: new RegExp(pseudo, "i") } });

        if (utilisateurs.length === 0) {
            return res.status(404).json({ message: 'Aucun utilisateur trouvé avec ce pseudo' });
        }

        res.status(200).json({ utilisateurs });
    } catch (error) {
        console.error('Erreur lors de la recherche d\'utilisateur par pseudo :', error);
        res.status(500).json({ message: 'Erreur lors de la recherche d\'utilisateur par pseudo', error: error.message });
    }
}

module.exports = {
    registerUser,
    loginUser,
    demanderAmi,
    changerEtatDemande,
    updateUserExperience,
    rechercherUtilisateurParPseudo
};