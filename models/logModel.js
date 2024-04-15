const mongoose =  require('mongoose');

const logSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    count: {
        type: Number
    },
    log: Array
});


const Log = mongoose.model('Log', logSchema);

module.exports = Log;