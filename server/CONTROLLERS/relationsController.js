const mariadb = require('mariadb');
const dotenv = require('dotenv');
const pool = require('../DB/db');
dotenv.config();

//get poems per user

const relationshipController = {

poemperUser: async (req,res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    let userId = req.params.id;
    const data = await connection.query(`SELECT poems.poem_name AS poems_title FROM webshop.poems JOIN webshop.users ON poems.user_id = users.id WHERE users.id = ?`, [userId]);
    console.log(data);
    res.send(data);
  } catch(err) {
    console.log('Failed to get poems from database');
        res.status(500).send('Failed to get poems from database');
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
        const data = await connection.query(`SELECT comments.subject AS comment_title FROM webshop.comments JOIN webshop.users ON comments.user_id = users.id WHERE users.id = ?`, [userId]);
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

  commentsperPoem: async (req,res) => {
    let connection;
    try{
      connection = await pool.getConnection();
      let poemsId = req.params.id;
      const data = await connection.query(`SELECT comments.subject AS comment_title FROM webshop.comments JOIN webshop.poems ON comments.poem_id = poems.id WHERE poems.id = ?`,[poemsId]);
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