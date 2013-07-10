// New version
var path = require('path');
module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.


// Old version (check if it needs to be removed)
var url = require('url');
exports.datadir = __dirname + "data/sites.txt"; // tests will need to override this.


module.exports.handleRequest = function (req, res) {
  console.log(exports.datadir);

  var path = url.parse(req.url).path;

  if (path === '/') {
    if (req.method === 'POST') {
      req.setEncoding('utf8');
      req.on('data', function(data) {
        data = data.replace(/^url=/, '');
        console.log(data);
      });
    }
    require('fs').readFile('./public/index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });
  } else if (path.match(/\.css$/)) {
      require('fs').readFile('./public' + path, function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.end(data);
    });
  }
};
