const mysql = require('mysql2')
// const connection = mysql.createConnection({
//   // host: 'localhost',
//   // user: 'root',
//   // password: 'BiJoY123@',
//     host: 'sql12.freemysqlhosting.net',
//     // port: 3306,
//     user: 'sql12601058',
//     password:"8JCAtSNE4K",
//     database:'sql12601058'
   
// })
const DATABASE_URL='mysql://8b11ij5pn19xskrmq5cg:pscale_pw_PkFI9P1kBqytX3RNO3J0tvjLRgc3QFnpJmJIrmdOYvn@ap-south.connect.psdb.cloud/blooddrop?ssl={"rejectUnauthorized":true}'

const connection = mysql.createConnection(DATABASE_URL)
// host:"ap-south.connect.psdb.cloud",
// user:"8b11ij5pn19xskrmq5cg",
// password:"pscale_pw_PkFI9P1kBqytX3RNO3J0tvjLRgc3QFnpJmJIrmdOYvn",
// database:"blooddrop",
// reject
// const connection = mysql.createConnection({
  
//   host:"containers-us-west-168.railway.app",
//   port:"6299",
//   user:"root",
//   password:"u1iq1SS13t9WVPZwrCvM",
 
// })

module.exports = connection;    