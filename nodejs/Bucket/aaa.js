var AWS = require('aws-sdk');
var fs = require('fs');
var Diacritics = require('diacritic');

var s3 = new AWS.S3();
var xoa= require("./BucketResponsitory");
xoa.Removes("Xong");
