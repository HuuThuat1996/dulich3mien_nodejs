var AWS = require("aws-sdk");
AWS.config.loadFromPath('./Bucket/pathToJsonFile.json');
AWS.config.update({
    endpoint: "http://localhost:8000"
});
exports.createItem = function (_tables, _name, _address, _description, _imageTitle, _images, _endDate, _startDate) {
    var docClient = new AWS.DynamoDB.DocumentClient();
    var params = "";
    if (_tables == "Area") {
        params = {
            TableName: _tables,
            Item: {
                "AreaName": _name,
                "Address": _address,
                "Descript": _Description,
                "ImageTitle": _imageTitle,
                "image": _images
            }
        };
        console.log("Adding a new Area...");
    }
    else {
        params = {
            TableName: _tables,
            Item: {
                "FestivalName": _name,
                "Descript": _description,
                "ImageTitle": _imageTitle,
                "Image": _images,
                "Address": _address,
                "StartDate": _startDate,
                "EndDate": _endDate
            }
        }
    }
    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

