var mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'mydatabase.ckjpjx6yqq1r.ap-south-1.rds.amazonaws.com',
  user     : 'admin',
  password : 'admin-123',
  multipleStatements: true
});
 
connection.query(`select * from testing.sample values('sample','code');`, function (err, results, fields) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
     
      console.log('connected as id ' + connection.threadId);
      console.log(results);
  });

  connection.end(function (err) {
    // all connections in the pool have ended
  });