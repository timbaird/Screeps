var gulp = require('gulp');

var clean = require('gulp-clean');
var concat = require('gulp-concat'); 
var jshint = require('gulp-jshint');
var minify = require('gulp-babel-minify');
var insert = require('gulp-insert');
var documentation = require('gulp-documentation');


var paths = {
		scripts: [
					'source/config/*.js',
					'source/prototypes/*.js',
					'source/classes/*.js',
					'source/managers/*.js',
					'source/main/main.js'
				 ],
		destination: 'build/'
	}

// look for and fix errors - jshint 
gulp.task('jshint', function(){
	gulp.src(paths.scripts)
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
})
	
// unit tests - gulp-jasmine, gulp-qunit, gulp-mocha, gulp-karma
// to be written


// clean the existing main.js out before remaking
gulp.task('clean', function(){

	gulp.src(paths.destination)
	.pipe(clean());
	
	gulp.src('../screeps.com/default/*.js').
	pipe(clean({force: true}));

})

var now = new Date();
var yyyy = now.getFullYear();
var MM = ((now.getMonth() + 1) < 10 ? '0' : '') + (now.getMonth() + 1);
var dd = (now.getDate() < 10 ? '0' : '') + now.getDate();
var HH = ((now.getHours()) < 10 ? '0' : '') + (now.getHours());
var mm = ((now.getMinutes()) < 10 ? '0' : '') + (now.getMinutes());
var ss = ((now.getSeconds()) < 10 ? '0' : '') + (now.getSeconds());


var update_datetime = yyyy + MM + dd + HH + mm + ss;
		

// process scripts before putting into build folder
// uglify & concat into single file for game with a timestamp of the change
gulp.task('process_script', ['jshint'], function()
{	
	gulp.src(paths.scripts)
	.pipe(concat('main.js'))
	.pipe(minify())
	//.pipe(insert.prepend('function lastScriptUpdate(){ return ' + update_datetime + '};'))
	.pipe(insert.prepend('var update_datetime = ' + update_datetime + ';'))
	.pipe(gulp.dest('./build'));
	
	
	
});

// copy script to live server folder
gulp.task('copy_to_live', ['process_script'], function()
{	
	gulp.src(paths.scripts)
	.pipe(concat('main.js'))
	.pipe(minify())
	//.pipe(insert.prepend('function lastScriptUpdate(){ return ' + update_datetime + '};'))
	.pipe(insert.prepend('var update_datetime = ' + update_datetime + ';'))
	.pipe(gulp.dest('../screeps.com/default'));
	
});


// create the doco
gulp.task('documentation', function () {
	return gulp.src(paths.scripts)
	.pipe(documentation('html', {}, {
	      name: 'Screeps',
	      version: '1.0.0'
	    }))
    .pipe(gulp.dest('./documentation'));
});

// watch tasks on config files
// when rerun config - change datestamp in code somehow to config changes only run once.

// TO BE DONE (IF WANTED)

// bring all together in default
//gulp.task('default', ['jshint', 'clean', 'process_script', 'copy_to_live', 'documentation'], function() {


gulp.task('default', ['jshint', 'clean', 'process_script','copy_to_live'], function() {
})







