const express = require('express');
const router = express.Router();
const { signUpUser, loginUser, getPosts } = require('../controllers/controller');
const { authenticateToken } = require('../middleware/authenticateToken');

router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.get('/posts', authenticateToken, getPosts);


module.exports = router;