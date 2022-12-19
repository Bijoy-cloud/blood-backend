const user = require('../model/user');
const sql = require('../db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


exports.register = async(req,res,next) =>{
    try{
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
                        const errorMessage = err.errno==1062?`${req.body.name} already exist`:err.sqlMessage
                        return res.status(400).send(errorMessage);
                    }else{
                        return res.status(200).send(newUser)
                    }
            });
        });
        })
        
    }catch(err){
        next(err)
    }
}

exports.login = async(req,res,next) =>{
    try{
        const userName = req.body.name;
        const myPlaintextPassword = req.body.password;
        sql.query('SELECT * FROM user WHERE name=?',userName,(err,result)=>{
            console.log(result[0].id)
            const hashPassword = result[0].password;
            if(result.length==0){
                return res.status(401).send("Wrong Credential");
            }else{
                bcrypt.compare(myPlaintextPassword, hashPassword, function(err, resu) {
                    if(err){
                        return res.status(401).send("Wrong Credential");   
                    }
                    console.log(process.env.JWT_SECRET)
                    const token = jwt.sign({id: result[0].id,isAdmin:result[0].isAdmin},process.env.JWT_SECRET)
                    res.clearCookie('access_token')
                    return res.cookie("access_token",token,{
                        httpOnly:true
                    }).status(200).send("Login successful")
                });
               
            }
        })
       
        
    }catch(err){
        next(err)
    }
}