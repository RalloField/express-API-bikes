const mariadb = require('mariadb');
const pool = require('../DB/db');

const notFound = async (req, res, next) => {
  const { id } = req.params;

  let connection;
  try {
    connection = await pool.getConnection();
    const data = await connection.query(`SELECT * FROM webshop.users WHERE is_admin = 1 AND id=?`, [id]);
    if (!data.length) {
      return res.status(404).send('Admin not found');
    }
    next();
  } catch (err) {
    console.log('Failed to check if admin exists');
    res.status(500).send('Failed to check if admin exists');
    throw err;
  } finally {
    if (connection) connection.release();
  }
}

module.exports = notFound;