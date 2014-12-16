'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    karma = require('karma').server,
    order = require('gulp-order'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    addsrc = require('gulp-add-src'),
    minifyCSS = require('gulp-minify-css'),
    fs = require('fs');


var config = {
    'js': {
        'src': './assets/javascripts/src/**/*.js',
        'dest': './assets/javascripts/',
        'fileName': 'all.min.js',
        'order': [
            'assets/vendor/angular/angular.min.js',
            'javascripts/src/app.js',
            'javascripts/src/services/*.js',
            'javascripts/src/controllers/*.js'
        ],
        'vendor': './assets/vendor/angular/angular.min.js'
    },

    'css': {
        'src': './assets/vendor/todomvc-common/base.css',
        'dest': './assets/stylesheets/',
        'fileName': 'min.css'
    },

    'spec': {
        'src': './test/spec/**/*Spec.js'
    }
};

gulp.task('jshint', function() {
    return gulp.src(config.js.src)
        .pipe(addsrc(config.spec.src))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('karma', function(done) {
    console.log(done);
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('minifyJs', function() {

    // Delete old file
    fs.unlink(config.js.dest + config.js.fileName);

    gulp.src(config.js.vendor)
        .pipe(addsrc(config.js.src))
        .pipe(order(config.js.order, { base: './' }))
        .pipe(concat(config.js.fileName))
        .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest(config.js.dest));
});

gulp.task('minifyCss', function() {

    // Delete old file
    fs.unlink(config.css.dest + config.css.fileName);

    gulp.src(config.css.src)
        .pipe(concat(config.css.fileName))
        .pipe(minifyCSS())
        .pipe(gulp.dest(config.css.dest));
});

gulp.task('minify', ['minifyJs', 'minifyCss']);
gulp.task('test', ['jshint', 'karma']);
gulp.task('default', ['minify', 'test']);