const connection = require('../DB/db');

const validatePoemFields = (req,res,next) => {
  const {poem_name, poem_text, author, language} = req.body;
  if(!poem_name || !poem_text || !author || !language){
    const err = new Error('Values cannot be empty');
    res.status(400).send(err.message);
  } else {
    next();
  }
};




module.exports = validatePoemFields;
