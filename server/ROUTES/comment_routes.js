//modules
const express = require('express');
const router = express.Router();
const commentController = require('../CONTROLLERS/commentController');
const validatePoemFields = require('../MIDDLEWARES/poem_formValidation.middleware');
const notFound = require('../MIDDLEWARES/poem_NotFound.middleware');
const authenticateUser = require('../MIDDLEWARES/authentication_validation.middleware');

router.route('/comments')
.get(commentController.getComments)
.post(commentController.createComment);

router.route('/comments/:id')
.get(commentController.getComment)
.put(commentController.updateComment)
.delete(commentController.deleteComment);

module.exports = router;