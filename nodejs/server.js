var http = require('http');
var fs = require('fs');
var url = require('url');
var festivalRepository = require('./festivalRepository');

//common
/*mimeType
**************************************/
var mimeType = {
    html: "text/html",
    ico: "image/x-icon",
    jpg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    css: "text/css",
    js: "text/javascript",
    json: "application/json",
    wav: "audio/wav",
    svg: "image/svg+xml",
    woff2: "application/font-woff2"
};
/*path
**************************************/
var path = {
    html: "../htmls",
    public: "../public"
};
//end common

http.createServer(function (request, response) {

    //analysis request
    const URL = url.parse(request.url);
    console.log("url " + request.url);
    console.log("method: " + request.method);

    if (request.method == "GET") {
        switch (URL.pathname.toLowerCase()) {
            case "/": {
                fs.readFile(path.html + "/index.html", function (err, data) {
                    if (err) {
                        response.writeHead(404, "Not found");
                        response.end();
                    }
                    else {
                        response.writeHead(200, {'content-type': mimeType.html});
                        response.end(data);
                    }
                });
                break;
            }
            case "/themlehoi": {
                fs.readFile(path.html + "/ThemLeHoi.html", function (err, data) {
                    if (err) {
                        response.writeHead(404, "Not found");
                        response.end();
                    }
                    else {
                        response.writeHead(200, {'content-type': mimeType.html});
                        response.end(data);
                    }
                });
                break;
            }
            case "/xoalehoi": {
                fs.readFile(path.html + "/XoaLeHoi.html", function (err, data) {
                    if (err) {
                        response.writeHead(404, "Not found");
                        response.end();
                    }
                    else {
                        response.writeHead(200, {'content-type': mimeType.html});
                        response.end(data);
                    }
                });
                break;
            }
            case "/themdiadanh": {
                console.log("có nè");
                fs.readFile(path.html + "/ThemDiaDanh.html", function (err, data) {
                    if (err) {
                        response.writeHead(404, "Not found");
                        response.end();
                    }
                    else {
                        response.writeHead(200, {'content-type': mimeType.html});
                        response.end(data);
                    }
                });
                break;
            }
            case "/xoadiadanh": {
                fs.readFile(path.html + "/XoaDiaDanh.html", function (err, data) {
                    if (err) {
                        response.writeHead(404, "Not found");
                        response.end();
                    }
                    else {
                        response.writeHead(200, {'content-type': mimeType.html});
                        response.end(data);
                    }
                });
                break;
            }
            default: {
                var lastIndexOfDot = -1;
                try {
                    lastIndexOfDot = URL.pathname.lastIndexOf('.');
                }
                catch (exception) {
                    lastIndexOfDot = -1;
                }
                //compare file type for read file and return context-type in response writeHead
                if (lastIndexOfDot > 0) {
                    try {
                        var typeFile = URL.pathname.substr(lastIndexOfDot);
                        if (typeFile != null) {
                            for (var x in mimeType) {
                                if ("." + x == typeFile) {
                                    fs.readFile(path.public + URL.pathname, function (err, data) {
                                        if (err) {
                                            response.writeHead(404, "Not found");
                                            response.end();
                                        }
                                        else {
                                            response.writeHead(200, {'content-type': mimeType[x]});
                                            response.end(data);
                                        }
                                    });
                                    break;
                                }
                            }
                        }
                    }
                    catch (exception) {
                        response.writeHead(404, "Not found");
                    }
                }
                else {
                    response.writeHead(404, "Not found");
                    response.end();
                }
            }
        }
    }
    else if (request.method == "POST") {

        request.on('data', function (chunk) {
            var urlFull = request.url + "?" + chunk;
            var model = url.parse(urlFull, true).query;

            switch (URL.pathname.toLowerCase()) {
                case "/themlehoi": {
                    try {
                        console.log("FestivalName: " + model.FestivalName + "\n");
                        console.log("StartDate: " + model.StartDate + "\n");
                        console.log("EndDate: " + model.EndDate + "\n");
                        console.log("Address: " + model.Address + "\n");
                        console.log("Descript: " + model.Descript + "\n");
                        console.log("ImageTile: " + model.ImageTitle + "\n");
                        console.log("Image: " + model.Image + "\n");
                        //1, Thêm hình đại diện vào Bucket hình ảnh
                        //2, Lấy thông tin hình đại diện trên s3 với cấu trúc
                        /*{
                            public_id: '',
                            version: ,
                            signature: '',
                            width: ,
                            height: ,
                            format: '',
                            resource_type: '',
                            created_at: '2017-06-46:03Z',
                            bytes: ,
                            type: '',
                            url: '',
                            secure_url: '',
                            name:''
                        }*/
                        //3, Tương tự như trên nhưng làm với nhiều hình ảnh
                        //4, Thêm thông tin festival vào dynamodb sử dụng hàm festivalRepository.addFestival()
                        //5, Trả kết quả thực hiện lại cho client
                        break;
                    }
                    catch (exception) {
                        console.error("Exception. exception JSON:", JSON.stringify(err, null, 2));
                        response.writeHead();
                        response.end();
                    }
                }

                default:
                    break;
            }
        });
    }

}).listen(8084);
console.log("Server running at http://loaclhost:8084");