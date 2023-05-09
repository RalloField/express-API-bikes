const express = require('express');
const router = express.Router();
const usersController = require('../CONTROLLERS/userController');
const loginController = require('../CONTROLLERS/loginControllers')
const validateUserFields = require('../MIDDLEWARES/user_formValidation.middleware');
const notFound = require('../MIDDLEWARES/user_NotFound.middleware');
const logoutController = require('../CONTROLLERS/logoutController');
const authenticateUser = require('../MIDDLEWARES/authentication_validation.middleware');

// show all users -> only for admins?
router
.route('/users')
.get(usersController.getUsers)

//show, update, create and delete -> add middleware so it only becomes available after logging in.
router
.route('/profile/:id')
.get(notFound,usersController.getUser)
.put(authenticateUser,validateUserFields,usersController.updateUser)
.delete(authenticateUser,usersController.deleteUser);


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