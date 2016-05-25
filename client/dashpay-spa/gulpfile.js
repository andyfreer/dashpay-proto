var bake = require('gulp-bake'),
    browserify = require('browserify'),
    del = require('del'),
    gulp = require('gulp'),
    pump = require('pump'),
    rename = require("gulp-rename"),
    runSequence = require('run-sequence'),
    source = require('vinyl-source-stream'),
    stringify = require('stringify'),
    uglify = require('gulp-uglify'),
    watchify = require('watchify');

// settings
var inputJS = './js/app.js',
    outputJS = 'bundle.js',
    inputHTML = 'index.html',
    outputHTML = 'DashPay.html',
    outputFolder = './dist';

gulp.task('build-all', function() {
    // build all tasks in sequence
    runSequence(
        'pre-clean',
        'browserify',
        //'compress',
        'bake',
        'rename',
        'post-clean'
    );
});

gulp.task('pre-clean', function() {
    // delete existing build
    return del([outputFolder]);
});

gulp.task('browserify', function() {
    // build the JS
    var bundleStream = browserify(inputJS).transform(stringify, {
        appliesTo: { includeExtensions: ['.html'] }
    }).bundle();
    return bundleStream
        .pipe(source(outputJS))
        .pipe(gulp.dest(outputFolder))
})

gulp.task('compress', function (cb) {
    // compress the JS
    pump([
            gulp.src(outputFolder + '/' + outputJS),
            uglify(),
            gulp.dest(outputFolder)
        ],
        cb
    );
});

gulp.task('bake',function() {
    // bake assets to the output html file
    return gulp.src('./' + inputHTML)
        .pipe(bake({
            "//JSBundleToken": outputFolder + '/' + outputJS,
            "/*BootstrapCSSToken*/" : "./node_modules/bootstrap/dist/css/bootstrap.min.css"
        }))
        .pipe(gulp.dest(outputFolder));
});

gulp.task('rename', function() {
    // rename the output html file
    return gulp.src(outputFolder + '/' + inputHTML)
        .pipe(rename(outputHTML))
        .pipe(gulp.dest(outputFolder));
});

gulp.task('post-clean', function() {
    // clean everything in the output folder except the output html file
    return del.sync([outputFolder + '/' +'/**', '!' + outputFolder, '!' + outputFolder + '/' + outputHTML]);
});

gulp.task('default', ['build-all']);

//
//// Rerun the task when a file changes
//gulp.task('watch2', function() {
//  gulp.watch('./js/**/*', ['build-all']);
//
//});
//gulp.task('watch', function() {
//  var bundler = watchify(inputJS);
//  bundler.on('update', rebundle);
//
//  function rebundle() {
//    return bundler.bundle()
//      .pipe(source(outputJS))
//      .pipe(gulp.dest(outputFolder));
//  }
//
//  return rebundle();
//});
