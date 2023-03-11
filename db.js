const mysql = require('mysql2')
const connection = mysql.createConnection({
  // host: 'localhost',
  // user: 'root',
  // password: 'BiJoY123@',
    host: 'sql12.freemysqlhosting.net',
    // port: 3306,
    user: 'sql12601058',
    password:"8JCAtSNE4K",
    database:'sql12601058'
   
})
// const connection = mysql.createConnection({
  
//   host:"containers-us-west-168.railway.app",
//   port:"6299",
//   user:"root",
//   password:"u1iq1SS13t9WVPZwrCvM",
 
// })

module.exports = connection;    