
const validateAdminFields = (req,res,next) => {
  const {user_name, user_lastname, email, password, is_admin} = req.body;
  if(!user_name || !user_lastname || !email || !password || !is_admin){
    const err = new Error('Values cannot be empty');
    res.status(400).send(err.message);
  } else {
    next();
  }
};

module.exports = validateAdminFields;