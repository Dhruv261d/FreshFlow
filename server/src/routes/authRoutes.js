const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// This maps to POST http://10.0.2.2:5000/api/auth/register
router.post('/register', authController.register);

// This maps to POST http://10.0.2.2:5000/api/auth/login
router.post('/login', authController.login);

module.exports = router;