const express = require('express');
const router = express.Router();
const usersController = require('../CONTROLLERS/userController');
const poemController = require('../CONTROLLERS/relationsController');
const relationsController = require('../CONTROLLERS/relationsController');
const validateUserFields = require('../MIDDLEWARES/user_formValidation.middleware');
const notFound = require('../MIDDLEWARES/user_NotFound.middleware');
const authenticateUser = require('../MIDDLEWARES/authentication_validation.middleware');
const checkAuth = require('../MIDDLEWARES/user_authorization.middleware');

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


router
.route('/profile/:id/poems')
.get(notFound,authenticateUser,checkAuth,poemController.poemperUser);


router
.route('/profile/:id/comments')
.get(notFound,authenticateUser,checkAuth,relationsController.commentperUser);

module.exports = router;