const express = require('express');
const router = express.Router();
const adminController = require('../../CONTROLLERS/adminController');
const poemController = require('../../CONTROLLERS/relationsController');
const validateAdminFields = require('../../MIDDLEWARES/admin_formValidation.middleware');
const notFound = require('../../MIDDLEWARES/admin_NotFound.middleware');
const authenticateUser = require('../../MIDDLEWARES/authentication_validation.middleware');
const checkAuth = require('../../MIDDLEWARES/user_authorization.middleware');

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