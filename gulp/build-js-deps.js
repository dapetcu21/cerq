var config = require('./common/config');
var paths = config.paths;

var fs = require('fs.extra');
var gulp = require('gulp');

var _ = require('lodash');

var path = require('path');
var nodefn = require('when/node');
var mainBowerFiles = require('main-bower-files');


// Load all Bower components into a single package
gulp.task('bower-components:js', function () {
  var packages = {};

  _.each(mainBowerFiles({ 
    filter: '**/*.js',
  }), function (file) {
    file = path.relative(paths.client + '/bower_components', file);
    packages[file.split('/')[0]] = true;
  });

  var contents = _.map(_.keys(packages), function(pkg) {
    var req = 'require(\'' + pkg + '\');\n';
    var gl = config.bowerGlobals[pkg];
    if (typeof(gl) === 'string') {
      gl = [gl];
    } else if ((typeof(gl) !== 'object') || !(gl instanceof Array)) {
      gl = [];
    }

    if (gl.length) {
      return 'window.' + gl.join(' = window.') + ' = ' + req;
    } 
    return req;
  }).join('');

  return nodefn.call(fs.mkdirp, paths.client + '/js/lib').then(function () {
    return nodefn.call(fs.writeFile, paths.client + '/js/lib/bower-components.js', contents);
  });
});

// Run this before any JS task, because Browserify needs to bundle them in.
gulp.task('js:dependencies', ['bower-components:js'], function () {});
