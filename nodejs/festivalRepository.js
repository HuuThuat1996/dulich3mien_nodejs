var AWS = require("aws-sdk");


AWS.config.loadFromPath('./Bucket/pathToJsonFile.json');
AWS.config.update({
    endpoint: "http://localhost:8000"
});

//add festival
exports.addFestival = function(festivalName, startDate, endDate, address, descript, imageTitle, image, callback){
    var docClient = new AWS.DynamoDB().DocumentClient();
    var festivalData = {
        TableName: "Festival",
        Item: {
            "AreaName": festivalName,
            "StartDate": startDate,
            "EndDate": endDate,
            "Address": address,
            "Descript": descript,
            "ImageTitle": imageTitle,
            "image": image
        }
    };
    docClient.put(festivalData, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            callback(false);
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            callback(true);
        }
    });
};
//end add festival

//remove festival
exports.removeFestival = function(){

};
//end remove festival