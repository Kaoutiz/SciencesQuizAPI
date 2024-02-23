const express = require('express');
const { registerUser, loginUser, demanderAmi, changerEtatDemande, updateUserExperience, rechercherUtilisateurParPseudo } = require('./controller/UsersController');
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

// Route PATCH pour mettre à jour l'expérience de l'utilisateur
router.patch('/:userId/experience', updateUserExperience);

// Route GET pour afficher les infos d'un utilisateur via son pseudo
router.get('/:pseudo', rechercherUtilisateurParPseudo);

module.exports = router;