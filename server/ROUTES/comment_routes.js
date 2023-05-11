//modules
const express = require('express');
const router = express.Router();
const commentController = require('../CONTROLLERS/commentController');
const validateCommentFields = require('../MIDDLEWARES/comment_formValidation.middleware');
const notFound = require('../MIDDLEWARES/comment_NotFound.middleware');
const authenticateUser = require('../MIDDLEWARES/authentication_validation.middleware');
const checkAuth = require('../MIDDLEWARES/comment_authorization.middleware');

router.route('/comments')
.get(commentController.getComments)
.post(authenticateUser,validateCommentFields,commentController.createComment);

router.route('/comments/:id')
.get(notFound,authenticateUser,checkAuth,commentController.getComment)
.put(notFound,authenticateUser,checkAuth,validateCommentFields,commentController.updateComment)
.delete(notFound,authenticateUser,checkAuth,commentController.deleteComment);


module.exports = router;