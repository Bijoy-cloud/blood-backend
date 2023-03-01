const express = require('express');
const app = express();
const cors = require("cors");
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const dotenv = require('dotenv').config()
const connection = require('./db')
const verifyToken = require("./utilis/verifyToken")
const route = require('./router/routes')
const PORT = process.env.PORT || 3000;
const host = "0.0.0.0"
require('dotenv').config({ path: './config/.env' })

app.use(cookieParser())




app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Origin", req.header('Origin'));
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

  var urlencodedParser = bodyParser.urlencoded({ extended: false })
  app.use(express.json({
    type: ['application/json', 'text/plain']
  }))
  app.use("/",route);
connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the Myconnection server.'); 
});



const server  = app.listen(PORT,host,console.log(`Server is running on ${PORT}`))
