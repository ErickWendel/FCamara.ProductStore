"use strict";
let gulp = require('gulp');
let tsc = require('gulp-typescript');
let sourcemaps = require('gulp-sourcemaps');
let nodemon = require('gulp-nodemon');
let mocha = require('gulp-mocha');


let tsProject = tsc.createProject('tsconfig.json');
let sourceFiles = 'src/**/*.ts';
let testFiles = 'test/**/*.ts';
let compiledTest = 'lib/**/*test.js';
let entryPoint = './lib/presentation/API/index.js';
let outDir = require('./tsconfig.json').compilerOptions.outDir;

gulp.task('default', ['compile', 'nodemon', 'watch']);

gulp.task('compile', () => {
    let tsResult = gulp.src([sourceFiles, testFiles])
        .pipe(tsProject('default'));

    return tsResult.js
        .pipe(gulp.dest(outDir));
});

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function() {
    gulp.watch([sourceFiles, testFiles], ['compile', 'test'])
        .on('change', (e) => {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
});
gulp.task('test', () => {
    return gulp.src([compiledTest], { read: false })
                .pipe(mocha({ reporter: 'list' }));
});


gulp.task('nodemon',() => {
    nodemon({
        script: entryPoint,
        env: { 'NODE_ENV': 'development' },
        // tasks: ['test']
    });
});