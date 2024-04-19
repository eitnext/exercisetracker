 const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
   userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
   },
    
   
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: String
    }
})

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;