'use strict'

var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var HTMLmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var es = require('event-stream');

// JavaScript linting task
gulp.task('jshint', function() {
	return gulp.src(['js/main.js', 'js/app.js'])
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

// Compile Sass task
gulp.task('sass', function() {
	return gulp.src('scss/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('css'));
});

// Watch task
gulp.task('watch', function() {
	gulp.watch(['js/main.js', 'js/app.js'], ['jshint']);
	gulp.watch('scss/*.scss', ['sass']);
});

// Default task
gulp.task('default', ['jshint', 'sass', 'watch']);

// Minify index
gulp.task('html', function() {
	return gulp.src('index.html')
	.pipe(HTMLmin())
	.pipe(minifyHTML())
	.pipe(gulp.dest('build/'));
});

// JavaScript build task, removes whitespace and concatenates all files
gulp.task('scripts', function() {
	var home = browserify(['js/main.js', 'js/app.js'])
	.bundle()
	.pipe(source('scripts.js'))
	.pipe(gulp.dest('js'));

	var build = browserify(['js/main.js', 'js/app.js'])
	.bundle()
	.pipe(source('scripts.js'))
	.pipe(buffer())
	.pipe(uglify())
	.pipe(gulp.dest('build/js'));

	return es.concat(home, build);
});


// // JavaScript build task, removes whitespace and concatenates all files
// gulp.task('scripts', function() {
// 	return browserify(['js/main.js', 'js/app.js'])
// 	.bundle()
// 	.pipe(source('scripts.js'))
// 	.pipe(buffer())
// 	.pipe(uglify())
// 	.pipe(gulp.dest('build/js'));
// });




// Styles build task, concatenates all files
gulp.task('styles', function() {
	return gulp.src('css/styles.css')
	.pipe(concat('styles.css'))
	.pipe(cssnano())
	.pipe(gulp.dest('build/css'));
});

// Image optimization task
gulp.task('images', function() {
	return gulp.src('images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/images'));
});

// Build task
gulp.task('build', ['jshint', 'sass', 'html', 'scripts', 'styles', 'images']);