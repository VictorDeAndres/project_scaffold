// Build tasks

var gulp = require('gulp'),
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	cleanCss = require('gulp-clean-css'),
	clean = require('gulp-clean'),
	manifest = require('gulp-manifest');

gulp.task('clean', function(){
	return gulp
		.src(paths.public, {read: false})
		.pipe(clean());
});

gulp.task('manifest', function(){
	return gulp
		.src(['public/*'], { base: './../' })
		.pipe(manifest({
			hash: true,
			preferOnline: true,
			network: ['*'],
			filename: 'app.manifest',
			exclude: 'app.manifest'
			})
		)
		.pipe(gulp.dest('public'));
});

// Launch
gulp.task('build', function () {
    return gulp
    	.src('./../app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCss()))
        .pipe(gulp.dest('public'));
});