const express = require('express');
const router = express.Router();
const adminController = require('../../CONTROLLERS/adminController');
const userController = require('../../CONTROLLERS/userController');
const poemController = require('../../CONTROLLERS/poemControllers');
const validateAdminFields = require('../../MIDDLEWARES/admin_formValidation.middleware');
const notFound = require('../../MIDDLEWARES/admin_NotFound.middleware');
const authenticateAdmin = require('../../MIDDLEWARES/admin_authentication.middleware');
const adminAuth = require('../../MIDDLEWARES/admin_authorization.middleware');


// show all users -> only for admins?
router
.route('/users')
.get(authenticateAdmin,userController.getUsers)


// show all users -> only for admins?
router
.route('/admins')
.get(authenticateAdmin,adminController.getAdmins)
.post(authenticateAdmin,validateAdminFields,adminController.createAdmin);

router
.route('/admins/:id')
.get(notFound,authenticateAdmin,adminAuth,adminController.getAdmin)
.put(notFound,authenticateAdmin,adminAuth,validateAdminFields,adminController.updateAdmin)
.delete(notFound,authenticateAdmin,adminAuth,adminController.deleteAdmin);



module.exports = router;