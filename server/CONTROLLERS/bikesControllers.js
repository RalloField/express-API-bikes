const mariadb = require('mariadb');
const dotenv = require('dotenv');
const pool = require('../DB/db');
dotenv.config();

// get all the data from the database table (webshop.products)
// setup basic CRUD functionality

const bikeController = {

getBikes: async (req,res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const data = await connection.query(`SELECT * FROM webshop.bikes`);
        res.send(data);
    } catch(err) {
        throw err;
    } finally {
        if (connection) connection.end();
    }   
},

//modal for getting detailed view

getBike: async (req,res) => {
  let connection;
  try{
    connection = await pool.getConnection();
    let poemID = req.params.id;
    const data = await connection.query(`SELECT * FROM webshop.bikes WHERE id=?`, [poemID]);
      res.send(data);
  } catch(err) {
        console.log('Failed to get bikes from database');
        res.status(500).send('Failed to get bikes from database');
        throw err;
    } finally {
        if (connection) connection.release();
    }
},

//modal for creating a new record in the database

createBike: async (req,res) => {
  
  const {brand, model, type, price } = req.body;
  const user_id = req.user.id;

  let connection;

  try
  {
    connection = await pool.getConnection();
    const result = await connection.execute(`INSERT INTO bikes (brand, model, type, price, user_id) VALUES (?,?,?,?,?)`, [brand, model, type, price, user_id]);
    const poemID = result.insertId;
    res.send({id:Number(poemID), brand,model,type,price, user_id});
  } catch (err) {
    console.error('Failed to create bike');
  } finally {
    if (connection) await connection.release();
  }
},

//modal for putting and update to a record

updateBike: async (req,res) => 
{
  
  const { brand, model, type, price } = req.body;
  const { id } = req.params;

  console.log(`Updating idea ${id} with name ${brand} and ${model}`);
  let connection;

  try
  {
    connection = await pool.getConnection();
    await connection.execute(`UPDATE webshop.bikes SET brand=?, model=?, type=?, price=? WHERE id=?`, [brand, model, type, price, id]);
    const updatedPoem = {
      id: Number(id),
      brand,
      model,
      type,
      price,
    };
    res.send(updatedPoem);

  } catch (err) {
    console.error('Failed to update Bike:', err);
    throw err;
  } finally {
    if (connection) await connection.release();
  }
},

//modal for deleting a record from the database

deleteBike: async (req,res) => 
{
  let connection;

  try 
  {
    connection = await pool.getConnection();
    let bikeID = req.params.id;
    const data = await connection.prepare('DELETE FROM webshop.bikes WHERE id=?', [bikeID]);
    const result = await data.execute(bikeID);
    res.send("record deleted successfully");
  } catch (err) {
    throw err;
  } finally {
    if (connection) connection.end();
  }
}
}

module.exports = bikeController;