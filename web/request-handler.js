// New version
var path = require('path');
module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.


// Old version (check if it needs to be removed)
var url = require('url');
var fs = require('fs');
var absPath = '/Users/hackreactor/code/maxmalin/2013-06-web-historian/';
exports.datadir = __dirname + "data/sites.txt"; // tests will need to override this.


module.exports.handleRequest = function (req, res) {
  console.log(exports.datadir);

  var path = url.parse(req.url).path;
  console.log(path);
  if (path === '/') {
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

  } else if (path.match(/\.css$/)) {
    fs.readFile(absPath + 'web/public/' + path, function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.end(data);
    });
  }
};
