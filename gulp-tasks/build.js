// Build tasks

var gulp = require('gulp'),
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	cleanCss = require('gulp-clean-css'),
	clean = require('gulp-clean'),
  mainBowerFiles = require('main-bower-files'),
	manifest = require('gulp-manifest');

gulp.task('clean', function(){
  return gulp
    .src('./public/*', {read: false})
    .pipe(clean());
});

gulp.task('manifest', function(){
	return gulp
		.src(['public/*'], { base: './' })
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

gulp.task('html', function () {
    return gulp.src('./app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCSS()))
        .pipe(gulp.dest('public'));
});

gulp.task('bower-files', function() {
    return gulp.src(mainBowerFiles(), { base: './app/bower_components' })
        .pipe(gulp.dest('./public/bower_components'));
});

gulp.task('project_components', function () {
  return gulp.src('./app/components/**/*.html')
    .pipe(gulp.dest('./public/components'));
});

gulp.task('shared_components', function () {
  return gulp.src('./app/shared/**/*.html')
    .pipe(gulp.dest('./public/shared'));
});

gulp.task('fonts', function () {
  return gulp.src(['./app/fonts/*.{eot,svg,ttf,woff,woff2}', './app/bower_components/bootstrap/fonts/*.{eot,svg,ttf,woff,woff2}'])
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('images', function () {
  return gulp.src('./app/images/*')
    .pipe(gulp.dest('./public/images'));
});

gulp.task('public', ['html', 'bower-files', 'project_components', 'shared_components', 'fonts', 'images']);



