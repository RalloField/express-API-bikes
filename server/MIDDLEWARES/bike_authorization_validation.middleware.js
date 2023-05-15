const pool = require('../DB/db');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const jwt_token =  process.env.JWT_ACCESS_TOKEN;

// Middleware to check if the user is authorized to access their own data
const checkAuth = async (req, res, next) => {
// Assuming the JWT token is sent in the Authorization header
let connection;

try{
const token = req.cookies['webshop.process'];
console.log('Token:', token);

const decodedToken = jwt.verify(token,jwt_token);
console.log('DecodedToken', decodedToken);

let bikeID = req.params.id;
let userId = req.user.id;

connection = await pool.getConnection();
let result = await connection.query(`SELECT * FROM webshop.bikes WHERE id=? AND user_id=?`,[bikeID, userId]);

if (!result.length) {
    return res.status(401).send('Not Authorized to modify this bike');
}
next();
} catch (error) {
return res.status(401).send('Invalid token');
}
};


module.exports = checkAuth;