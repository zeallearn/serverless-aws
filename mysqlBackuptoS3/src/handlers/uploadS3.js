import AWS from 'aws-sdk';
import fs from 'fs';

const s3 = new AWS.S3();

export async function uploadS3(key, body) {
  const fileContent = fs.readFile(body);
  const result = await s3.putObject({
    Bucket: process.env.MysqlBackup_Bucket_NAME,
    Key: key,
    Body: fileContent,
  }).promise();

  return result;
}