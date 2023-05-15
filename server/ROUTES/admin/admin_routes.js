const express = require('express');
const router = express.Router();
const adminController = require('../../CONTROLLERS/adminController');
const userController = require('../../CONTROLLERS/userController');
const commentController = require('../../CONTROLLERS/commentController');
const bikeController = require('../../CONTROLLERS/bikesControllers');
const validateBikeFields = require('../../MIDDLEWARES/bike_formValidation.middleware');
const validateUserFields = require('../../MIDDLEWARES/user_formValidation.middleware');
const validateCommentFields = require('../../MIDDLEWARES/comment_formValidation.middleware');
const commentNotFound = require('../../MIDDLEWARES/comment_NotFound.middleware');
const userNotFound = require('../../MIDDLEWARES/user_NotFound.middleware');
const bikeNotFound = require('../../MIDDLEWARES/bike_NotFound.middleware');
const validateAdminFields = require('../../MIDDLEWARES/admin_formValidation.middleware');
const adminNotFound = require('../../MIDDLEWARES/admin_NotFound.middleware');
const authenticateAdmin = require('../../MIDDLEWARES/admin_authentication.middleware');
const adminAuth = require('../../MIDDLEWARES/admin_authorization.middleware');


// show all users -> only for admins?
router
.route('/users')
.get(authenticateAdmin,userController.getUsers)


// show all admins -> only and admin can make another admin
router
.route('/admins')
.get(authenticateAdmin,adminController.getAdmins)
.post(authenticateAdmin,validateAdminFields,adminController.createAdmin);

//admin routes to manage your own admin account

router
.route('/admins/dashboard/:id')
.get(adminNotFound,authenticateAdmin,adminAuth,adminController.getAdmin)
.put(adminNotFound,authenticateAdmin,adminAuth,validateAdminFields,adminController.updateAdmin)
.delete(adminNotFound,authenticateAdmin,adminAuth,adminController.deleteAdmin);


//admin routes to manage the users

router
.route('/admins/users')
.get(authenticateAdmin,userController.getUsers)
.post(authenticateAdmin,validateUserFields,userController.createUser);

router
.route('/admins/users/:id')
.get(userNotFound,authenticateAdmin,userController.getUser)
.put(userNotFound,authenticateAdmin,userController.updateUser)
.delete(userNotFound,authenticateAdmin,userController.deleteUser);

//admin routes to manage the poems

router
.route('/admins/bikes')
.get(authenticateAdmin,bikeController.getBikes)
.post(authenticateAdmin,validateBikeFields,bikeController.createBike);

router
.route('/admins/bikes/:id')
.get(authenticateAdmin,bikeNotFound,bikeController.getBike)
.put(authenticateAdmin,bikeNotFound,validateBikeFields,bikeController.updateBike)
.delete(authenticateAdmin,bikeNotFound,bikeController.deleteBike);

//admin routes to manage the comments

router
.route('/admins/comments')
.get(authenticateAdmin,commentController.getComments)
.post(authenticateAdmin,validateCommentFields,commentController.createComment);

router
.route('/admins/comments/:id')
.get(authenticateAdmin,commentNotFound,commentController.getComment)
.put(authenticateAdmin,commentNotFound,validateCommentFields,commentController.updateComment)
.delete(authenticateAdmin,commentNotFound,commentController.deleteComment);

module.exports = router;