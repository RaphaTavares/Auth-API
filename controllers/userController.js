const User = require("../models/user");
const bcrypt = require("bcrypt");
const throwError = require('../utils/error');

const user_create_post = (req, res) => {
  try {
    //valida payload
    if (validatePayload(req)) {
        
        const saltRounds = 10;
        const pass = req.body.password;
        bcrypt.genSalt(saltRounds, (err, salt) => {

            bcrypt.hash(pass, salt, (err, hash) => {

                req.body.password = hash;

                const userModel = new User(req.body);

                userModel.save()
                    .then(() => { res.sendStatus(201); })
                    .catch((err) => throwError(err));
            })
        });
    }
  } catch (err) {
    console.log(err);
  }
};

const validatePayload = (req) => {
  const { name, surname, email, user, password } = req.body;
  const regexName = new RegExp(/^[A-Za-z]+$/);
  const regexPassword = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);

  name.match(regexName) ?? throwError("Name must only contain letters");
  surname.match(regexName) ?? throwError("Surname must only contain letters");
  password.match(regexPassword) ??throwError("Passowrd must contain at least 1 upper case, 1 lower case character, 1 number, 1 special character and be at least 8 characters long");
  return true;
};

module.exports = {
  user_create_post,
};
