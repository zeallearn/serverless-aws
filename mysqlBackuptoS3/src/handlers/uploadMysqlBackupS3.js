import mysqldump from 'mysqldump';
import { uploadS3 } from './uploadS3';
import fs from 'fs';

export async function uploadMysqlBackupS3(event, context) {

  const filename = `dump.sql`;
  const backup = "/tmp/" + filename;
  if(mysqldump){
    mysqldump({
        connection: {
            host: 'mydatabase.ckjpjx6yqq1r.ap-south-1.rds.amazonaws.com',
            user: 'admin',
            password: 'admin-123',
            database: 'testing',
        },
        dumpToFile: backup
    });
  //const buffer = Buffer.from(backup, 'utf8');
  fs.readFileSync(backup)
  const uploadToS3Result = await uploadS3(filename, backup);
  fs.unlink(backup, () => {});
  console.log(uploadToS3Result);
  
}else{
    //Hacer algo aqui.
}
}

export const handler = uploadMysqlBackupS3;


