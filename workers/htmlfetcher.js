// eventually, you'll have some code here that uses the tested helpers 
// to actually download the urls you want to download.
var fetcher = require('./lib/html-fetcher-helpers.js');
var absPath = '/Users/hackreactor/code/maxmalin/2013-06-web-historian/';

fetcher.readUrls(absPath + 'data/sites.txt', fetcher.downloadUrls);