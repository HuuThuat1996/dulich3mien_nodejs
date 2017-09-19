var AWS = require('aws-sdk');
AWS.config.loadFromPath('./pathToJsonFile.json');
var s3Bucket = new AWS.S3({ params: { Bucket: 'MyBucketDuLich3Mien' } })
var data = {
    Key: "favicon",
    Body: "../../favicon.ico",
    ACL: 'public-read'
};
s3Bucket.putObject(data, function (err, data) {
    if (err) {
        console.log('Error uploading data: ', data);
    } else {
        console.log('succesfully uploaded the image!');
    }
});