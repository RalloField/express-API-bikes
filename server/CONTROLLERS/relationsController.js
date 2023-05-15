const mariadb = require('mariadb');
const dotenv = require('dotenv');
const pool = require('../DB/db');
dotenv.config();

//get poems per user

const relationshipController = {

bikeperUser: async (req,res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    let userId = req.params.id;
    const data = await connection.query(`SELECT bikes.brand AS bike_brand, bikes.model AS bike_model, type AS bike_type, price AS bike_type FROM webshop.bikes JOIN webshop.users ON bikes.user_id = users.id WHERE users.id = ?`, [userId]);
    console.log(data);
    res.send(data);
  } catch(err) {
    console.log('Failed to get bikes from database');
        res.status(500).send('Failed to get bikes from database');
        throw err;
    } finally {
        if (connection) connection.release();
    }
  },

  commentperUser: async (req,res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        let userId = req.params.id;
        const data = await connection.query(`SELECT comments.subject AS comment_title, comments.comment_text AS text FROM webshop.comments JOIN webshop.users ON comments.user_id = users.id WHERE users.id = ?`, [userId]);
        console.log(data);
        res.send(data);
    } catch(err) {
        console.log('Failed to get comments from database');
        res.status(500).send('Failed to get comments from database');
        throw err;
    } finally {
        if (connection) connection.release();
    }
  },

  commentsperBike: async (req,res) => {
    let connection;
    try{
      connection = await pool.getConnection();
      let bikeID = req.params.id;
      const data = await connection.query(`SELECT comments.subject AS comment_title, comments.comment_text AS text FROM webshop.comments JOIN webshop.bikes ON comments.bike_id = bikes.id WHERE bikes.id = ?`,[bikeID]);
      console.log(data);
      res.send(data);
    } catch(err) {
        console.log('Failed to get comments from database');
        res.status(500).send('Failed to get comments from database');
        throw err;
    } finally {
        if (connection) connection.release();
    }
  }


}

module.exports = relationshipController;