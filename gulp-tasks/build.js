// Build tasks
var gulp = require('gulp'),
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	cleanCss = require('gulp-clean-css'),
	clean = require('gulp-clean'),
  htmlmin = require('gulp-htmlmin'),  
  mainBowerFiles = require('main-bower-files'),
	manifest = require('gulp-manifest');

//
// Clean public directory
// 
gulp.task('clean', function(){
  return gulp
    .src('./public/*', {read: false})
    .pipe(clean());
});

//
// Generate html file. Minify and uglify js files and minify css
// 
gulp.task('html', function () {
    return gulp.src('./app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCSS()))
        .pipe(gulp.dest('public'));
});

//
// Copy bower files to public folder
// 
gulp.task('bower-files', function() {
    return gulp.src(mainBowerFiles(), { base: './app/bower_components' })
        .pipe(gulp.dest('./public/bower_components'));
});

//
// Add project components and minify html files
// 
gulp.task('project_components', function () {
  return gulp.src('./app/components/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./public/components'));
});

//
// Add shared components and minify html files
// 
gulp.task('shared_components', function () {
  return gulp.src('./app/shared/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))  
    .pipe(gulp.dest('./public/shared'));
});

//
// Copy fonts to public foldes
// 
gulp.task('fonts', function () {
  return gulp.src(['./app/fonts/*.{eot,svg,ttf,woff,woff2}', './app/bower_components/bootstrap/fonts/*.{eot,svg,ttf,woff,woff2}'])
    .pipe(gulp.dest('./public/fonts'));
});

//
// Copy images to public foldes
// 
gulp.task('images', function () {
  return gulp.src('./app/images/*')
    .pipe(gulp.dest('./public/images'));
});

//
// Build application
// 
gulp.task('buildapp', ['html', 'bower-files', 'project_components', 'shared_components', 'fonts', 'images']);

//
// Create manifest file after build application
// 
gulp.task('manifest', ['buildapp'], function(){
  return gulp
    .src(['public/**/*'], { base: './public' })
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

//
// Generate project
// 
gulp.task('public', ['manifest']);


