const mariadb = require('mariadb');
const dotenv = require('dotenv');
const pool = require('../DB/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
dotenv.config();


const logoutController = {

    logoutAuthenticator: async (req,res) => {
        res.clearCookie('webshop.process');
        res.status(200).json({message: 'Successfully logged out'});
    },
};

module.exports = logoutController;