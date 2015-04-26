var gulp = require("gulp"),
  connect = require("gulp-connect"),
  path = require('path');

gulp.task('stylus', function () {
  var stylus = require("gulp-stylus"),
    flatten = require('gulp-flatten'),
    nib = require('nib'),
    jeet = require('jeet'),
    rupture = require('rupture');

  return gulp.src(['src/**/*.styl', '!**/_*', '!./styl/lib/**/*.styl'])
    .pipe(stylus({use: [nib(), jeet(), rupture()]}))
    .pipe(flatten())
    .pipe(gulp.dest('./dest/css'))
    .pipe(connect.reload());
});

gulp.task('stylint', function() {
  var stylint = require('gulp-stylint');
  return gulp.src(['src/**/*.styl', '!./src/styl/lib/**/*.styl'])
    .pipe(stylint({config: '.stylintrc'}))
});

gulp.task('sass', function () {
  var sass = require('gulp-sass');

  gulp.src(['src/**/*.sass'])
    .pipe(sass({indentedSyntax: true}))
    .pipe(gulp.dest('./dest/css'));
});

gulp.task('less', function () {
  var less = require('gulp-less');

  return gulp.src(['src/**/*.less', '!src/**/_*', '!./src/less/lib/**/*.less'])
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./dest/css'));
});

gulp.task('templatizer', function() {
  var templatizer = require('templatizer');

  templatizer('./src/**/*.jade', './temp/templatizer.js', {
    namespace: 'App',
    dontremoveMixins: true
  });
});

gulp.task('jade', function() {
  var jade = require('gulp-jade'),
    gutil = require('gulp-util');

  gulp.src(['./src/templates/**/*.jade', '!./src/templates/**/_*.jade'])
    .pipe(jade())
    .on('error', gutil.log)
    .pipe(gulp.dest('./dest'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['src/**/*.styl'], ['stylus', 'stylint']);
  gulp.watch(['src/**/*.jade'], ['jade', 'templatizer']);
  gulp.watch(['src/**/*.less'], ['less']);
  gulp.watch(['src/**/*.sass'], ['sass']);
});

gulp.task('connect', function() {
  connect.server({
    root: ['bower_components', 'temp', 'src', 'dest'],
    livereload: true
  });
});

gulp.task('default', [
  'stylus',
  'stylint',
  'less',
  'sass',
  'jade',
  'templatizer',
  'connect',
  'watch'
]);
