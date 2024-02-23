const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    friendId: {
        type: String,
        ref: 'User',
        required: true
    },
    dateAjout: { 
        type: Date, 
        default: 
        Date.now 
    }
});

const Friend = mongoose.model('Friend', friendSchema);

module.exports = {
    Friend
};
