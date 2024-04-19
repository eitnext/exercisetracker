const mongoose =  require('mongoose');

const logSchema = new mongoose.Schema({
    
    count: {
        type: Number
    }
     
});


const Log = mongoose.model('Log', logSchema);

module.exports = Log;