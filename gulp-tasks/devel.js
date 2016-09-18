// Development tasks 
var gulp = require('gulp'),
	sass = require('gulp-sass'),
  concat = require('gulp-concat'),
	inject = require('gulp-inject'),
  wiredep = require('wiredep').stream;

// Compile ssas files
// Concat all sass files in a customstyle.scss and compile on css
gulp.task('sass', function () {
  return gulp
    .src(['./app/sass/colorpalette.scss', './app/sass/*.scss'])
    .pipe(concat('customstyle.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});


// Inject dependencies files into html file
gulp.task('dependencies', function () {
  return gulp
    .src('./app/index.html')
    .pipe(inject(gulp.src(['./app/css/*.css'], {read: false}), {starttag: '<!-- inject:app:{{ext}} -->', ignorePath: 'app'}))
    .pipe(inject(gulp.src(['./app/lib/*.js'], {read: false}), {starttag: '<!-- inject:lib:{{ext}} -->', ignorePath: 'app'}))    
    .pipe(inject(gulp.src(['./app/js/**/*.js', './app/shared/**/*.js', './app/components/**/*.js'], {read: false}), {starttag: '<!-- inject:app:{{ext}} -->', ignorePath: 'app'}))
    .pipe(gulp.dest('./app'));
});

// Inject bower packeages into project
gulp.task('bower', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({
      optional: 'configuration',
      goes: 'here'
    }))
    .pipe(gulp.dest('./app'));
});

// Concat inject tasks to launch
gulp.task('inject', ['dependencies', 'bower']);


// Watch devel files
gulp.task('develfiles', function(){
  gulp.watch('./app/sass/**/*.scss', ['sass']);
  gulp.watch('./app/css/*.css', ['inject']);
  gulp.watch('./app/js/*.js', ['inject']);
  gulp.watch('./app/components/**/*.js', ['inject']);
});