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
  gulp.watch(['src/**/*.styl'], ['stylus', 'stylint', 'build']);
  gulp.watch(['src/**/*.jade'], ['jade', 'templatizer', , 'build']);
  gulp.watch(['src/**/*.less'], ['less','build']);
  gulp.watch(['src/**/*.sass'], ['sass','build']);
});

gulp.task('connect', function() {
  connect.server({
    root: ['dest'],
    livereload: true
  });
});

gulp.task('clean', function () {
  return gulp.src(['.publish'], {read: false})
    .pipe(clean());
});

gulp.task('deploy', function() {
  return gulp.src('./dest/**/*')
    .pipe(ghPages());
});

gulp.task('build', function() {
  gulp.src(['dest/**/*', 'bower_components/**/*', 'temp/**/*', 'src/**/*'])
   .pipe(gulp.dest('./dest'));
});

gulp.task('gh-pages', function(callback) {
  runSequence(
    ['clean'],
    ['build'],
    ['deploy'],
    callback);
});

gulp.task('default', [
  'clean',
  'stylus',
  'stylint',
  'less',
  'sass',
  'jade',
  'templatizer',
  'build',
  'connect',
  'watch'
]);
