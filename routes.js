const express = require('express');
const { registerUser, loginUser } = require('./controller');

const router = express.Router();

// Route POST pour créer un nouvel utilisateur
router.post('/Register', registerUser);

// Route POST pour la connexion de l'utilisateur
router.post('/Login', loginUser);

module.exports = router;