// See: http://gulpjs.com/

var gulp = require('gulp');
var mocha = require('gulp-mocha');

var argv = require('yargs').argv;
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

// Lint all modules:
// $ gulp lint
// Lint one module:
// $ gulp lint --src lib/index.js
gulp.task('lint', function () {
    var src = argv.src;
    return gulp
        .src(
            src ||
            [
                './bin/**/*.js',
                './lib/**/*.js',
                './test/**/*.js',
                './gulpfile.js',
            ]
        )
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jscs());
});

gulp.task('test', function () {
    return gulp
        .src(
            './test/**/*.js',
            {
                read: false,
            }
        )
        .pipe(mocha({
            reporter: 'nyan',
        }));
});

gulp.task('watch', function () {
    gulp.watch([
        './lib/**/*.js',
        './test/**/*.js',
        './test/**/*.yml',
    ], ['test']);
});

gulp.task('default', ['test', 'watch']);
