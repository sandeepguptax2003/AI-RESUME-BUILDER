const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const auth = require('../middleware/auth');

// Route for user registration
router.post('/register', register);

//Route for user login
router.post('/login', login);

//Route for user logout
router.post('/logout', auth, logout);

module.exports = router;