const connection = require('../DB/db');

const validateBikeFields = (req,res,next) => {
  const {brand, model, type, price} = req.body;
  if(!brand || !model || !type || !price){
    const err = new Error('Values cannot be empty');
    res.status(400).send(err.message);
  } else {
    next();
  }
};




module.exports = validateBikeFields;
