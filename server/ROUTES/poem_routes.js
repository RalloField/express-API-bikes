//modules
const express = require('express');
const router = express.Router();
const controllers = require('../CONTROLLERS/poemControllers');
const relationsController = require('../CONTROLLERS/relationsController')
const validatePoemFields = require('../MIDDLEWARES/poem_formValidation.middleware');
const notFound = require('../MIDDLEWARES/poem_NotFound.middleware');
const authenticateUser = require('../MIDDLEWARES/authentication_validation.middleware');
const checkAuth = require('../MIDDLEWARES/poem_authorization_validation.middleware');
const validateCommentFields = require('../MIDDLEWARES/comment_formValidation.middleware');
const commentController = require('../CONTROLLERS/commentController');


//landing page
router.route('/').get((req,res)=>{
    res.send('Hello, fellow poetry lovers. Add a /poems after the URL to start reading, and if your name is Poe watch out for the trees.');
});

//routes for all poems and create poem
router
.route('/poems')
.get(controllers.getPoems)
.post(authenticateUser,validatePoemFields, controllers.createPoem);

//show, update, delete single poem -> needs authentication and authorization

router
.route('/poems/:id')
.get(notFound,controllers.getPoem)
.put(notFound,authenticateUser,checkAuth,validatePoemFields,controllers.updatePoem)
.delete(notFound,authenticateUser,checkAuth, controllers.deletePoem);


//getting comments per poem and posting a comment on the poem
router
.route('/poems/:id/comments')
.get(relationsController.commentsperPoem)
.post(authenticateUser,validateCommentFields,commentController.createComment);


module.exports = router;