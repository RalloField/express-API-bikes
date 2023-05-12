const mariadb = require('mariadb');
const dotenv = require('dotenv');
const pool = require('../DB/db');
const bcrypt = require('bcrypt');
dotenv.config();

const adminController = {

getAdmins: async (req,res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const data = await connection.query(`SELECT * FROM webshop.users WHERE is_admin = 1`);
        res.send(data);
    } catch(err){
        throw err;
    } finally {
        if (connection) connection.end();
    }
},

//modal for getting one user

getAdmin: async (req,res) => {
    let connection;
    try{
        connection = await pool.getConnection();
        let userID = req.params.id;
        const data = await connection.query(`SELECT * FROM webshop.users WHERE is_admin = 1 AND id=?`, [userID]);
        res.send(data);
    } catch(err){
        console.log('Failed to get admin from database');
        res.status(500).send('Failed to get admin from database');
        throw err;
    } finally {
        if (connection) connection.release();
    }
},

createAdmin: async (req,res) => {
    const {user_name, user_lastname, email, password} = req.body;

    let connection;
    const hashSalt = 13;
    const hashedPassword = await bcrypt.hash(password, hashSalt);

    try
    {
        connection = await pool.getConnection();
        const result = await connection.execute(`INSERT INTO users (user_name, user_lastname, email, password, is_admin) VALUES (?,?,?,?,1)`,[user_name,user_lastname,email,hashedPassword]);
        const adminID = result.insertId;
        res.send({id:Number(adminID), user_name,user_lastname,email,hashedPassword,is_admin});
    } catch (err) {
        console.error('Failed to create admin', err);
        res.status(500).send('Failed to create admin');
    } finally {
        if (connection) await connection.release();
}
},

updateAdmin: async (req,res) => 
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
        await connection.execute(`UPDATE webshop.users SET user_name=?,user_lastname=?,email=?,password=? WHERE is_admin= 1 AND id=?`, [user_name,user_lastname,email,hashedPassword,id]);
        const updatedAdmin = {
            id: Number(id),
            user_name,
            user_lastname,
            email,
            hashedPassword,
        };
        res.send(updatedAdmin);
    } catch (err) {
        console.error('Failed to update user: ', err);
        throw err;
    } finally {
        if (connection) await connection.release();
    }
},

deleteAdmin: async (req, res) =>
{
    let connection;

    try
    {
        connection =  await pool.getConnection();
        let adminID = req.params.id;
        const data = await connection.prepare('DELETE FROM webshop.users WHERE is_admin AND id = ?', [adminID]);
        const result = await data.execute(adminID);
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

module.exports = adminController;