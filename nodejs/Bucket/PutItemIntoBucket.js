var AWS = require('aws-sdk');
var fs = require('fs');
AWS.config.loadFromPath('./pathToJsonFile.json');
exports.PutItem = function (_BucketName, _ItemKey, _File) {
    //var _BucketName = "DuLich3Mien";
    //var _ItemKey = "Nam.jpg";
    //var _File = "../../nam.jpg";
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