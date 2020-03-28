// Setting up routers

const express = require('express');

const router = express.Router();

// Importing  home controller
const homeController = require('../controllers/home_controller');

console.log('router loaded');

//Accessing home controller
router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));


router.use('/api', require('./api'));
//for any further routes, access from here
// router.use('/routerName', require('./routerfile'));

// router.use('/login', require('./login'));        ////// localhost:port/login/signup

module.exports = router;