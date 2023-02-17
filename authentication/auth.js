const user = require('../model/user');
const sql = require('../db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


exports.register = async(req,res,next) =>{
       //Validate data
         //Read data from request body
    const {name, password} = req.body;
    let errors = [] 
    if (!name ||  !password) {
        errors.push({msg: 'Please enter all fields'});
    }
    if (password.length < 6) {
        errors.push({msg: 'Password must be at least 6 characters'});
    } 
    //check for errors
    if (errors.length > 0) {
        return res.status(401).send(errors);

    }
   else{
        const saltRounds = 10;
        var hashPassword = req.body.password;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(hashPassword, salt, function(err, hash) {
                hashPassword=hash;
                const newUser = new user({
                    name:req.body.name,
                    password:hashPassword
                })
                sql.query('INSERT INTO USER SET ?',newUser,(err,result)=>{
                    if(err){
                        // console.log("user Registered")
                        const errorMessage = err.errno==1062?`${req.body.name} already exist`:err.sqlMessage
                        return res.status(400).send(errorMessage);
                    }else{
                        return res.status(200).send(newUser)
                    }
            });
        });
        })
        
    }
}

exports.login = async(req,res,next) =>{
    
            //Read data from request body
        const {name, password} = req.body;
        let errors = [];

          //Validate data
        if (!name || !password) {
            errors.push({msg: 'Please enter all fields'});
        }
        if (password.length < 6) {
            errors.push({msg: 'Password must be at least 6 characters'});
        }
        //Check for errors
        if (errors.length > 0) {
            res.status(401).send(errors);
        }
        sql.query('SELECT * FROM user WHERE name=?',name,(err,result)=>{
           
            const hashPassword = result[0].password;
            if(result.length==0){
                return res.status(400).send("Email is Not Registered");
            }else{
                bcrypt.compare(password, hashPassword, function(err, resp) {
                    if(err){
                        return res.status(401).send("Wrong Credential");   
                    }
                    // console.log(process.env.JWT_SECRET)
                    // ,isAdmin:result[0].isAdmin
                    const token = jwt.sign({id: result[0].id},process.env.JWT_SECRET)
                    // console.log("token is",token)
                    res.clearCookie('access_token')
                    return res.cookie("access_token",token,{
                        httpOnly:true,
                        secure:true
                    }).status(200).send("Login successful")
                });
               
            }
        })
       
        
    
} 