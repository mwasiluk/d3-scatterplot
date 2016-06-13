var gulp = require('gulp');
var del = require('del');
var merge = require('merge-stream');
var plugins = require('gulp-load-plugins')();

gulp.task('clean', function (cb) {
    return del(['tmp', 'dist'], cb);
});

gulp.task('build-css', ['clean'], function () {
    return gulp.src('./styles/*')
        .pipe(plugins.plumber({ errorHandler: onError }))
        .pipe(plugins.sass())
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', function() {

});

// error function for plumber
var onError = function (err) {
    console.log(err);
    this.emit('end');
};