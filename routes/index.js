// Setting up routers

const express = require('express');

const router = express.Router();

// Importing  home controller
const homeController = require('../controllers/home_controller');

console.log('router loaded');

//Accessing home controller
router.get('/', homeController.home);

module.exports = router;