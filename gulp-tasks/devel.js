// Development tasks 
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	inject = require('gulp-inject');


// Compile ssas files
gulp.task('sass', function () {
  return gulp
  	.src('./../app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});

// Inject files into html file
gulp.task('inject', function () {
	return gulp
		.src('./../app/index.html')
		.pipe(inject(gulp.src('./../app/**/*.css', {read: false}), {ignorePath: 'app'}))
		.pipe(gulp.dest('./app'));
});

