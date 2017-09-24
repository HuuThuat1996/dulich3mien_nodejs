var AWS = require('aws-sdk');
var fs = require('fs');
var Diacritics = require('diacritic');

var s3 = new AWS.S3();
var bucket= require("./BucketResponsitory");
var festivalName = "TestNum01";
var image = {
    "name": "nam",
    "path": "../../nam.jpg"
};
bucket.removeBucket("TestNum01");
// bucket.createBucket(festivalName,function(result){
//     console.log(result);
// });
// bucket.PutItem(festivalName, image, function(data){
//     console.log("kq" + data);
// });

