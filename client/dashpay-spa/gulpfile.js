var browserify = require('browserify'),
    watchify = require('watchify'),
    stringify = require('stringify'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    sourceFile = './js/app.js',
    destFolder = './',
    destFile = 'bundle.js';

gulp.task('browserify', function() {
  return browserify(sourceFile) .transform(stringify, {
        appliesTo: { includeExtensions: ['.html'] },
        minify: true
    })
  .bundle()
  .pipe(source(destFile))
  .pipe(gulp.dest(destFolder));
});

//
//// Rerun the task when a file changes
//gulp.task('watch2', function() {
//  gulp.watch('./js/**/*', ['browserify']);
//
//});
//gulp.task('watch', function() {
//  var bundler = watchify(sourceFile);
//  bundler.on('update', rebundle);
//
//  function rebundle() {
//    return bundler.bundle()
//      .pipe(source(destFile))
//      .pipe(gulp.dest(destFolder));
//  }
//
//  return rebundle();
//});

//gulp.task('default', ['browserify', 'watch2']);
gulp.task('default', ['browserify']);