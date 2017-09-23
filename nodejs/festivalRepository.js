var AWS = require("aws-sdk");
var bucket = require('./BucKet/BucketResponsitory');

AWS.config.loadFromPath('./Bucket/pathToJsonFile.json');

//add festival
/*
**** success****
* return 0
* ***Fail***
* create bucket fail reurn -1
* put item image title fail return -2
* add item festival to dynamodb fail return -3
* */
exports.addFestival = function (festivalName, startDate, endDate, address, descript, imageTitle, image, callback) {
    //*************s3
    //Create bucket
    bucket.createBucket(festivalName, festivalName, function (resultCreateBucket) {
        if (!resultCreateBucket) {
            callback(-1);
        }
        else {
            //put image title
            bucket.PutItem(festivalName, imageTitle, function (_imageTitle) {
                if (_imageTitle == null) {
                    bucketRepository.DeleteObjects(festivalName);
                    callback(-2);
                }
                else {
                    //put images
                    bucket.PutItems(festivalName, image, function (_images) {
                        //**********************end s3
                        //create festival model
                        var festivalModel = {
                            "FestivalName": festivalName,
                            "StartDate": startDate,
                            "EndDate": endDate,
                            "Address": address,
                            "Descript": descript,
                            "ImageTile": _imageTitle,
                            "Image": _images
                        };
                        //add data to dynamodb
                        var docClient = new AWS.DynamoDB().DocumentClient();
                        docClient.put(festivalModel, function (err, data) {
                            if (err) {
                                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                                bucketRepository.DeleteBucket(festivalName);
                                callback(-3);
                            } else {
                                console.log("Added item:", JSON.stringify(data, null, 2));
                                callback(0);
                            }
                        });
                        //end add data to dynamodb
                    });
                }
            });
        }
    });
};
//end add festival

//remove festival
exports.removeFestival = function () {

};
//end remove festival