var gulp = require('gulp'),
	webserver = require('gulp-webserver'),
	sass = require('gulp-sass'),
	inject = require('gulp-inject'),
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	cleanCss = require('gulp-clean-css'),
	clean = require('gulp-clean'),
	rename = require('gulp-rename'),
	bump = require('gulp-bump'),
	ngConstant = require('gulp-ng-constant'),
	manifest = require('gulp-manifest');


var paths = {
	public: [
		'./public/*.html' ,
		'./public/**/*.js', 
		'./public/**/*.css']
}

// Web server
gulp.task('webserver', function() {
	gulp.src('app')
		.pipe(webserver({
			livereload: true,
			open: true
		}));
});

 
// Development 

// Compile ssas files
gulp.task('sass', function () {
  return gulp
  	.src('./app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});

// Inject files into html file
gulp.task('inject', function () {
	return gulp
		.src('./app/index.html')
		.pipe(inject(gulp.src('./app/**/*.css', {read: false}), {ignorePath: 'app'}))
		.pipe(gulp.dest('./app'));
});

// Control version
gulp.task('bump', function(){
	return gulp
		.src('./app/config.json')
		.pipe(bump())
		.pipe(gulp.dest('./app'));
})

gulp.task('bump:minor', function(){
	return gulp
		.src('./app/config.json')
		.pipe(bump({type:'minor'})) 
		.pipe(gulp.dest('./app'));
})

gulp.task('bump:major', function(){
	return gulp
		.src('./app/config.json')
		.pipe(bump({type:'minor'})) 
		.pipe(gulp.dest('./app'));
})

// Wathc
gulp.task('watch', function(){
	gulp.watch('./app/sass/**/*.scss', ['sass']);
	gulp.watch('./app/css/**/*.css', ['inject']);
});


// Build
gulp.task('clean', function(){
	return gulp
		.src(paths.public, {read: false})
		.pipe(clean());
});

gulp.task('updateVersion', ['bump'], function() {
    var configJson = require('./app/config.json');
    return ngConstant({
            constants: configJson,
            stream: true,
            name: 'app.constants'
        })
     	.pipe(rename('appConstant.js'))
		.pipe(gulp.dest('./app/js'));
});

gulp.task('updateVersion:minor', ['bump:minor'], function() {
    var configJson = require('./app/config.json');
    return ngConstant({
            constants: configJson,
            stream: true,
            name: 'app.constants'
        })
     	.pipe(rename('appConstant.js'))
		.pipe(gulp.dest('./app/js'));
});

gulp.task('updateVersion:major', ['bump:major'], function() {
    var configJson = require('./app/config.json');
    return ngConstant({
            constants: configJson,
            stream: true,
            name: 'app.constants'
        })
     	.pipe(rename('appConstant.js'))
		.pipe(gulp.dest('./app/js'));
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

// Launch
gulp.task('build', function () {
    return gulp
    	.src('./app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCss()))
        .pipe(gulp.dest('public'));
});