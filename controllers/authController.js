const User = require('../models/user');
const bcrypt = require('bcrypt');
const maxAge = 3 * 24 * 60 * 60;
const { jwtSecret } = require('../utils/config');
const jwt = require('jsonwebtoken');

const handleErrors = err => {
    console.log(err.message, err.code);
    let errors = { name: '', surname: '', email: '', user: '', password: ''}
}

const createToken = id => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: maxAge
    });
}

const login_post = async (req, res) =>{
    const { username, password } = req.body;

    try{
        const user = await User.login(username, password);

        const token = createToken(user._id);
        res.status(200).json({jwt: token});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors})
    }
};

const signup_post = async (req, res) =>{
    try{

        const user = await User.create(req.body);
        const token = createToken(user._id);
        console.log("token:" + token);
        res.status(201).json({jwt: token});

    } catch(err){
        //const errors = handleErrors(err);
        console.log("ERROR MESSAGE: " + err.message)
        res.sendStatus(400);
    }
};

module.exports = {
    signup_post,
    login_post
}