// Control version tasks

var gulp = require('gulp'),
	rename = require('gulp-rename'),
	bump = require('gulp-bump'),
	ngConstant = require('gulp-ng-constant');


gulp.task('bump', function(){
	return gulp
		.src('./../app/config.json')
		.pipe(bump())
		.pipe(gulp.dest('./app'));
})

gulp.task('bump:minor', function(){
	return gulp
		.src('./../app/config.json')
		.pipe(bump({type:'minor'})) 
		.pipe(gulp.dest('./app'));
})

gulp.task('bump:major', function(){
	return gulp
		.src('./app/config.json')
		.pipe(bump({type:'minor'})) 
		.pipe(gulp.dest('./app'));
})


gulp.task('updateVersion', ['bump'], function() {
    var configJson = require('./../app/config.json');
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
    var configJson = require('./../app/config.json');
    return ngConstant({
            constants: configJson,
            stream: true,
            name: 'app.constants'
        })
     	.pipe(rename('appConstant.js'))
		.pipe(gulp.dest('./app/js'));
});

