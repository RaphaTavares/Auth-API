const User = require('../models/user');
const bcrypt = require('bcrypt');


const auth_post = (req, res) =>{
    try{
        const saltRounds = 10;
        const pass = req.body.password;
        bcrypt.genSalt(saltRounds, (err, salt) =>{
            
            bcrypt.hash(pass, salt, (err, hash) =>{

                req.body.password = hash;

                // const userModel = new User(req.body);
                const userUsername = req.body.user;
                if(User.findOne({user: userUsername}, (err, user) => {
                        console.log('found');
                        res.sendStatus(200);
                    }));
            });
        });

        const userModel = new User(req)


    } catch(err){
        res.sendStatus(404);
        console.log(err);
    }
};

module.exports = {
    auth_post
}