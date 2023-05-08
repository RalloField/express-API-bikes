//modules
const express = require('express');
const router = express.Router();
const controllers = require('../CONTROLLERS/poemControllers');
const validatePoemFields = require('../MIDDLEWARES/form_validation.middlewares');
const notFound = require('../MIDDLEWARES/id_exist_validation.middleware');

//landing page
router.route('/').get((req,res)=>{
    res.send('Hello, fellow poetry lovers. Add a /poems after the URL to start reading, and if your name is Poe watch out for the trees.');
});

//routes for all poems and create
router
.route('/poems')
.get(controllers.getPoems)
.post(validatePoemFields, controllers.createPoem);

//show, update, delete single poem
router
.route('/poems/:id')
.get(notFound, controllers.getPoem)
.put(notFound,validatePoemFields,controllers.updatePoem)
.delete(notFound, controllers.deletePoem);



module.exports = router;