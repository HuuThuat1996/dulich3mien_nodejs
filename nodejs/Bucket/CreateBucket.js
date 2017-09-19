var AWS = require('aws-sdk');
var fs = require('fs');
AWS.config.loadFromPath('./pathToJsonFile.json');
var s3 = new AWS.S3();
exports.CreateBucket = function (_BucketName, _BucketKey) {
    // Bucket names must be unique across all S3 users
    //_BucketName ="DuLich3Mien";
   // _BucketKey="DuLich3MienKey";
    var myBucket = _BucketName;
    var myKey = _BucketKey;
    s3.createBucket({ Bucket: myBucket }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
          console.log("Create successfull !!!");
        }
    });
}