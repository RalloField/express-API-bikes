const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const jwt_token =  process.env.JWT_ACCESS_TOKEN;

// Middleware to check if the user is authorized to access their own data
const checkAuth = (req, res, next) => {
// Assuming the JWT token is sent in the Authorization header

try{
const token = req.cookies['webshop.process'];
console.log('Token:', token);
const decodedToken = jwt.verify(token,jwt_token);
console.log('DecodedToken', decodedToken);
const userId = decodedToken.id;
console.log(userId);

if (userId != req.params.id) {
    return res.status(401).send('Not authorized to see this page');
}
next();
} catch (error) {
return res.status(401).send('Invalid');
}
};

module.exports = checkAuth;