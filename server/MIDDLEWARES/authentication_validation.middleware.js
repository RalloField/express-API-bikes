const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();

const authenticateUser = (req,res, next) => {
    //extract the access token from the request cookie
    const accessToken = req.cookies['webshop.process'];

    if (!accessToken){
        // If access token is not present, user is not authenticated
        return res.status(401).json({message:'Unauthorized'});
    }

    try {
        // Verify the access token
        const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN);
        req.user.id = decoded; // Attach the decoded user data to the request object
        next(); // proceed to the next middleware or route handler
    } catch (err) {
        // If access token verification fails, user is not authenticated
        return res.status(401).json({message: 'Unauthorized'});
    }
};

module.exports = authenticateUser;