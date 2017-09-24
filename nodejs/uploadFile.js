var path = require('path');
var formidable = require('formidable');

exports.uploadFiles = function (req,callback) {
    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.error("-->Upload file error:\n"+err.message);
            callback(err, null, null);
        }
        else {
            console.log("-->Upload file success.\n");
            callback(err, fields, files);
        }
    });
};
// form.on('file', function (field, file) {
//     //fs.rename(file.path, path.join(form.uploadDir, file.name));
//     console.log(file.name);
//     console.log(file.path);
// });