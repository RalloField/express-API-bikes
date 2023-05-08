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

const validateUserFields = (req,res,next) => {
  const {user_name, user_lastname, email, password} = req.body;
  if(!user_name || !user_lastname || !email || !password){
    const err = new Error('Values cannot be empty');
    res.status(400).send(err.message);
  } else {
    next();
  }
};



module.exports = validatePoemFields;
module.exports = validateUserFields;