/**
 * Created by ben on 07/01/2017.
 */

/**
 * gulpfile.js
 *
 * Controls the gulp task runner through terminal commands
 *
 */

"use strict";

var sassDir = 'sass/',
    sassFile = 'style.scss',
    sassMain = sassDir.concat(sassFile),
    cssDir = './',
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sassify = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    del = require('del')

gulp.task('sass', function () {
    return gulp.src([
            sassMain
        ])
        .on('error', swallowError)
        .pipe(maps.init())
        .pipe(sassify({outputStyle: 'compressed'}))
        .pipe(maps.write('./'))
        .pipe(gulp.dest(cssDir))
});

gulp.task('watch', function () {
    gulp.watch('sass/**/*.scss', ['sass'])
});

function swallowError (error) {
    console.log(error.toString());
    this.emit('end');
}

gulp.task('build', function () {
    return gulp.src([
            'css/style.css*',
            'img/**',
            '*.php',
            '*.js',
            '*.md',
            '*.txt',
            '*.css',
            '*.css*',
            '*.png'
        ],
        {base: './'})
        .pipe(gulp.dest('dist'))
});

gulp.task('default', function () {
    gulp.start('watch');
});