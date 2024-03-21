const { Categorie } = require('../models/Categorie');

async function displayCategories(req, res) {
    try {

        // Récupérer les catégories
        const categories_list = await Categorie.find();
        res.status(200).json({message: 'Catégories envoyé avec succès !', categories_list});
    } catch (erreur) {
        res.status(500).send('Erreur lors de la récupération des catégories');
    }
}

module.exports = {
    displayCategories
};