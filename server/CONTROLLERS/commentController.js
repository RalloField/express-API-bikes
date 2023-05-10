const mariadb = require('mariadb');
const dotenv = require('dotenv');
const pool = require('../DB/db');
dotenv.config();

// get all the data from the database table (webshop.products)
// setup basic CRUD functionality

const commentController = {

getComments: async (req,res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const data = await connection.query(`SELECT * FROM webshop.comments`);
        res.send(data);
    } catch(err) {
        throw err;
    } finally {
        if (connection) connection.end();
    }   
},

//modal for getting detailed view

getComment: async (req,res) => {
  let connection;
  try{
    connection = await pool.getConnection();
    let commentID = req.params.id;
    const data = await connection.query(`SELECT * FROM webshop.comments WHERE id=?`, [commentID]);
      res.send(data);
  } catch(err) {
        console.log('Failed to get comments from database');
        res.status(500).send('Failed to get comments from database');
        throw err;
    } finally {
        if (connection) connection.release();
    }
},

//modal for creating a new record in the database

createComment: async (req,res) => {
  
  const {subject, comment_text} = req.body;

  let connection;

  try
  {
    connection = await pool.getConnection();
    const result = await connection.execute(`INSERT INTO comments (subject, comment_text) VALUES (?,?)`, [subject, comment_text]);
    const commentID = result.insertId;
    res.send({id:Number(commentID), subject,comment_text});
  } catch (err) {
    console.error('Failed to create comment', err);
    res.status(500).send('Failed to create comment');
  } finally {
    if (connection) await connection.release();
  }
},

//modal for putting and update to a record

updateComment: async (req,res) => 
{
  
  const { subject, comment_text } = req.body;
  const { id } = req.params;

  console.log(`Updating comment ${id} with name ${subject} `);
  let connection;

  try
  {
    connection = await pool.getConnection();
    await connection.execute(`UPDATE webshop.comments SET subject=?, comment_text=? WHERE id=?`, [subject, comment_text, id]);
    const updatedComment = {
      id: Number(id),
      subject,
      comment_text
    };
    res.send(updatedComment);

  } catch (err) {
    console.error('Failed to update Comment:', err);
    throw err;
  } finally {
    if (connection) await connection.release();
  }
},

//modal for deleting a record from the database

deleteComment: async (req,res) => 
{
  let connection;

  try 
  {
    connection = await pool.getConnection();
    let commentID = req.params.id;
    const data = await connection.prepare('DELETE FROM webshop.poems WHERE id=?', [commentID]);
    const result = await data.execute(commentID);
    res.send("comment deleted successfully");
  } catch (err) {
    throw err;
  } finally {
    if (connection) connection.end();
  }
}
}

module.exports = commentController;