var http = require('http');
var fs = require('fs');
var path = require('path');

const httpServer = http.createServer(serverHandler);

function serverHandler(req, res) {
  // Determine the file path based on the request URL
  var filePath = 'wdd230f' + (req.url === '/' ? '/index.html' : req.url);
  var ext = path.extname(filePath);

  // Set the appropriate content type based on the file extension
  var contentType = 'text/plain';
  switch (ext) {
    case '.html':
      contentType = 'text/html';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.gif':
      contentType = 'image/gif';
      break;
  }

  // Read and serve the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('File not found');
      res.end();
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.write(data);
      res.end();
    }
  });
}

httpServer.listen(3000, () => {
  console.log('PORT is 3000');
});
