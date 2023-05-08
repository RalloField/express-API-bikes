const mariadb = require('mariadb');
const dotenv = require('dotenv');
const pool = require('../DB/db');
const bcrypt = require('bcrypt');
dotenv.config();

const userController = {

getUsers: async (req,res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const data = await connection.query(`SELECT * FROM webshop.users`);
        res.send(data);
    } catch(err){
        throw err;
    } finally {
        if (connection) connection.end();
    }
},

//modal for getting one user

getUser: async (req,res) => {
    let connection;
    try{
        connection = await pool.getConnection();
        let userID = req.params.id;
        const data = await connection.query(`SELECT * FROM webshop.users WHERE id=?`, [userID]);
        res.send(data);
    } catch(err){
        console.log('Failed to get user from database');
        res.status(500).send('Failed to get users from database');
        throw err;
    } finally {
        if (connection) connection.release();
    }
},

createUser: async (req,res) => {
    const {user_name, user_lastname, email, password} = req.body;

    let connection;
    const hashSalt = 13;
    const hashedPassword = await bcrypt.hash(password, hashSalt);

    try
    {
        connection = await pool.getConnection();
        const result = await connection.execute(`INSERT INTO users (user_name, user_lastname, email, password) VALUES (?,?,?,?)`,[user_name,user_lastname,email,hashedPassword]);
        const userID = result.insertId;
        res.send({id:Number(userID), user_name,user_lastname,email,password});
    } catch (err) {
        console.error('Failed to create user', err);
        res.status(500).send('Failed to create user');
    } finally {
        if (connection) await connection.release();
}
},

updateUser: async (req,res) => 
{
    const {user_name, user_lastname, email, password} = req.body;
    const {id} = req.params;

    const hashSalt = 13;
    const hashedPassword = await bcrypt.hash(password, hashSalt);

    console.log(`Updating user ${id} with name ${user_name}`);
    let connection;

    try
    {
        connection = await pool.getConnection();
        await connection.execute(`UPDATE webshop.users SET user_name=?,user_lastname=?,email=?,password=? WHERE id=?`, [user_name,user_lastname,email,hashedPassword,id]);
        const updatedUser = {
            id: Number(id),
            user_name,
            user_lastname,
            email,
            password,
        };
        res.send(updatedUser);
    } catch (err) {
        console.error('Failed to update user: ', err);
        throw err;
    } finally {
        if (connection) await connection.release();
    }
},

deleteUser: async (req, res) =>
{
    let connection;

    try
    {
        connection =  await pool.getConnection();
        let userID = req.params.id;
        const data = await connection.execute('DELETE FROM webshop.users WHERE id = ?', [userID]);
        const result = await data.execute(userID);
        if (!result.affectedRows) {
            res.status(404).send('User not found');
        } else {
            res.send({message: "User deleted successfully!"})
        }
    } catch (err) {
        throw err;
    } finally {
        if (connection) connection.end();
    }
}
}

module.exports = userController;