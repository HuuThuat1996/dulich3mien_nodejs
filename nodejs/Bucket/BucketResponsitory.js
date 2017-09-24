var AWS = require('aws-sdk');
var fs = require('fs');
var Diacritics = require('diacritic');
AWS.config.loadFromPath('../nodejs/Bucket/pathToJsonFile.json');

var s3 = new AWS.S3();

// Create bucket
//return true/false
exports.createBucket = function (_BucketName, _BucketKey, callback) {
    var myBucket = removeVNMark(_BucketName);
    s3.createBucket({ Bucket: myBucket }, function (err, data) {
        if (err) {
            console.log("--> CreateBucket error: " + err);
            callback(false);
        } else {
            console.log("CreateBucket create success.");
            callback(true);
        }
    });
};

// Put a item
//return json image
exports.PutItem = function (_BucketName, image, _File, callback) {
    var bucketName = removeVNMark(_BucketName);
    var s3Bucket = new AWS.S3({ params: { Bucket: bucketName } });
    var option = {
        Key: image.name,
        Body: fs.createReadStream(image.path),
        ACL: 'public-read'
    };
    s3Bucket.putObject(option, function (err, data) {
        if (err) {
            console.log('--> Put a item error:', err);
            if(typeof callback === "function")
                callback(null);
        } else {

            var urlParams = { Bucket: bucketName, Key: image.name };
            var url = s3Bucket.getSignedUrl('getObject', urlParams);
            try {
                console.log(url);
                var indexOfQuestion = url.indexOf('?');
                var urlFinal = url.substr(0, indexOfQuestion);
                var _image = {
                    "bucket": bucketName,
                    "size": image.size,
                    "width": '',
                    "height": '',
                    "type": image.type,
                    "url": urlFinal,
                    "name": image.name
                }
                console.log('--> Put a item success.');
                if(typeof callback === "function"){
                    callback(_image);
                }
                else{
                    console.log("no khog phai la ham");
                }
            }
            catch (exeception) {
                console.log("exeception in put a item:" + exeception);
            }
        }
    });
};

//Put items
//return json image
exports.PutItems = function (_BucketName, images, callback) {
    var _images = [];
    var bucketName = removeVNMark(_BucketName);
    var s3Bucket = new AWS.S3({ params: { Bucket: bucketName } });
    var option;
    var count = 0;
    images.forEach(function (item) {
        count++;
        option = {
            Key: item.name,
            Body: fs.createReadStream(item.path),
            ACL: 'public-read'
        };
        s3Bucket.putObject(option, function (err, data) {
            if (err) {
                console.log('--> Put error item ' + count + ": ", err);
            } else {
                var urlParams = { Bucket: bucketName, Key: item.name };
                var url = s3Bucket.getSignedUrl('getObject', urlParams);
                try {
                    var indexOfQuestion = url.indexOf('?');
                    var urlFinal = url.substr(0, indexOfQuestion);
                    _images.push({
                        "bucket": bucketName,
                        "size": item.size,
                        "width": '',
                        "height": '',
                        "type": item.type,
                        "url": urlFinal,
                        "name": item.name
                    });
                    if (count == image.length) {
                        console.log('--> Put items success.');
                        console.log(_images);
                        if(typeof callback === "function")
                            callback(_images);
                    }
                }
                catch (exeception) {
                    console.log("exeception in putItems");
                }
            }
        });
    });
};
exports.Removes = function (_BucketName) {
    clearItem(_BucketName, function (result) {
        if (!result) {
            return false;
        }
        else {
            removeBuket(_BucketName);
            return true;
        }
    });
}
// Delete a Bucket
function clearItem(_BucketName, callback) {
    var bucketName = removeVNMark(_BucketName);
    var params = { Bucket: bucketName };
    s3.listObjects(params, function (err, data) {
        var bucketContents = data.Contents;
        for (var i = 0; i < bucketContents.length; i++) {
            var urlParams = { Bucket: bucketName, Key: bucketContents[i].Key };
            var params = {
                Bucket: bucketName,
                Delete: {Objects: [{ Key: urlParams.Key}],},};
            s3.deleteObjects(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                }
                else {
                    console.log("in 1");
                    if (bucketContents.length == 0) {
                        console.log("in 0");
                        callback(true);
                    }
                    else{
                        console.log("in 2");
                    }
                }
            });
        }
    });
}
function removeBuket(_BucketName) {
    var bucketName = removeVNMark(_BucketName);
    s3.deleteBucket({ Bucket: bucketName }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("Delete successfull !!!");
        }
    });
}
// Get list link of bucket with Name and return array link
/*
exports.GetList = function (_BucketName, callback) {
    var bucketName = removeVNMark(_BucketName);
    var arrayImage = "";
    var params = {Bucket: bucketName};
    s3.listObjects(params, function (err, data) {
        var bucketContents = data.Contents;
        for (var i = 0; i < bucketContents.length; i++) {
            var urlParams = {Bucket: bucketName, Key: bucketContents[i].Key};
            s3.getSignedUrl('getObject', urlParams, function (err, url) {
                arrayImage += url.substring(0, url.indexOf("?")) + "*";
            });
        }
        console.log("In getList: " + arrayImage);
        callback(arrayImage);
    });
};

*/
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
