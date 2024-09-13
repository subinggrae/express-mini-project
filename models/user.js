const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'baskinrobbins',
  dateStrings: true
});

connection.query(
  'SELECT * FROM `user`',
  function(err, results, fields) {
    console.log(results);
  }
);