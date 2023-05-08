const mariadb = require('mariadb');
const dotenv = require('dotenv');

dotenv.config();

//setup database connection
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    connectionLimit: 5
});

pool.getConnection()
  .then((conn) => {
    console.log('Database connection established');
    conn.release();
  })
  .catch((err) => {
    console.error('Error connecting to database', err);
  });

module.exports = pool;