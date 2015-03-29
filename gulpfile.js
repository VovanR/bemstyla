// See: http://gulpjs.com/

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jsonlint = require('gulp-jsonlint');

gulp.task('test', function () {
    return gulp.src('./test/**/*.js', { read: false })
        .pipe(mocha({
            reporter: 'nyan',
        }));
});

gulp.task('jsonlint', function () {
    gulp.src('./test/test-cases.json')
        .pipe(jsonlint())
        .pipe(jsonlint.reporter());
});

gulp.task('watch', function () {
    gulp.watch(['./index.js', './test/**/*.js'], ['test']);
    gulp.watch(['./test/test-cases.json'], ['jsonlint', 'test']);
});

gulp.task('default', ['jsonlint', 'test', 'watch']);
