const mariadb = require('mariadb');
const dotenv = require('dotenv');
const pool = require('../DB/db');
dotenv.config();

// get all the data from the database table (webshop.products)
// setup basic CRUD functionality

const poemController = {

getPoems: async (req,res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const data = await connection.query(`SELECT * FROM webshop.poems`);
        res.send(data);
    } catch(err) {
        throw err;
    } finally {
        if (connection) connection.end();
    }   
},

//get poems per user

perUser: async (req,res) => {
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


//modal for getting detailed view

getPoem: async (req,res) => {
  let connection;
  try{
    connection = await pool.getConnection();
    let poemID = req.params.id;
    const data = await connection.query(`SELECT * FROM webshop.poems WHERE id=?`, [poemID]);
      res.send(data);
  } catch(err) {
        console.log('Failed to get poems from database');
        res.status(500).send('Failed to get poems from database');
        throw err;
    } finally {
        if (connection) connection.release();
    }
},

//modal for creating a new record in the database

createPoem: async (req,res) => {
  
  const {poem_name, poem_text, author, language } = req.body;

  let connection;

  try
  {
    connection = await pool.getConnection();
    const result = await connection.execute(`INSERT INTO poems (poem_name, poem_text, author, language) VALUES (?,?,?,?)`, [poem_name, poem_text, author, language]);
    const poemID = result.insertId;
    res.send({id:Number(poemID), poem_name,poem_text,author,language});
  } catch (err) {
    console.error('Failed to create poem');
  } finally {
    if (connection) await connection.release();
  }
},

//modal for putting and update to a record

updatePoem: async (req,res) => 
{
  
  const { poem_name, poem_text, author, language } = req.body;
  const { id } = req.params;

  console.log(`Updating idea ${id} with name ${poem_name} and ${author}`);
  let connection;

  try
  {
    connection = await pool.getConnection();
    await connection.execute(`UPDATE webshop.poems SET poem_name=?, poem_text=?, author=?, language=? WHERE id=?`, [poem_name, poem_text, author, language, id]);
    const updatedPoem = {
      id: Number(id),
      poem_name,
      poem_text,
      author,
      language,
    };
    res.send(updatedPoem);

  } catch (err) {
    console.error('Failed to update Poem:', err);
    throw err;
  } finally {
    if (connection) await connection.release();
  }
},

//modal for deleting a record from the database

deletePoem: async (req,res) => 
{
  let connection;

  try 
  {
    connection = await pool.getConnection();
    let poemID = req.params.id;
    const data = await connection.prepare('DELETE FROM webshop.poems WHERE id=?', [poemID]);
    const result = await data.execute(poemID);
    res.send("record deleted successfully");
  } catch (err) {
    throw err;
  } finally {
    if (connection) connection.end();
  }
}
}

module.exports = poemController;