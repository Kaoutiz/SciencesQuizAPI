const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
    categorie: {
        type: String
    }
});

const Categorie = mongoose.model('Categorie', categorieSchema);

module.exports = {
    Categorie
};