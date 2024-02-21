const express = require('express');
const { registerUser, loginUser, demanderAmi, changerEtatDemande, updateUserExperience } = require('./controller/UsersController');
const { recupererQuestions, incrementerChoixReponse } = require('./controller/QuestionsController');

const router = express.Router();

// Route POST pour créer un nouvel utilisateur
router.post('/Register', registerUser);

// Route POST pour la connexion de l'utilisateur
router.post('/Login', loginUser);

// Route GET pour la récupération des questions
router.get('/Questions', recupererQuestions);

// Route GET pour la récupération des questions
router.patch('/Questions/:id/:reponse', incrementerChoixReponse);

// Route POST pour envoyer une demande d'ami
router.post('/Friend', demanderAmi);

// Route POST pour envoyer une demande d'ami
router.patch('/Friend', changerEtatDemande);

// Route PATCH pour mettre à jour l'expérience de l'utilisateur
router.patch('/:userId/experience', updateUserExperience);

module.exports = router;