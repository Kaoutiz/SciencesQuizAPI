const express = require('express');
const { createUser } = require('./controller');

const router = express.Router();

// Route POST pour créer un nouvel utilisateur
router.post('/CreateUser', createUser);

module.exports = router;