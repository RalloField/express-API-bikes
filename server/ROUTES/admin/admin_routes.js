const express = require('express');
const router = express.Router();
const adminController = require('../../CONTROLLERS/adminController');
const userController = require('../../CONTROLLERS/userController');
const poemController = require('../../CONTROLLERS/poemControllers');
const validateAdminFields = require('../../MIDDLEWARES/admin_formValidation.middleware');
const notFound = require('../../MIDDLEWARES/admin_NotFound.middleware');
const authenticateAdmin = require('../../MIDDLEWARES/admin_authentication.middleware');
const checkAuth = require('../../MIDDLEWARES/admin_authorization.middleware');


// show all users -> only for admins?
router
.route('/users')
.get(authenticateAdmin,userController.getUsers)


// show all users -> only for admins?
router
.route('/admins')
.get(notFound,adminController.getAdmins)
.post(validateAdminFields,adminController.createAdmin);

router
.route('/admins/:id')
.get(notFound,adminController.getAdmin)
.put(notFound,validateAdminFields,adminController.updateAdmin)
.delete(notFound,adminController.deleteAdmin);



module.exports = router;