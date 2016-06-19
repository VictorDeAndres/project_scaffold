var gulp = require('gulp'),
	webserver = require('gulp-webserver'),
	sass = require('gulp-sass'),
	inject = require('gulp-inject'),
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	cleanCss = require('gulp-clean-css'),
	clean = require('gulp-clean');

var paths = {
	public: [
		'./public/*.html' ,
		'./public/**/*.js', 
		'./public/**/*.css']
}

gulp.task('webserver', function() {
	gulp.src('app')
		.pipe(webserver({
			livereload: true,
			open: true
		}));
});

 
gulp.task('sass', function () {
  return gulp.src('./app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});


gulp.task('inject', function () {
	gulp.src('./app/index.html')
		.pipe(inject(gulp.src('./app/**/*.css', {read: false}), {ignorePath: 'app'}))
		.pipe(gulp.dest('./app'));
});


gulp.task('watch', function(){
	gulp.watch('./app/sass/**/*.scss', ['sass']);
	gulp.watch('./app/css/**/*.css', ['inject']);
});

gulp.task('clean', function(){
	return gulp.src(paths.public, {read: false})
		.pipe(clean());
});


gulp.task('build', function () {
    return gulp.src('./app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCss()))
        .pipe(gulp.dest('public'));
});