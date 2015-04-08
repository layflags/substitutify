var findRoot = require('find-root');
var path = require('path');
var through2 = require('through2');
var packageJson = require(path.join(findRoot(process.cwd()), 'package.json'));

function substitutify(file, options) {
  options = options || {};
  var filter = options.filter;
  delete options.filter;

  if (filter && !filter.test(file)) {
    return through2();
  }

  return through2({ objectMode: true }, function (chunk, encoding, callback) {
    var result = chunk.toString();
    var placeholder, re, value;

    for (placeholder in options) {
      if (options.hasOwnProperty(placeholder)) {
        re = new RegExp(placeholder, 'g');
        value = packageJson[options[placeholder]];
        result = result.replace(re, value);
      }
    }

    return callback(null, result);
  });
}

substitutify.configure = function (options) {
  return function (file) {
    return substitutify(file, options);
  };
};

module.exports = substitutify;

