"use strict";
let gulp = require('gulp');
let tsc = require('gulp-typescript');
let sourcemaps = require('gulp-sourcemaps');
let nodemon = require('gulp-nodemon');
let mocha = require('gulp-mocha');
let mainBowerFiles = require('gulp-main-bower-files');
let uglify = require('gulp-uglify');

let tsProject = tsc.createProject('tsconfig.json');
let sourceFiles = 'src/**/*.ts';
let testFiles = 'test/**/*.ts';
let compiledTest = 'lib/test*/*/*.js';
let ignoreFiles = 'src/presentation/SPA/lib';
let contentSrc = 'src/presentation/SPA/content/*';
let contentLib = 'lib/presentation/SPA/content';
// let entryPoint = './lib/presentation/SPA/app/Index.js';
let entryPoint = './lib/presentation/API/index.js';
let outDir = require('./tsconfig.json').compilerOptions.outDir;

// gulp.task('default', ['compile', 'nodemon', 'watch', 'watchContent']);
gulp.task('default', ['compile', 'nodemon', 'watch']);


gulp.task('compile', () => {
    let tsResult = gulp.src([sourceFiles, testFiles])
        .pipe(sourcemaps.init())
        .pipe(tsProject('default'));

    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(outDir));
});

gulp.task('move', function(){
    gulp.src([contentSrc])
        .pipe(gulp.dest(contentLib));
});


/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function () {
    gulp.watch([sourceFiles, testFiles], ['compile'])
        .on('change', (e) => {
            console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
        });
});
gulp.task('watchContent', function () {
    gulp.watch([contentSrc], ['move'])
        .on('change', (e) => {
            console.log('Content updated');
        });
});

gulp.task('test', () => {
    return gulp.src([compiledTest], { read: false })
        .pipe(mocha({ reporter: 'list' }));
});


gulp.task('nodemon', () => {
    nodemon({
        script: entryPoint,
        env: { 'NODE_ENV': 'development' }
    });
});