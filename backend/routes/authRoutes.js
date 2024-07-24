// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);

module.exports = router;