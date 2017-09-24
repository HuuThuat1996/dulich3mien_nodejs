var AWS = require('aws-sdk');
var fs = require('fs');
var Diacritics = require('diacritic');
AWS.config.loadFromPath('../nodejs/Bucket/pathToJsonFile.json');

var s3 = new AWS.S3();

// Create bucket
//return true/false
exports.createBucket = function (_BucketName, callback) {
    var myBucket = removeVNMark(_BucketName);
    s3.createBucket({Bucket: myBucket}, function (err, data) {
        if (err) {
            console.log("--> CreateBucket error: " + err);
            callback(false);
        } else {
            console.log("--> CreateBucket create success.");
            callback(true);
        }
    });
};

// Put a item
//return json image
exports.PutItem = function (_BucketName, image, callback) {
    var bucketName = removeVNMark(_BucketName);
    var s3Bucket = new AWS.S3({params: {Bucket: bucketName}});
    var option = {
        Key: image.name,
        Body: fs.createReadStream(image.path),
        ACL: 'public-read'
    };
    s3Bucket.putObject(option, function (err, data) {
        if (err) {
            console.log('--> Put a item error:', err);
            callback(null);
        } else {
            var urlParams = {Bucket: bucketName, Key: image.name};
            var url = s3Bucket.getSignedUrl('getObject', urlParams);
            try {
                var indexOfQuestion = url.indexOf('?');
                var urlFinal = url.substr(0, indexOfQuestion);
                var _image = {
                    "bucket": bucketName,
                    "size": image.size,
                    "type": image.type,
                    "url": urlFinal,
                    "name": image.name
                };
                console.log('--> Put a item success.');
                callback(_image);
            }
            catch (exeception) {
                console.log("--> exeception in put a item:" + exeception);
                return -1;
            }
        }
    });
};

//Put items
//return json image
exports.PutItems = function (_BucketName, images, callback) {
    var _images = [];
    var bucketName = removeVNMark(_BucketName);
    var s3Bucket = new AWS.S3({params: {Bucket: bucketName}});
    var option;
    var count = 0;
    images.forEach(function (item) {
        count++;
        option = {
            Key: item.name,
            Body: fs.createReadStream(item.path),
            ACL: 'public-read'
        };
        var messageErr;
        s3Bucket.putObject(option, function (err, data) {
            if (err) {
                console.log('--> Put error item ' + count + ": ", err);
                messageErr += "Put error item " + count + ": " + err;
                if (count == images.length) {
                    callback(null);
                }
            } else {
                var urlParams = {Bucket: bucketName, Key: item.name};
                var url = s3Bucket.getSignedUrl('getObject', urlParams);
                try {
                    var indexOfQuestion = url.indexOf('?');
                    var urlFinal = url.substr(0, indexOfQuestion);
                    _images.push({
                        "bucket": bucketName,
                        "size": item.size,
                        "type": item.type,
                        "url": urlFinal,
                        "name": item.name
                    });
                    if (count == images.length) {
                        console.log('--> Put items success.');
                        callback(_images);
                    }
                }
                catch (exeception) {
                    console.log("--> Exeception in putItems " + exeception);
                    return -1;
                }
            }
        });
    });
};

//remove bucket
exports.removeBucket = function (_BucketName) {
    var bucketName = removeVNMark(_BucketName);
    var paramsBucket = {Bucket: bucketName};
    s3.listObjects(paramsBucket, function (err, data) {
        var objects = [];
        data.Contents.forEach(function (item) {
            objects.push({"Key": item.Key});
        });
        var params = {
            "Bucket": bucketName,
            "Delete": {
                "Objects": objects
            }
        };
        s3.deleteObjects(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
            }
            else {
                console.log("Remove objects success: " + data);
                s3.deleteBucket({Bucket: bucketName}, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Remove bucket success");
                    }
                });
            }
        });
    });
};

//remove VietNamese mark
function removeVNMark(str) {
    var noneSign = Diacritics.clean(str).trim();
    var newStr = "";
    for (var i = 0; i < noneSign.length; i++) {
        if (noneSign[i] != ' ') {
            newStr += noneSign[i];
        }
    }
    return newStr;
}
