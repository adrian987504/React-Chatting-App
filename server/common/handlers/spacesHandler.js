const _ = require('lodash');
const AWS = require('aws-sdk');

const spacesEndpoint = new AWS.Endpoint('ams3.digitaloceanspaces.com');
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET
});

const bucket = process.env.S3_BUCKET;

const existsObject = key => new Promise((resolve, reject) => {
  const params = {
    Bucket: bucket,
    Key: key
  };

  s3.headObject(params, (err, data) => {
    if (err) {
      if (err.code === 'NotFound') {
        return resolve(false);
      }
      return reject(err);
    }
    return resolve(true);
  });
});

const deleteObjects = keys => new Promise((resolve, reject) => {
  const params = {
    Bucket: bucket,
    Delete: {
      Objects: _.map(keys, key => ({
        Key: key
      })),
      Quiet: false
    }
  };

  s3.deleteObjects(params, (err, data) => {
    if (err) {
      return reject(err);
    }
    return resolve(true);
  });
});

module.exports = {
  existsObject,
  deleteObjects
};
