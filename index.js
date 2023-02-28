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
// var corsOptions = {
//     origin: "http://localhost:3000"
//   };
app.use(cookieParser())

app.use(cors(
  // {credentials: true, origin: 'http://localhost:3001'}
));

  // create application/x-www-form-urlencoded parser
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

//using database blooddrop
// connection.query('use freedb_ bloodDrop',(err,res)=>{
//     console.log("using blooddrop database")
//     if(err){
//       console.log("err is",err)
//     }
// })
// get the cookie incoming request
// app.get('/getcookie',verifyToken, (req, res) => {
//   //show the saved cookies
//   console.log("verify")
//   console.log(req.cookies)
//   res.send(req.cookies);
// });



const server  = app.listen(PORT,host,console.log(`Server is running on ${PORT}`))
