import AWS from 'aws-sdk';
import mysqldump from 'mysqldump';
import { uploadS3 } from './uploadS3';
import fs from 'fs';

export async function uploadMysqlBackupS3(event, context) {
  const sqs = new AWS.SQS();
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
  await sqs.sendMessage({
    QueueUrl: process.env.MAIL_QUEUE_URL,
    MessageBody: JSON.stringify({
      subject: 'Dump taken successfully',
      recipient: 'jyotikhera88@gmail.com',
      body: 'Backup taken!!',
    })
  }
  ).promise();
  fs.unlink(backup, () => {});
  console.log(uploadToS3Result);
  return;
}else{
  await sqs.sendMessage({
    QueueUrl: process.env.MAIL_QUEUE_URL,
    MessageBody: JSON.stringify({
      subject: 'Dump failed',
      recipient: 'jyotikhera88@gmail.com',
      body: 'Backup failed!!',
    })
  }
  ).promise();
  return;
}
//return Promise.all([notify]);
}

export const handler = uploadMysqlBackupS3;


