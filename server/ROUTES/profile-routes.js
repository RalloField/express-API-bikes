const express = require('express');
const router = express.Router();
const usersController = require('../CONTROLLERS/userController');
const bikeController = require('../CONTROLLERS/relationsController');
const relationsController = require('../CONTROLLERS/relationsController');
const validateUserFields = require('../MIDDLEWARES/user_formValidation.middleware');
const notFound = require('../MIDDLEWARES/user_NotFound.middleware');
const authenticateUser = require('../MIDDLEWARES/authentication_validation.middleware');
const checkAuth = require('../MIDDLEWARES/user_authorization.middleware');


//show, update, create and delete -> only after authentication and authorization -> copy to admin folder with admin middlewares
router
.route('/profile/:id')
.get(notFound,authenticateUser,checkAuth,usersController.getUser)
.put(notFound,authenticateUser,checkAuth,validateUserFields,usersController.updateUser)
.delete(notFound,authenticateUser,checkAuth,usersController.deleteUser);

// get posted poems per user ->> in general no authentication needed?

router
.route('/profile/:id/bikes')
.get(notFound,authenticateUser,checkAuth,bikeController.bikeperUser);

// get comments per user ->> in general no authentication needed?
router
.route('/profile/:id/comments')
.get(notFound,authenticateUser,checkAuth,relationsController.commentperUser);

module.exports = router;