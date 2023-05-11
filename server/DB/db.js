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

// pool.getConnection() 
// .then((conn) => {
// const sql = "SELECT poems.poem_name AS poems, users.user_name AS users FROM poems JOIN users ON poems.user_id = users.id";
// conn.query(sql)
//   .then((rows) => {
//     console.log(rows);
//   })
//   .catch((err) => {
//     console.error('Error executing query', err);
//   })
//   .finally(()=>{
//     conn.release();
//   });
// })



module.exports = pool;