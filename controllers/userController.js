const User = require('../models/userModel');

exports.createUser = async (req, res) => {
    try {
        const {username} = req.body;
        if(!username){
            return res.status(401).json({
                status: 'fail',
                message: 'username cannot be empty 🚫'
            })
        }
        const newUser = await User({username});
        newUser.save();

        res.status(200).json({
            username,
            _id: newUser.id,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error.message,
            error
        })
        
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json([...users])
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error.message,
            error
        })
    }
};