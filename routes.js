const express = require('express');
const { registerUser } = require('./controller/registerUserController');
const { loginUser } = require('./controller/loginUserController');
const { recupererQuestions } = require('./controller/recupererQuestionsController');
const { incrementerChoixReponse } = require('./controller/incrementerChoixReponseController');

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