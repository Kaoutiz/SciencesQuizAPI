const express = require('express');
const app = express();
const port = 3000;

// Middleware pour le parsing des données JSON
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Autres routes ici...

// Lancement du serveur
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});