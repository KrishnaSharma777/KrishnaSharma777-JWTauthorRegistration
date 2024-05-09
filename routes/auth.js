const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

// Apply express.urlencoded middleware for parsing form data
router.use(express.urlencoded({ extended: false }));

router.post('/register', authController.register);

module.exports = router;