
var AWS = require('aws-sdk');
var fs = require('fs');
var Diacritics = require('diacritic');
AWS.config.loadFromPath('./Bucket/pathToJsonFile.json');
var s3 = new AWS.S3();
// Delete a Bucket
var bucketName = "TestNum03";
var params = { Bucket: bucketName };
function emptyBucket(bucketName,callback){
    var params = {
      Bucket: bucketName,
      Prefix: 'folder/'
    };
  
    s3.listObjects(params, function(err, data) {
      if (err) return callback(err);
  
      if (data.Contents.length == 0) callback();
  
      params = {Bucket: bucketName};
      params.Delete = {Objects:[]};
  
      data.Contents.forEach(function(content) {
        params.Delete.Objects.push({Key: content.Key});
      });
  
      s3.deleteObjects(params, function(err, data) {
        if (err) return callback(err);
        if(data.Contents.length == 1000)emptyBucket(bucketName,callback);
        else callback();
      });
    });
  }

var get = require('./Bucket/aaa');

get.getlist(function(kq){
    var ddd = kq;
    console.log(kq);
});

