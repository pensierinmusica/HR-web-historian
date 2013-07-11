var path = require('path');
var url = require('url');
var fs = require('fs');
var absPath = '/Users/hackreactor/code/maxmalin/2013-06-web-historian/';
module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.


module.exports.handleRequest = function (req, res) {
  var urlPath = url.parse(req.url).path;
  if (urlPath === '/') {
    if (req.method === 'POST') {
      req.setEncoding('utf8');
      req.on('data', function(url) {
        url = url.replace(/^url=/, '');
        fs.appendFile(absPath + 'data/sites.txt', url + '\n');
      });
    }
    fs.readFile(absPath + 'web/public/index.html', 'utf8', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });

  } else if (urlPath.match(/\.css$/)) {
    fs.readFile(absPath + 'web/public/' + urlPath, function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.end(data);
    });
  } else if (urlPath.match(/^\/.*/)) {
    fs.exists(absPath + 'data/sites' + urlPath + '.html', function(exists) {
      if (exists) {
        fs.readFile(absPath + 'data/sites' + urlPath + '.html', function(err, data) {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(data);
        });
      } else {
        res.writeHead(404);
        res.end();
      }
    });

  }
};
