const { Categorie } = require('../models/Categorie');

async function displayCategories(req, res) {
    try {

        // Récupérer les catégories
        const categories_list = await Categorie.find();
        console.log(categories_list)
        // Envoyer la liste de categories en tant que réponse JSON
        res.status(200).json({message: 'Catégories envoyé avec succès !', categories_list});
    } catch (erreur) {
        res.status(500).send('Erreur lors de la récupération des catégories');
    }
}

module.exports = {
    displayCategories
};