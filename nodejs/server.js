var http = require('http');
var fs = require('fs');
var url = require('url');

//common
/*mimeType
**************************************/
var mimeType = {
    html : "text/html",
    ico : "image/x-icon",
    jpg : "image/jpeg",
    png : "image/png",
    gif : "image/gif",
    css : "text/css",
    js : "text/javascript",
    json : "application/json",
    wav: "audio/wav",
    svg: "image/svg+xml",
    woff2:"application/font-woff2"
};
/*path
**************************************/
var path ={
    html: "../htmls",
    public: "../public"
};
//end common

http.createServer(function(request, response){

    //analysis request
    const URL = url.parse(request.url);

    console.log("method: " + request.method);

    if(request.method == "GET"){
        var lastIndexOfDot = -1;
        try{
            lastIndexOfDot = URL.pathname.lastIndexOf('.');
        }
        catch(exception){
            lastIndexOfDot = -1;
        }
        //compare file type for read file and return context-type in response writeHead
        if(lastIndexOfDot > 0){
            try{
                var typeFile = URL.pathname.substr(lastIndexOfDot);
                if(typeFile != null){
                    for(var x in mimeType){
                        if("."+x == typeFile){
                            fs.readFile(path.public + URL.pathname, function(err, data){
                                if(err){
                                    response.writeHead(404,"Not found");
                                    response.end();
                                }
                                else{
                                    response.writeHead(200, {'content-type':mimeType[x]});
                                    response.end(data);
                                }
                            });
                            break;
                        }
                    }
                }
            }
            catch(exception){
                response.end();
            }
        }
        switch(URL.pathname.toLowerCase()){
            case "/" :
                fs.readFile(path.html + "/index.html", function(err, data){
                    if(err){
                        response.writeHead(404,"Not found");
                        response.end();
                    }
                    else{
                        response.writeHead(200, {'content-type':mimeType.html});
                        response.end(data);
                    }
                });
                break;
            case "/view" :
                fs.readFile(path.html + "/view.html", function(err, data){
                    if(err){
                        response.writeHead(404,"Not found");
                        response.end();
                    }
                    else{
                        response.writeHead(200, {'content-type':mimeType.html});
                        response.end(data);
                    }
                });
                break;
            case "/addfestival":
                fs.readFile(path.html + "/AddFestival.html", function(err, data){
                    if(err){
                        response.writeHead(404,"Not found");
                        response.end();
                    }
                    else{
                        response.writeHead(200, {'content-type':mimeType.html});
                        response.end(data);
                    }
                });
                break;
            case "/deletefestival":
                fs.readFile(path.html + "/DeleteFestival.html", function(err, data){
                    if(err){
                        response.writeHead(404,"Not found");
                        response.end();
                    }
                    else{
                        response.writeHead(200, {'content-type':mimeType.html});
                        response.end(data);
                    }
                });
                break;
            case "/addarea":
                fs.readFile(path.html + "/AddArea.html", function(err, data){
                    if(err){
                        response.writeHead(404,"Not found");
                        response.end();
                    }
                    else{
                        response.writeHead(200, {'content-type':mimeType.html});
                        response.end(data);
                    }
                });
                break;
            case "/deletearea":
                fs.readFile(path.html + "/DeleteArea.html", function(err, data){
                    if(err){
                        response.writeHead(404,"Not found");
                        response.end();
                    }
                    else{
                        response.writeHead(200, {'content-type':mimeType.html});
                        response.end(data);
                    }
                });
                break;
            default:
                break;
        }
    }
    else if(request.method == "POST"){
        request.on('data',function(chunk){
            var urlFull = request.url + "?" + chunk;
            var model = url.parse(urlFull,true).query;
            switch(URL.pathname.toLowerCase()){
                case "/addfestival":

                    break;
                default:
                    break;
            }
        });
    }

}).listen(8080);
console.log("Server running at http://loaclhost:8080");