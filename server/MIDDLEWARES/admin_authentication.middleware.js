const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();

const authenticateAdmin = (req, res, next) => {
    // Extract the access token from the request cookie
    const accessToken = req.cookies['webshop.process'];
    console.log(accessToken);

    if (!accessToken) {
        // If access token is not present, user is not authenticated
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verify the access token
        const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN);
        console.log(decoded);
        console.log(decoded.is_admin);
        // Check if the user is an admin
        if (decoded.is_admin !== 1) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.user = {
            is_admin: decoded.is_admin
        };
            // Attach the decoded user data to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        // If access token verification fails, user is not authenticated
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authenticateAdmin;
