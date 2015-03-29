// See: http://gulpjs.com/

var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function () {
    gulp.src('./test/**/*.js', { read: false })
        .pipe(mocha({
            reporter: 'nyan',
        }));
});

gulp.task('watch', function () {
    gulp.watch(['./index.js', './test/**/*.js'], ['test']);
});

gulp.task('default', ['watch']);
