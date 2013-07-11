var http = require('http-get');
var fs = require('fs');
var absPath = '/Users/hackreactor/code/maxmalin/2013-06-web-historian/';

exports.readUrls = function(filePath, cb){
  fs.readFile(filePath, 'utf8', function(err, data) {
    var urls = data.split('\n');
    for (var i = 0; i < urls.length; i++) {
      fs.existsSync(absPath + 'data/sites/' + urls[i] + '.html') && (urls[i] = 0);
    }
    urls.pop();
    cb(urls);
  });
};

exports.downloadUrls = function(urls){
  for (var i = 0; i < urls.length; i++) {
    if (urls[i]) {
      var options = {url: urls[i]};
      http.get(options, absPath + 'data/sites/' + urls[i] + '.html', function (error) {
        if (error) {
          console.log(error);
        }
      });
    }
  }
};

// Set up a cron job
// * * * * * /opt/boxen/nodenv/shims/node /Users/hackreactor/code/maxmalin/2013-06-web-historian/workers/htmlfetcher.js
