const express = require('express');
const router = express.Router();
const { signUpUser, logInUser } = require('../controllers/signup.controller');


router.post('/', signUpUser);
// router.post('/login', logInUser);


module.exports = router;