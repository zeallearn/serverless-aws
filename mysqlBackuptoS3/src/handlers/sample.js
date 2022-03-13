//import mysqldump from 'mysqldump';
const mysqldump = require('mysqldump')

// dump the result straight to a file
mysqldump({
    connection: {
        host: 'mydatabase.ckjpjx6yqq1r.ap-south-1.rds.amazonaws.com',
        user: 'admin',
        password: 'admin-123',
        database: 'testing',
    },
    dumpToFile: './dumpremote.sql',
});