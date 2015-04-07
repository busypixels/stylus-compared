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

gulp.task('watch', function () {
  gulp.watch(['styl/**/*.styl'], ['stylus', 'stylint']);
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
  'connect',
  'watch'
]);
