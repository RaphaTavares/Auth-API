const User = require('../models/user');

const user_create_post = (req, res) => {
    const userModel = new User(req.body);

    userModel.save()
        .then(() => {
            res.status(201).json({ response: 'ok' });
        })
        .catch(err => console.log(err));
}

module.exports = {
    user_create_post
}