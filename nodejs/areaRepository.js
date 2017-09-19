var AWS = require("aws-sdk");


AWS.config.loadFromPath('./Bucket/pathToJsonFile.json');
AWS.config.update({
    endpoint: "http://localhost:8000"
});

//add area
exports.addArea = function(){

};
//end add area

//remove area
exports.removeArea = function(){

};
//end remove area