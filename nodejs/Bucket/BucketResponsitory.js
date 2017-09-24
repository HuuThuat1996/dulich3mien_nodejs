var AWS = require('aws-sdk');
var fs = require('fs');
var Diacritics = require('diacritic');
AWS.config.loadFromPath('./Bucket/pathToJsonFile.json');
var s3 = new AWS.S3();
// Create bucket with every name of Festival or Area
exports.createBucket = function (_BucketName, _BucketKey, _ItemKey, _File) {
    // Bucket names must be unique across all S3 users
    //_BucketName ="DuLich3Mien";
    // _BucketKey="DuLich3MienKey";
    var noneSign = Diacritics.clean(_BucketName).trim();
    var name = "";
    for (i = 0; i < noneSign.length; i++) {
        if (noneSign[i] != ' ') {
            name += noneSign[i];
        }
    }
    var myBucket = name;
    s3.createBucket({ Bucket: myBucket }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("create successfull !!!!");
        }
    });
}
// Put image or video of Area or Festival (only one item per onces)
exports.PutItem = function (_BucketName, _ItemKey, _File) {
    //var _BucketName = "DuLich3Mien";
    //  var _ItemKey = "Nam.jpg";
    // var _File = "../../nam.jpg";
    var s3Bucket = new AWS.S3({ params: { Bucket: _BucketName } })
    var data = {
        Key: _ItemKey,
        Body: fs.createReadStream(_File),
        ACL: 'public-read'
    };
    s3Bucket.putObject(data, function (err, data) {
        if (err) {
            console.log('Error uploading data: ', data);
        } else {
            console.log('succesfully uploaded the image!');
        }
    });
}
// get list link of bucket with Name and return array link
exports.GetList = function (_BucketName, callback) {
    var lstArray = "";
    var urlParams = { Bucket: _BucketName, Key: bucketContents[i].Key };
    s3.getSignedUrl('getObject', urlParams, function (err, url) {
        lstArray += url.substring(0, url.indexOf("?"));

    });

}
// Delete a Bucket and all Object in this Bucket 
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
                s3.deleteObjects(params, deleteBucket, function (err, data) {
                    if (err) console.log(err, err.stack);
                    else {
                        console.log(data);

                    }

                });

            });
        }
    });
    s3.deleteBucket({ Bucket: _BucketName }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("Delete successfull !!!");
        }
    });
}
