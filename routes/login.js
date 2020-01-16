const express = require('express');

const router = express.Router();

const loginController = require('../controllers/signup_controller');

router.get('/signup', loginController.signup);

module.exports = router;