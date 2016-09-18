var gulp = require('gulp'),
	webserver = require('gulp-webserver'),
	requireDir = require('require-dir');

requireDir('./gulp-tasks');

// Web server
gulp.task('webserver', function() {
	gulp.src('app')
		.pipe(webserver({
			livereload: true,
			open: true
		}));
});

