const User = require('../models/user');

const user_create_post = (req, res) => {

    try{
        validaPayload(req);
    } catch(err){
        console.log(err)
    };

    if(validaPayload(req)){
        const userModel = new User(req.body);

        userModel.save()
            .then(() => {
                res.status(201).json({ response: 'ok' });
            })
            .catch(err => console.log(err));
}
    }

    
    const throwError = (errorMessage) => {
        throw new Error(errorMessage);
    };
    
const validaPayload = (req) => {

    const { name, surname, email, user, password } = req.body;
    const regexName = new RegExp(/^[A-Za-z]+$/);
    const regexPassword = new RegExp(/[A-Z]+[a-z]+[0-9]+[!@#$%^&*]/);
    name.match(regexName) ?? throwError("Name must only contain letters")
    {
        surname.match(regexName) ?? throwError("Surname must only contain letters")
        {
            password.length > 8 ?? throwError("Password must be at least 8 characters long")
            {
                password.match(regexPassword) ?? throwError("Passowrd must contain at least 1 upper case and 1 lower case character, 1 number and 1 special character")
                {
                    return true;
                }
            }
        }
            
        
    }
}

module.exports = {
    user_create_post
}