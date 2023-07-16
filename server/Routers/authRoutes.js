const express = require('express');

const router = express.Router();

const authController = require('../Controllers/authController');


router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)
router.get('/account/:id', authController.userSocialMediaAccount)



module.exports = router;
