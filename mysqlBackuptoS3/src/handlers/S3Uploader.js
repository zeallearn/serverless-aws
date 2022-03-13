async function uploadFile(filePath, folderPath)
{
  const readStream = fs.createReadStream(filePath);

  const writeStream = new stream.PassThrough();
  readStream.pipe(writeStream);

  var fname = path.basename(filePath);

  var params = {
        Bucket : 'mysqlbackup-bucket-sj19asxm-dev',
        Key : folderPath+'/'+fname,
        Body : writeStream
    }

  let uploadPromise = new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        //logger.error('upload error..', err);
        reject(err);
      } else {
        //logger.debug('upload done..');
        resolve(data);
      }
    });
  });

  var res = await uploadPromise;
  return res;
}