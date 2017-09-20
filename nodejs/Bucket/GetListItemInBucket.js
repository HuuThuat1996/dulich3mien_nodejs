var AWS = require('aws-sdk');
AWS.config.loadFromPath('./Bucket/pathToJsonFile.json');
var s3 = new AWS.S3();
exports.GetList = function (_BucketName,callback) {
  var lstArray = ""; 
  var params = { Bucket: _BucketName };
  s3.listObjects(params, function (err, data) {
    var bucketContents = data.Contents;
    for (var i = 0; i < bucketContents.length; i++) {
      var urlParams = { Bucket: _BucketName, Key: bucketContents[i].Key };
      s3.getSignedUrl('getObject', urlParams, function (err, url) {
        lstArray += url.substring(0, url.indexOf("?")) + "%";
        callback(lstArray);
      });
    }
  });
}
