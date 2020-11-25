'use strict';

// https://stackoverflow.com/questions/38332094/how-can-i-mock-webpacks-require-context-in-jest
// Needs a better solution, but works for now
// modified by me @dolgit
var req = {};
if (typeof req.context === 'undefined') {
  var fs = require('fs');
  var path = require('path');

  req.context = function () {
    var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.';
    var scanSubDirectories = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var regularExpression = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : /\.js$/;
    var dirname = arguments[3];

    var files = {};

    function readDirectory(directory) {
      fs.readdirSync(directory).forEach(function (file) {
        var fullPath = path.resolve(directory, file);

        if (fs.statSync(fullPath).isDirectory()) {
          if (scanSubDirectories) readDirectory(fullPath);

          return;
        }

        if (!regularExpression.test(fullPath)) return;

        files[fullPath] = true;
      });
    }

    readDirectory(path.resolve(dirname, base));

    var address = path.resolve(dirname, base);

    function Module(file) {
      return require(file);
    }

    Module.keys = function () {
      return Object.keys(files);
    };
    Module.resolve = path.resolve;

    return Module;
  };
}
module.exports = req;