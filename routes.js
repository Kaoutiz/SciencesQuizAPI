const express = require('express');
const { registerUser, loginUser, recupererQuestions, incrementerChoixReponse } = require('./controller');

const router = express.Router();

// Route POST pour créer un nouvel utilisateur
router.post('/Register', registerUser);

// Route POST pour la connexion de l'utilisateur
router.post('/Login', loginUser);

// Route GET pour la récupération des questions
router.get('/Questions', recupererQuestions);

// Route GET pour la récupération des questions
router.patch('/Questions/:id/:reponse', incrementerChoixReponse);

module.exports = router;