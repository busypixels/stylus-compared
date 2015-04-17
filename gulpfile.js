var gulp = require("gulp"),
  connect = require("gulp-connect");

gulp.task('stylus', function () {
  var stylus = require("gulp-stylus"),
    flatten = require('gulp-flatten');

  return gulp.src(['**/*.styl', '!**/_*', '!./styl/lib/**/*.styl', '!./node_modules/**/*.styl'])
    .pipe(stylus())
    .pipe(flatten())
    // .pipe(stylus({use: [nib(), jeet(), rupture()]}))
    .pipe(gulp.dest('./css'))
    .pipe(connect.reload());
});

gulp.task('stylint', function() {
  var stylint = require('gulp-stylint');
  return gulp.src(['**/*.styl', '!./styl/lib/**/*.styl', '!./node_modules/**/*.styl'])
    .pipe(stylint())
});

gulp.task('templatizer', function() {
  var templatizer = require('templatizer');

  templatizer('./**/*.jade', './temp/templatizer.js', {
    namespace: 'App',
    dontremoveMixins: true
  });
});

gulp.task('jade', function() {
  var jade = require('gulp-jade'),
    gutil = require('gulp-util');

  gulp.src(['./templates/**/*.jade', '!./templates/**/_*.jade'])
    .pipe(jade())
    .on('error', gutil.log)
    .pipe(gulp.dest('./'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['**/*.styl'], ['stylus', 'stylint']);
  gulp.watch(['**/*.jade'], ['jade', 'templatizer']);
});

gulp.task('connect', function() {
  connect.server({
    root: [__dirname],
    livereload: true
  });
});

gulp.task('default', [
  'stylus',
  'stylint',
  'jade',
  'templatizer',
  'connect',
  'watch'
]);
