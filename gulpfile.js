var gulp = require('gulp'),
    del = require('del'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect'),
    runSequence = require('run-sequence'),
    rename = require("gulp-rename"),
    includeHtml = require('gulp-include-html'),
    minHtml = require('gulp-htmlmin'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    uncss = require('gulp-uncss');
    uglify = require('gulp-uglifyjs');

gulp.task('connect', function() {
  connect.server({
    root: './',
    port: 3000,
    livereload: true
  })
});

gulp.task('clean', function(cb) {
    del([
        '*.html',
        'styles.min.css',
        'scripts.min.js'
    ], cb);
});

gulp.task('templates', function(){
  return gulp.src('sources/templates/**/*.html')
        .pipe(includeHtml({
            baseDir: 'sources/templates/includes',
            ignore: 'sources/templates/includes'
        }))
        .pipe(minHtml({collapseWhitespace: true}))
        .pipe(gulp.dest('./'))
        .pipe(connect.reload());
});

gulp.task('styles', function () {
    return gulp.src('sources/styles/_pack.less')
        .pipe(less())
        .pipe(autoprefixer({browsers:['last 2 versions']}))
        .pipe(rename('styles.min.css'))
        .pipe(csso())
        .pipe(gulp.dest('./'))
        .pipe(connect.reload());
});

gulp.task('scripts', function() {
    return gulp.src('sources/scripts/**/*.js')
        .pipe(uglify('scripts.min.js', {
            mangle: false
        }))
        .pipe(gulp.dest('./'))
        .pipe(connect.reload());
});

gulp.task('data', function() {
    return gulp.src('data/**/*.json')
        .pipe(connect.reload());
});

gulp.task('uncss', function() {
    return gulp.src('styles.min.css')
        .pipe(uncss({
            ignore: [
                /\w\.in/,
                ".fade",
                ".collapse",
                ".collapsing",
                /(#|\.)navbar(\-[a-zA-Z]+)?/,
                /(#|\.)dropdown(\-[a-zA-Z]+)?/,
                /(#|\.)(open)/,
                ".modal",
                ".modal.fade.in",
                ".modal-dialog",
                ".modal-document",
                ".modal-scrollbar-measure",
                ".modal-backdrop.fade",
                ".modal-backdrop.in",
                ".modal.fade.modal-dialog",
                ".modal.in.modal-dialog",
                ".modal-open",
                ".in",
                ".modal-backdrop"
            ],
            html: ['*.html']
        }))
        .pipe(csso())
        .pipe(gulp.dest('./'));
});

gulp.task('watch', ['connect'], function () {
    gulp.watch('sources/templates/**/*.html', ['templates']);
    gulp.watch('sources/styles/**/*.less', ['styles']);
    gulp.watch('sources/scripts/*.js', ['scripts']);
    gulp.watch('data/**/*.json', ['data']);
});

gulp.task('default', function(callback) {
    runSequence('clean', 'templates', 'styles', 'scripts', callback);
});