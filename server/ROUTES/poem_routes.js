//modules
const express = require('express');
const router = express.Router();
const bikeControllers = require('../CONTROLLERS/bikesControllers');
const relationsController = require('../CONTROLLERS/relationsController')
const validateBikeFields = require('../MIDDLEWARES/bike_formValidation.middleware');
const notFound = require('../MIDDLEWARES/bike_NotFound.middleware');
const authenticateUser = require('../MIDDLEWARES/authentication_validation.middleware');
const checkAuth = require('../MIDDLEWARES/bike_authorization_validation.middleware');
const validateCommentFields = require('../MIDDLEWARES/comment_formValidation.middleware');
const commentController = require('../CONTROLLERS/commentController');


//landing page
router.route('/').get((req,res)=>{
    res.send('Hello, fellow cyclists lovers. Add a /bikes after the URL to start cycling.');
});

//routes for all poems and create poem
router
.route('/bikes')
.get(bikeControllers.getBikes)
.post(authenticateUser,validateBikeFields, bikeControllers.createBike);

//show, update, delete single poem -> needs authentication and authorization

router
.route('/bikes/:id')
.get(notFound,bikeControllers.getBike)
.put(notFound,authenticateUser,checkAuth,validateBikeFields,bikeControllers.updateBike)
.delete(notFound,authenticateUser,checkAuth, bikeControllers.deleteBike);


//getting comments per poem and posting a comment on the poem
router
.route('/bikes/:id/comments')
.get(relationsController.commentsperBike)
.post(authenticateUser,validateCommentFields,commentController.createComment);


module.exports = router;