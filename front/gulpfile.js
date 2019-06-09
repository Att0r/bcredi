var gulp = require('gulp'),
   sass = require('gulp-ruby-sass'),
   autoprefixer = require('gulp-autoprefixer'),
   minifycss = require('gulp-minify-css'),
   jshint = require('gulp-jshint'),
   uglify = require('gulp-uglify'),
   rename = require('gulp-rename'),
   concat = require('gulp-concat'),
   notify = require('gulp-notify'),
   cache = require('gulp-cache'),
   livereload = require('gulp-livereload'),
   del = require('del'),
   connect = require('gulp-connect'),
   os = require('os'),
   open = require('gulp-open');

gulp.task('styles', function() {
  return sass('assets/sass/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('styles'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('styles/minify'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src('assets/scripts/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('scripts'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('scripts/minify'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('clean', function(cb) {
    del(['css', 'js'], cb)
});

gulp.task('connect', function() {
  connect.server({
     port: 8085,
     livereload: true
  });
});

gulp.task('open', function(){
   gulp.src(__filename).pipe(open({uri: 'http://localhost:8085/pages/index.html'}));
});

gulp.task('watch', function() {
  gulp.watch('assets/sass/**/*.scss', ['styles']);
  gulp.watch('assets/scripts/**/*.js', ['scripts']);
  livereload.listen();
  gulp.watch(['pages/**', 'scripts/**', 'styles/**', 'content/**']).on('change', livereload.changed);
});

gulp.task('default', ['connect', 'watch', 'open']);
