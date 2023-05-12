const mariadb = require('mariadb');
const dotenv = require('dotenv');
const pool = require('../DB/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
dotenv.config();


const loginController = {

    loginAuthenticator: async (req,res) => {
        let email = req.body.email;
        let password = req.body.password;
        
        let connection;
        try {
            connection =  await pool.getConnection();
            let user = await connection.query(`SELECT * FROM webshop.users WHERE email = ? LIMIT 1`, [email]);
            
            user = user[0];
        
            if(!user) {
                res.send({message: "wrong username or password"});
            } else {

            const passwordCheck = await bcrypt.compare(password, user.password);

            if (!passwordCheck) {

            res.send({message: "wrong username or password"});

            } else { 

            const accessToken = jwt.sign({id:user.id, email:user.email, is_admin:user.is_admin}, process.env.JWT_ACCESS_TOKEN);

            res.cookie('webshop.process',accessToken,{
                httpOnly: true,
            });
            // res.cookie("user-token",accessToken, {maxAge: 60*60*24*30*10})
            res.status(200).json({message: 'Successfully logged in'});    
            }       
            }

        } catch (err) {
            console.error('Failed to authenticate',err);
            res.status(500).send('Failed to authenticate');
        } finally {
            if (connection) await connection.release();
        } 
    }

}

module.exports = loginController;