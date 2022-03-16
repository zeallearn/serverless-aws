//import mysqldump from 'mysqldump';
const mysqldump = require('mysqldump');
const fs = require('fs');
async function backup() {
// dump the result straight to a file
await mysqldump({
    connection: {
        host: 'mydatabase.ckjpjx6yqq1r.ap-south-1.rds.amazonaws.com',
        user: 'admin',
        password: 'admin-123',
        database: 'testing',
    },
    dumpToFile: './dumpremote2.sql',
    multipleStatements: true,
});



var stats = fs.statSync("./dumpremote2.sql")
var fileSizeInBytes = stats.size;
console.log(fileSizeInBytes);
}
/*fs.readFile('./dumpremote3.sql', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(data)
  })*/

  backup();