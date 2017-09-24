var AWS = require("aws-sdk");
AWS.config.loadFromPath('./Bucket/pathToJsonFile.json');

var dynamodb = new AWS.DynamoDB();


var FestivalTable = {
    TableName: "Festival",
    KeySchema: [
        { AttributeName: "FestivalID", KeyType: "HASH" },
        { AttributeName: "FestivalName", KeyType: "RANGE" },  //Partition key

    ],
    AttributeDefinitions: [
        { AttributeName: 'FestivalID', AttributeType: 'S' },
        { AttributeName: "FestivalName", AttributeType: "S" },
      
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

var AreaTable = {
    TableName: "Area",
    KeySchema: [
        { AttributeName: "AreaID", KeyType: "HASH" },  //Partition key
        { AttributeName: "AreaName", KeyType: "RANGE" },  //Partition key
    ],
    AttributeDefinitions: [
        { AttributeName: 'AreaID', AttributeType: 'S' },  //Partition key
        { AttributeName: "AreaName", AttributeType: "S" },
        
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(FestivalTable, function (err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

dynamodb.createTable(AreaTable, function (err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});