const express = require('express');
const app = express();
const cors = require("cors");
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const dotenv = require('dotenv').config()
const connection = require('./db')

const route = require('./router/routes')
const PORT = process.env.PORT || 3000;

require('dotenv').config({ path: './config/.env' })
// var corsOptions = {
//     origin: "http://localhost:3000"
//   };
app.use(cookieParser()) 
app.use(cors());
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
connection.query('use blooddrop;',(err,res)=>{
    console.log("using blooddrop database")
})
// app.get("/", (req, res) => {
  
//    ;
  
//     // use the query to create a Database.
//     connection.query(createQuery, (err) => {
//         if(err) throw err;
  
//         console.log("Database Created Successfully !");
  
//         let useQuery = `USE ${databaseName}`;
//         connection.query(useQuery, (error) => {
//             if(error) throw error;
  
//             console.log("Using Database");
              
//             return res.send(
// `Created and Using ${databaseName} Database`);
//         })
//     });

// });

// app.post("/create",(req,res)=>{
//     console.log("Hello")
//     if(!req.body){
//         res.status(400).send({
//             message:"Content can not be empty!"
//         })
//     }
//     let databaseName = "gfg_db";
//     let useQuery = `USE ${databaseName}`;
//     connection.query(useQuery, (error) => {
//         if(error) throw error;

//         console.log("Using Database");
          
// //         return res.send(
// // `Created and Using ${databaseName} Database`);
//     })
//     const newTutorial = new Tutorial({
       
//         title: req.body.title,
//         description: req.body.description,
//         published: req.body.published || false 
//     })
//     console.log("req is",req.body)
//     connection.query("INSERT INTO tutorials SET ?",newTutorial,(err,result)=>{
//         if(err){
//             console.log(err)
//         }
//         console.log("created")
//         console.log(result)
//         res.status(200).json({newTutorial})
//     })
    
    

// })


const server  = app.listen(PORT,console.log(`Server is running on ${PORT}`))
