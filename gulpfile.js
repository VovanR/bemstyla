// See: http://gulpjs.com/

var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function () {
    return gulp.src([
            './test/parser-test.js',
            './test/format-file-test.js',
            './test/format-file-name-test.js',
            './test/format-file-dir-test.js',
            './test/creator-test.js',
        ], { read: false })
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
