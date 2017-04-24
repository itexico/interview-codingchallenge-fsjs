'use strict'

const del = require('del')
const gulp = require('gulp')
const sass = require('gulp-sass')
const jsdoc = require('gulp-jsdoc3')
// const uglify = require('gulp-uglify')
const uglify = require('uglify-js')
const concat = require('gulp-concat')
const jshint = require('gulp-jshint')
const nodemon = require('gulp-nodemon')
const cleanCSS = require('gulp-clean-css')
const browserSync = require('browser-sync').create()
const sourcemaps = require('gulp-sourcemaps')
const ngAnnotate = require('gulp-ng-annotate')
const templateCache = require('gulp-angular-templatecache')

const vendorFiles = require('./config_vendor.js')

/**
 *
 */
gulp.task('docs', function () {
    let config = require('./jsdoc.json')
    return gulp.src([], {read: false})
        .pipe(jsdoc(config))
})

/**
 *
 */
gulp.task('createTemplates', function () {
    console.log('Creating templates...')
    return gulp.src(['src/**/*.tpl.html'])
        .pipe(templateCache({
            module: 'ToDoChallenge'
        }))
        .pipe(gulp.dest('dist/assets/js'))
})

/**
 *
 */
gulp.task('createTemplates-watch', ['createTemplates'], function (done) {
    browserSync.reload()
    done()
})

/**
 *
 */
gulp.task('createIndex', function () {
    console.log('Creating index...')
    return gulp.src(['src/index.html'])
        .pipe(gulp.dest('dist/'))
})

/**
 *
 */
gulp.task('createIndex-watch', ['createIndex'], function (done) {
    browserSync.reload()
    done()
})

/**
 *
 */
gulp.task('createAssets', function () {
    console.log('Creating assets...')
    return gulp.src(['src/assets/**/*.*'])
        .pipe(gulp.dest('dist/assets/'))
})

/**
 *
 */
gulp.task('createAssets-watch', ['createAssets'], function (done) {
    browserSync.reload()
    done()
})

/**
 *
 */
gulp.task('jshint', () => {
    return gulp.src([
            './src/app/**/*.js',
            './src/common/**/*.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter('default', { verbose: true, esversion: 6 }))
})

/**
 *
 */
gulp.task('sass', () => {
    del(['./dist/assets/css/main.css', './dist/assets/css/main.css.map']).then(() => {
        gulp.src('./src/**/*.scss')
            .pipe(sourcemaps.init({
                identityMap: true
            }))
            .pipe(sass())
            .pipe(concat('style.css'))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./dist/assets/css/'))
            .pipe(browserSync.stream({
                match: '**/*.css'
            }))

    }, (e) => {
        console.log('Error removing css files', e)
    })
})

/**
 *
 */
gulp.task('compressVendorJs', () => {
    let filesJs = vendorFiles.vendor_files.js
    console.log('Minifying vendor js files')

    return gulp.src(filesJs)
        .pipe(sourcemaps.init({
            identityMap: true
        }))
        .pipe(concat('vendor.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/assets/js/'))
})

/**
 *
 */
gulp.task('compressVendorCss', () => {
    let filesCss = vendorFiles.vendor_files.css
    console.log('Minifying vendor css files')

    return gulp.src(filesCss)
        .pipe(sourcemaps.init({
            identityMap: true
        }))
        .pipe(concat('vendor.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/assets/css/'))
})

/**
 *
 */
gulp.task('compressCommon', () => {
    console.log('Minifying common files')

    return gulp.src(['src/app/app.js', 'src/common/**/*.js', '!src/common/**/*.spec.js'])
        .pipe(sourcemaps.init({
            identityMap: true
        }))
        .pipe(concat('common.js', {
            newLine: ''
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/assets/js/'))
})

/**
 *
 */
gulp.task('compressCommon-watch', ['compressCommon'], function (done) {
    browserSync.reload()
    done()
})

/**
 *
 */
gulp.task('compressAppFiles', () => {
    console.log('Minifying app files')

    return gulp.src(['src/app/**/*.js', '!src/app/**/*.spec.js', '!src/app/app.js'])
        .pipe(sourcemaps.init({
            identityMap: true
        }))
        .pipe(concat('app.js', {
            newLine: ''
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/assets/js/'))
})

/**
 *
 */
gulp.task('compressAppFiles-watch', ['compressAppFiles'], function (done) {
    browserSync.reload()
    done()
})


/**
 *
 */
gulp.task('watch', ['createIndex', 'createTemplates', 'createAssets', 'sass', 'compressVendorJs', 'compressVendorCss', 'compressCommon', 'compressAppFiles'], () => {

    /**
     * Server live reload definition
     */
    browserSync.init( {
        server: {
            baseDir: './dist/'
        }
    })

    gulp.watch('src/**/*.scss', ['sass'])
    gulp.watch(['src/index.html'], ['createIndex-watch'])
    gulp.watch(['src/**/*.tpl.html'], ['createTemplates-watch'])
    gulp.watch(['src/assets/**/*.*'], ['createAssets-watch'])
    gulp.watch(['src/common/**/*.js', '!src/common/**/*.spec.js', 'src/app/app.js'], ['compressCommon-watch'])
    gulp.watch(['src/app/**/*.js', '!src/app/**/*.spec.js', '!src/app/app.js'], ['jshint', 'compressAppFiles-watch'])
})

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err)
})

process.on('unhandledRejection', function(e) {
    console.log('unhandled Rejection', e.message, e.stack)
})