var AWS = require('aws-sdk');
var fs = require('fs');
AWS.config.loadFromPath('./pathToJsonFile.json');
var s3 = new AWS.S3();
exports.DeleteBucket = function (_BucketName, _BucketKey) {
    s3.deleteBucket({ Bucket: _BucketName }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("Delete successfull !!!");
        }
    });
}