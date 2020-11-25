// https://stackoverflow.com/questions/38332094/how-can-i-mock-webpacks-require-context-in-jest
// Needs a better solution, but works for now
// modified by me @dolgit
const req = {}
if (typeof req.context === 'undefined') {
  const fs = require('fs');
  const path = require('path');

  req.context = (base = '.', scanSubDirectories = false, regularExpression = /\.js$/, dirname) => {
    const files = {};

    function readDirectory(directory) {
      fs.readdirSync(directory).forEach((file) => {
        const fullPath = path.resolve(directory, file);

        if (fs.statSync(fullPath).isDirectory()) {
          if (scanSubDirectories) readDirectory(fullPath);

          return;
        }

        if (!regularExpression.test(fullPath)) return;

        files[fullPath] = true;
      });
    }

    readDirectory(path.resolve(dirname, base));

    const address = path.resolve(dirname, base)

    function Module(file) {
      return require(file);
    }

    Module.keys = () => Object.keys(files);
    Module.resolve = path.resolve;

    return Module;
  };
}
module.exports = req
