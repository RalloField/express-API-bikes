const express = require('express');
const router = express.Router();
const usersController = require('../CONTROLLERS/userController');
const loginController = require('../CONTROLLERS/loginControllers')
const validateUserFields = require('../MIDDLEWARES/user_formValidation.middleware');
const notFound = require('../MIDDLEWARES/user_NotFound.middleware');
const logoutController = require('../CONTROLLERS/logoutController');
const authenticateUser = require('../MIDDLEWARES/authentication_validation.middleware');
const checkAuth = require('../MIDDLEWARES/authorization_validation.middleware');

// show all users -> only for admins?
router
.route('/users')
.get(authenticateUser,usersController.getUsers)

//show, update, create and delete -> add middleware so it only becomes available after logging in.
router
.route('/profile/:id')
.get(notFound,authenticateUser,checkAuth,usersController.getUser)
.put(notFound,authenticateUser,checkAuth,validateUserFields,usersController.updateUser)
.delete(notFound,authenticateUser,checkAuth,usersController.deleteUser);


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