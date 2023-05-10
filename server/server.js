// require the dependencies after installing 
const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const poem_Server = require('./ROUTES/poem_routes');
const user_Server = require('./ROUTES/user-routes');
const comment_Server = require('./ROUTES/comment_routes');
const pageNotFound = require('./MIDDLEWARES/pageNotFound.middleware');


// add config for the .env file for the DB

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use(poem_Server);
app.use(user_Server);
app.use(comment_Server);
app.use(pageNotFound);



// make port listen on 4000
const port = 4000;

app.listen(port,()=>{console.log(`http://127.0.0.1:${port}`)});