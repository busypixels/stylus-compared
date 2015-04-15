var gulp = require("gulp"),
  connect = require("gulp-connect"),
  stylus = require("gulp-stylus"),
  stylint = require('gulp-stylint');

gulp.task('stylus', function () {
  return gulp.src(['./styl/**/*.styl', '!styl/**/_*'])
    .pipe(stylus())
    // .pipe(stylus({use: [nib(), jeet(), rupture()]}))
    .pipe(gulp.dest('./css'))
    .pipe(connect.reload());
});

gulp.task('stylint', function() {
  return gulp.src('styl/**/*.styl')
    .pipe(stylint())
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
  gulp.watch(['styl/**/*.styl'], ['stylus', 'stylint']);
  gulp.watch(['templates/**/*.jade'], ['jade']);
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
  'connect',
  'watch'
]);
