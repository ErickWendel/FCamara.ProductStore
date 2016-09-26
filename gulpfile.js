"use strict";
let gulp = require('gulp');
let tsc = require('gulp-typescript');
let sourcemaps = require('gulp-sourcemaps');
let nodemon = require('gulp-nodemon');
let mocha = require('gulp-mocha');
let mainBowerFiles = require('gulp-main-bower-files');
let uglify = require('gulp-uglify');
let util = require('gulp-util');
let tsProject = tsc.createProject('tsconfig.json');
let sourceFiles = 'src/**/*.ts';
let testFiles = 'test/**/*.ts';
let compiledTest = 'lib/test*/*/*.js';
let libSrcFiles = 'src/presentation/SPA/lib/**';
let libDestFiles = 'lib/presentation/SPA/lib';
let contentSrc = 'src/presentation/SPA/content/**/*';
let contentLib = 'lib/presentation/SPA/content';
let entryPoint = './lib/presentation/SPA/Index.js';
// let entryPoint = './lib/presentation/API/index.js';
let outDir = require('./tsconfig.json').compilerOptions.outDir;
gulp.task('default', [
    'moveContent',
    'moveLib',
    'compileTs',

    //tasks for dev
    
    // 'watchTs',
    // 'watchLib',
    // 'watchContent',
    // 'nodemon'

]);



gulp.task('compileTs', () => {

    let tsResult = gulp.src([sourceFiles, testFiles])
        .pipe(sourcemaps.init())
        .pipe(tsProject('default'));

    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(outDir));
});

gulp.task('moveContent', function () {
    move(contentSrc, contentLib);
});

gulp.task('moveLib', function () {
    move(libSrcFiles, libDestFiles);
});

gulp.task('watchTs', function () {
    watch([sourceFiles, testFiles], ['compileTs'], (e) => {
        console.log(`TypeScript file ${e.path} has been changed. Compiling.`);
    });
});

gulp.task('watchLib', function () {
    watch([libSrcFiles], ['moveLib'], (e) => {
        console.log(`Content Lib updated: ${e.path}`);
    });
});

gulp.task('watchContent', function () {
    watch([contentSrc], ['moveContent'], (e) => {
        console.log(`Content Updated: ${e.path}`);
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

function watch(watchFiles, task, cb) {
    gulp.watch(watchFiles, task)
        .on('change', cb);
}

function move(src, dest) {
    util.log(`moving ${src} to ${dest}`);
    gulp.src([src])
        .pipe(gulp.dest(dest));

}