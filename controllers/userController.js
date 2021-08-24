const User = require("../models/user");
const bcrypt = require("bcrypt");

const user_create_post = (req, res) => {
  try {
    //valida payload
    if (validaPayload(req)) {
      //creates has password variables
      const saltRounds = 10;
      const myPass = req.body.password;

      //hash password
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(myPass, salt, (err, hash) => {
          console.log(myPass + " | " + hash);
          console.log(req.body);

          //save data to database
          console.log(typeof hash);
          console.log(typeof req.body.name);
          const userInfo = {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.surname,
            user: req.body.user,
            password: hash,
          };
          const userModel = new User(userInfo);
          userModel
            .save()
            .then(() => {
              res.status(201).json({ response: "ok" });
            })
            .catch((err) => console.log(err));
        });
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const throwError = (errorMessage) => {
  throw new Error(errorMessage);
};

const validaPayload = (req) => {
  const { name, surname, email, user, password } = req.body;
  const regexName = new RegExp(/^[A-Za-z]+$/);
  const regexPassword = new RegExp(/[A-Z]+[a-z]+[0-9]+[!@#$%^&*]/);
  name.match(regexName) ?? throwError("Name must only contain letters");
  {
    surname.match(regexName) ?? throwError("Surname must only contain letters");
    {
      password.length > 8 ??
        throwError("Password must be at least 8 characters long");
      {
        password.match(regexPassword) ??
          throwError(
            "Passowrd must contain at least 1 upper case and 1 lower case character, 1 number and 1 special character"
          );
        {
          return true;
        }
      }
    }
  }
};

module.exports = {
  user_create_post,
};
