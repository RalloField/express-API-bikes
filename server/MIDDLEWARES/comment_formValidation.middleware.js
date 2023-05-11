
const validateCommentFields = (req,res,next) => {
  const {subject, comment_text} = req.body;
  if(!subject || !comment_text){
    const err = new Error('Values cannot be empty');
    res.status(400).send(err.message);
  } else {
    next();
  }
};

module.exports = validateCommentFields;