const mongoose =  require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username cannot be empty'],
        unique: true
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;