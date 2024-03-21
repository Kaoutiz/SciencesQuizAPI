const express = require('express');
const { registerUser, loginUser, demanderAmi, changerEtatDemande, updateUserExperience, rechercherUtilisateurParPseudo, displayDemandeAmis, rechercherUtilisateurParID, getAllFriendsByUserId, deleteFriendById, displayTopPlayers } = require('./controller/UsersController');
const { recupererQuestions, incrementerChoixReponse } = require('./controller/QuestionsController');
const { displayCategories } = require('./controller/CategorieController');

const router = express.Router();

// Route POST pour créer un nouvel utilisateur
router.post('/Register', registerUser);

// Route POST pour la connexion de l'utilisateur
router.post('/Login', loginUser);

// Route GET pour la récupération des questions
router.get('/Questions', recupererQuestions);

// Route GET pour la récupération des questions
router.patch('/Questions/:id/:reponse', incrementerChoixReponse);

// Route GET pour afficher les catégories
router.get('/Categories', displayCategories);

// Route POST pour envoyer une demande d'ami
router.post('/Friend', demanderAmi);

// Route POST pour envoyer une demande d'ami
router.patch('/Friend', changerEtatDemande);

// Route DELETE pour supprimer un ami d'un utilisateur via son id
router.delete('/Friend/:userId/:friendId', deleteFriendById);

// Route GET pour récupérer la liste des demande d'ami
router.get('/Friend/:id', displayDemandeAmis);

// Route GET pour afficher les infos d'un utilisateur via son id
router.get('/users', displayTopPlayers);

// Route PATCH pour mettre à jour l'expérience de l'utilisateur
router.patch('/:userId/experience', updateUserExperience);

// Route GET pour afficher les infos d'un utilisateur via son id
router.get('/:id', rechercherUtilisateurParID);

// Route GET pour afficher les infos d'un utilisateur via son pseudo
router.get('/Search/:pseudo', rechercherUtilisateurParPseudo);

// Route GET pour afficher les amis d'un utilisateur via son id
router.get('/Friend/list/:id', getAllFriendsByUserId);

module.exports = router;