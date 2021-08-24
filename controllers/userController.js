const User = require('../models/user');

const user_create_post = (req, res) => {

    if(validaPayload(req)){
        const userModel = new User(req.body);

        userModel.save()
            .then(() => {
                res.status(201).json({ response: 'ok' });
            })
            .catch(err => console.log(err));
}
    }

    
const validaPayload = (req) => {
    const reqName = req.body.name;
    const reqSurname = req.body.surname;
    const reqEmail = req.body.email;
    const reqUser = req.body.user;
    //const { password } = req.body;
    const regexName = new RegExp(/^[A-Za-z]+$/);

    if(reqName.match(regexName))
    {
        if(reqSurname.match(regexName)){
            if(password.length >= 6){
                return true;
            }
        }
    }
}

module.exports = {
    user_create_post
}