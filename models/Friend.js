const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    friendId: {
        type: mongoose.Schema.Types.ObjectId,
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
