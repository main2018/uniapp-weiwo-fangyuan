var http = require('http');
// var static = require('node-static');
let url = require('url');
var path = require('path');
const fs = require('fs')
 
//
// Create a node-static server instance to serve the './public' folder
//
// var file = new static.Server('./unpackage/dist/build/h5')
//添加MIME类型
var MIME_TYPE = {
  "css": "text/css",
  "gif": "image/gif",
  "html": "text/html",
  "ico": "image/x-icon",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "js": "text/javascript",
  "json": "application/json",
  "pdf": "application/pdf",
  "png": "image/png",
  "svg": "image/svg+xml",
  "swf": "application/x-shockwave-flash",
  "tiff": "image/tiff",
  "txt": "text/plain",
  "wav": "audio/x-wav",
  "wma": "audio/x-ms-wma",
  "wmv": "video/x-ms-wmv",
  "xml": "text/xml"
};

const port = 8888
http.createServer(function (req, res) {
  const staticPath = path.resolve(__dirname, 'unpackage/dist/build/h5')
  let pathname = url.parse(req.url).pathname; // 形如`/index.html`
  pathname = req.url==="/" ? 'index.html' : pathname
  var filePath = path.join(staticPath, pathname);
  // console.log('收到对文件 ' + pathname + '的请求');
  // 读取文件内容, 也可先使用fs.exists检查文件是否存在
  fs.readFile(filePath, (err, data) => {
    var ext = path.extname(filePath);
    ext = ext?ext.slice(1) : 'unknown';
    var contentType = MIME_TYPE[ext] || "text/plain";
    if (err) {
      // console.log('文件读取失败：' + err);
      // 设置404响应
      // res.writeHead(404, {
      //   'Content-Type': 'text/html'
      // });
      send404(res)
    }
    else {
      // 状态码：200
      res.writeHead(200, {
        'Content-Type': contentType
      });
      // 响应文件内容
      res.write(data.toString());
    }
    // 发送响应
    res.end();
  });
}).listen(port);

function send404(res){
  res.end("<h1>404</h1><p>file not found</p>")
}

// 终端打印如下信息
console.log(`Server running at http://127.0.0.1:${port}/`);