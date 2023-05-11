const express = require('express');
const router = express.Router();
const usersController = require('../CONTROLLERS/userController');
const poemController = require('../CONTROLLERS/poemControllers');
const loginController = require('../CONTROLLERS/loginControllers')
const validateUserFields = require('../MIDDLEWARES/user_formValidation.middleware');
const notFound = require('../MIDDLEWARES/user_NotFound.middleware');
const logoutController = require('../CONTROLLERS/logoutController');
const authenticateUser = require('../MIDDLEWARES/authentication_validation.middleware');
const checkAuth = require('../MIDDLEWARES/authorization_validation.middleware');


// session route for login, register and logout
router
.route('/session/login')
.post(loginController.loginAuthenticator);

router
.route('/session/register')
.post(validateUserFields, usersController.createUser);

router
.route('/session/logout')
.post(authenticateUser,logoutController.logoutAuthenticator);

module.exports = router;