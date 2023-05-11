const mariadb = require('mariadb');
const pool = require('../DB/db');

const notFound = async (req, res, next) => {
  const { id } = req.params;

  let connection;
  try {
    connection = await pool.getConnection();
    const data = await connection.query(`SELECT * FROM webshop.comments WHERE id=?`, [id]);
    if (!data.length) {
      return res.status(404).send('Comment not found');
    }
    next();
  } catch (err) {
    console.log('Failed to check if comment exists');
    res.status(500).send('Failed to check if comment exists');
    throw err;
  } finally {
    if (connection) connection.release();
  }
}

module.exports = notFound;