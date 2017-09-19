var AWS = require('aws-sdk');
var fs = require('fs');
AWS.config.loadFromPath('./pathToJsonFile.json');
var s3 = new AWS.S3();
exports.DeleteObjects = function (_BucketName) {
   // var myBucket = "DuLich3Mien";
    var params = { Bucket: _BucketName };
    s3.listObjects(params, function (err, data) {
        var bucketContents = data.Contents;
        for (var i = 0; i < bucketContents.length; i++) {
            var urlParams = { Bucket: _BucketName, Key: bucketContents[i].Key };
            s3.getSignedUrl('getObject', urlParams, function (err, url) {
                var params = {
                    Bucket: _BucketName,
                    Delete: {
                        Objects: [
                            {
                                Key: url.substring(url.lastIndexOf("/") + 1, url.indexOf("?")) // required
                            }

                        ],
                    },
                };
                s3.deleteObjects(params, function (err, data) {
                    if (err) console.log(err, err.stack);
                    else console.log(data);
                });

            });
        }
    });
}