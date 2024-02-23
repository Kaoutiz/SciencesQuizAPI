const mongoose = require('mongoose');

const friendAskSchema = new mongoose.Schema({
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
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
});

const FriendAsk = mongoose.model('FriendAsk', friendAskSchema);

module.exports = {
    FriendAsk
};
