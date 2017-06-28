var fs = require('fs');
var path = require('path');
var pkg = require('../package');

var buildpath = path.join(__dirname, '../', pkg['main-build']);
var srcpath = path.join(__dirname, '../', pkg['main-src']);

var enableSrc = !!process.env['ALLOWSRC'];

var rundev = !!process.env['RUNDEV'];

module.exports = (function () {
  if (fs.existsSync(buildpath) && !rundev)
    return require(buildpath);
  if (enableSrc || rundev)
    return require(srcpath);
  console.error('Not built!');
  return process.exit(-1);
})();