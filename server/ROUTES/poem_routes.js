//modules
const express = require('express');
const router = express.Router();
const controllers = require('../CONTROLLERS/poemControllers');
const validatePoemFields = require('../MIDDLEWARES/poem_formValidation.middleware');
const notFound = require('../MIDDLEWARES/poem_NotFound.middleware');
const authenticateUser = require('../MIDDLEWARES/authentication_validation.middleware');
const checkAuth = require('../MIDDLEWARES/poem_authorization_validation.middleware');


//landing page
router.route('/').get((req,res)=>{
    res.send('Hello, fellow poetry lovers. Add a /poems after the URL to start reading, and if your name is Poe watch out for the trees.');
});

//routes for all poems and create
router
.route('/poems')
.get(controllers.getPoems)
.post(authenticateUser,validatePoemFields, controllers.createPoem);

//show, update, delete single poem
router
.route('/poems/:id')
.get(notFound,authenticateUser,checkAuth,controllers.getPoem)
.put(notFound,authenticateUser,checkAuth,validatePoemFields,controllers.updatePoem)
.delete(notFound,authenticateUser,checkAuth, controllers.deletePoem);



module.exports = router;