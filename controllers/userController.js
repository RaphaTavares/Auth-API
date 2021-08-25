const User = require("../models/user");
const bcrypt = require("bcrypt");
const throwError = require('../utils/error');

const user_create_post = (req, res) => {
  try {
    //valida payload
    if (validaPayload(req)) {
        console.log("ola");
      //creates hash password variables
      const saltRounds = 10;
      const myPass = req.body.password;

      //hash password
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(myPass, salt, (err, hash) => {
          req.body.password = hash;

          const userModel = new User(req.body);
          console.log(userModel.name);

          userModel.save()
            .then(() => {
              res.sendStatus(201);
            })
            .catch((err) => console.log(err));
        });
      });
    }
  } catch (err) {
    console.log(err);
  }
};


const validaPayload = (req) => {
  const { name, surname, email, user, password } = req.body;
  const regexName = new RegExp(/^[A-Za-z]+$/);
  const regexPassword = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);

  name.match(regexName) ?? throwError("Name must only contain letters");
  surname.match(regexName) ?? throwError("Surname must only contain letters");
  password.length > 8 ?? throwError("Password must be at least 8 characters long");
  password.match(regexPassword) ??throwError("Passowrd must contain at least 1 upper case and 1 lower case character, 1 number and 1 special character");
  return true;
};

module.exports = {
  user_create_post,
};
