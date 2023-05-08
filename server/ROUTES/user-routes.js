const express = require('express');
const router = express.Router();
const usersController = require('../CONTROLLERS/userController');
const validateUserFields = require('../MIDDLEWARES/form_validation.middlewares');
const notFound = require('../MIDDLEWARES/form_validation.middlewares');

// show all users -> only for admins?
router
.route('/user')
.get(usersController.getUsers)
.post(validateUserFields, usersController.createUser);

//show, update, create and delete -> add middleware so it only becomes available after logging in.
router
.route('/user/:id')
.get(usersController.getUser)
.put(validateUserFields,usersController.updateUser)
.delete(usersController.deleteUser);

router.use((req, res, next) => {
res.status(404).send('404 - Page not found <br> Lo siento esta pagina no existe! ');
});

module.exports = router;