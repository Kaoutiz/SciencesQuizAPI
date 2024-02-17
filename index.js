// index.js
const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./db');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connexion à la base de données
connectDB();

// Utilisation des routes avec le préfixe /api
app.use('/api', routes);

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
