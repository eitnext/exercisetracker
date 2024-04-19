const mongoose =  require('mongoose');

const userSchema = new mongoose.Schema({

    exerciseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise'
    },
    
    username: {
        type: String,
        required: [true, 'username cannot be empty'],
        unique: true
    },

    logID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Log'
    },
    log: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise'
    }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;