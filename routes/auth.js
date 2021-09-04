const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup_post);

//router.post('/', authController.login_post);

//router.post('/', authController.logout_post);

module.exports = router;