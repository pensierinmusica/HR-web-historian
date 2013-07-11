var http = require('http-get');
var fs = require('fs');
var absPath = '/Users/hackreactor/code/maxmalin/2013-06-web-historian/';

exports.readUrls = function(filePath, cb){
  fs.readFile(filePath, 'utf8', function(err, data) {
    console.log('URLs list start: ' + JSON.stringify(data));
    var urls = data.split('\n');
    console.log('URLs list mid: ' + JSON.stringify(urls));
    for (var i = 0; i < urls.length; i++) {
      console.log(fs.existsSync(absPath + 'data/sites/' + urls[i]));
      fs.existsSync(absPath + 'data/sites/' + urls[i]) && (urls[i] = 0);
    }
    urls.pop();
    console.log('URLs list end: ' + JSON.stringify(urls));
    cb(urls);
  });
};

exports.downloadUrls = function(urls){
  for (var i = 0; i < urls.length; i++) {
    if (urls[i]) {
      var options = {url: urls[i]};
      http.get(options, absPath + 'data/sites/' + urls[i], function (error, result) {
        if (error) {
          console.error(error);
        } else {
          console.log('File downloaded at: ' + result.file);
        }
      });
    }
  }
};

// Set up a cron job
// * * * * * /opt/boxen/nodenv/shims/node /Users/hackreactor/code/maxmalin/2013-06-web-historian/workers/htmlfetcher.js
