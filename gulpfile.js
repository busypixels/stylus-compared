var gulp = require("gulp"),
  connect = require("gulp-connect"),
  path = require('path'),
  ghPages = require('gulp-gh-pages'),
  clean = require('gulp-clean'),
  runSequence = require('run-sequence');

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

  return gulp.src(['src/**/*.sass'])
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

  templatizer('./src/**/*.jade', './dest/templatizer.js', {
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
  gulp.watch(['src/**/*.js'], ['copy-js']);
});

gulp.task('connect', function() {
  connect.server({
    root: ['dest'],
    livereload: true
  });
});

gulp.task('clean', function () {
  'use strict';
  return gulp.src(['dest'], {read: false})
    .pipe(clean({
      force: true
    }));
});

gulp.task('deploy', function() {
  return gulp.src('./dest/**/*')
    .pipe(ghPages());
});

gulp.task('copy-js', function() {
  gulp.src('src/js/**/*')
   .pipe(gulp.dest('./dest/js/'));

  gulp.src('bower_components/**/*')
    .pipe(gulp.dest('./dest/'));
});

gulp.task('gh-pages', function(callback) {
  runSequence(
    ['clean'],
    ['stylus', 'jade'],
    ['templatizer'],
    ['copy-js'],
    ['deploy'],
    callback);
});

gulp.task('default', function(callback) {
  runSequence(
    ['clean'],
    ['stylus', 'stylint', 'jade'],
    ['less', 'sass'],
    ['jade'],
    ['templatizer'],
    ['copy-js'],
    ['connect', 'watch'],
    callback);
});
