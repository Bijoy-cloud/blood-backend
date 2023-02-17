const jwt = require('jsonwebtoken')

 const verifyToken =(req,res,next)=>{
    const token = req.cookies.access_token;
    console.log("token",token)
    if(!token){
        return res.status(401).send("No token found");   
   }
   try{
    const verified = jwt.verify(token,process.env.JWT_SECRET);
    console.log('verified',verified)
    
} catch(err){
    res.status(400).send("Invalid Token")
}
   
   next()
}
module.exports = verifyToken;