var AWS = require('aws-sdk');
var fs = require('fs');
var Diacritics = require('diacritic');
AWS.config.loadFromPath('./Bucket/pathToJsonFile.json');
var s3 = new AWS.S3();
var params = { Bucket: "Lancuoi" };
exports.getlist = function (callback) {
    var lstArray = "";
    s3.listObjects(params, lstArray, function (err, data) {
        var lst = "";
        var bucketContents = data.Contents;
        for (var i = 0; i < bucketContents.length; i++) {
            var urlParams = { Bucket: "Lancuoi", Key: bucketContents[i].Key };
            lst += getlink(function (data) { });
        }
        callback(lst);
    });

}
function getlink(callback) {
    var lstArray = "";
    s3.getSignedUrl('getObject', urlParams, function (err, url) {
        lstArray += url.substring(0, url.indexOf("?")) + "?";
        callback(lstArray);
    });
    return lstArray;
}