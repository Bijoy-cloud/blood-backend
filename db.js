const mysql = require('mysql')
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
module.exports = connection;   