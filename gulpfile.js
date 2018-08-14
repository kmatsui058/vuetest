var gulp = require("gulp");
// css
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var plumber = require("gulp-plumber");
var sourcemaps = require('gulp-sourcemaps');
// js
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
gulp.task('sass', function() {
  gulp.src('html/assets/scss/**/*scss')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer({
          browsers: ['last 2 versions', 'ie >= 8', 'Android >= 4','ios_saf >= 8'],
          cascade: false
      }))
      .pipe(sourcemaps.write('../maps'))
      .pipe(gulp.dest('./html/assets/dist/css'));
});
 
gulp.task('build', function() {
    browserify({
        'entries': ['./html/assets/js/main.js']
    })
        .bundle()
        .pipe(plumber())
        .pipe(source('./html/assets/dist/app.js'))
        .pipe(gulp.dest('./'));
});
 
gulp.task('default', function() {
  gulp.watch("html/assets/scss/**/*.scss",["sass"]);
  gulp.watch(["html/assets/js/**/*.js", "html/assets/js/**/*.vue"],["build"]);
});