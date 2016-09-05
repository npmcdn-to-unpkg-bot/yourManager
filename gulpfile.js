var gulp = require("gulp");
var gzip = require("gulp-gzip");
var Q = require('q');
var tsc = require("gulp-typescript");
var tsConfig = tsc.createProject('./client/tsconfig.json');
var browserify = require('gulp-browserify');
var tsify = require("tsify");
var jsuglify = require("rollup-plugin-uglify");//require("rollup-plugin-uglify");
var jsminify = require("gulp-minify");
var minifyHtml = require("gulp-minify-html");
var ng2Inline = require('angular2-inline-template-style');
var embedSass = require('gulp-angular2-embed-sass');
var concat = require("gulp-concat");
var nodemon = require("nodemon");
var tslint = require('gulp-tslint');
var filter = require('gulp-filter');
var browsersync = require('superstatic');
var superstatic = require('browser-sync');
var cleanCSS = require('gulp-clean-css');
var embedTemplates = require('gulp-angular-embed-templates');
var inject = require('gulp-inject');
var inlineNg2Template = require('gulp-inline-ng2-template');
var bundle = require('gulp-bundle-assets');
var stringify = require('stringify');
var buffer = require('vinyl-buffer');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var ngHtml2Js = require('gulp-ng-html2js');
var livereload = require('gulp-livereload');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var sysBuilder =  require("systemjs-builder");
var imagemin = require("gulp-imagemin");
var del = require('del');
var plumber = require("gulp-plumber");
var runSequence = require('run-sequence');
var sourceMaps = require('gulp-sourcemaps');
var cdnizer = require('gulp-cdnizer');
var rollup = require('rollup-stream');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var lib_dev = [
    'node_modules/core-js/client/shim.min.js',
    'node_modules/zone.js/dist/zone.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/systemjs/dist/system.src.js',
    'client/bower_components/jquery/dist/jquery.min.js',
    'client/bower_components/bootstrap/dist/js/bootstrap.min.js',

];

var lib_prod = [
    'https://npmcdn.com/core-js/client/shim.min.js',
    'https://npmcdn.com/zone.js@0.6.12?main=browser',
    'https://npmcdn.com/reflect-metadata@0.1.3',
    'https://npmcdn.com/systemjs@0.19.27/dist/system.src.js',
    'https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js',
    'http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'

];

var style_prod = [
    'http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'
];

var style_dev = [
    'client/bower_components/bootstrap/dist/css/bootstrap.min.css'
];

var paths = {
    htmlPages: ['client/app/**/*.html'],
    cssPages:'client/app/**/*.css',
    rootFiles:'client/*.*',
    copyServer:'server/**/*.*',
    copyeServerRootFiles:'server/*.*',
    copyPackageJSON:'package.json',
    copyBowerJSON:'bower.json',
    copyBowerrc:'.bowerrc',
    copyBabelrc:'.babelrc'

};
//<<<<<<< HEAD
//var tslint = require("gulp-tslint");
//var imagemin = require("gulp-imagemin");
//var del = require('del');
//var plumber = require("gulp-plumber");
//var runSequence = require('run-sequence');
//var sourceMaps = require('gulp-sourcemaps');
//
//
//var lib = [
//    'node_modules/@angular',
//    'node_modules/core-js/client/shim.min.js',
//    'node_modules/zone.js/dist/zone.js',
//    'node_modules/reflect-metadata/Reflect.js',
//    'node_modules/systemjs/dist/system.src.js',
//    './client/bower_components/jquery/dist/jquery.min.js',
//    './client/bower_components/bootstrap/dist/js/bootstrap.min.js',
//    './client/bower_components/bootstrap/dist/css/bootstrap.min.css'
//=======
gulp.task('clean-dev', function (done) {
    del('dist/dev', done);
});

gulp.task('clean-all', function (done) {
    del('dist', done);
});

gulp.task('clean-prod', function (done) {
    del('dist/prod', done);
});

gulp.task('clean-source', function (done) {
    del(['client/app/**/*.js', 'client/app/**/*.js.map'], done);
});

gulp.task('prep-env', function (done) {
    return gulp
        .src(['client/app/**/*.ts','client/app/**/*.html', 'client/app/**/*.css'])
        .pipe(gulp.dest('dist/temp/client/app'));
});

gulp.task('inline-html-css', function (done) {
    return gulp.src('dist/temp/client/app/**/*.ts', {base: 'dist/temp/client/app/'})
        .pipe(embedTemplates())
        .pipe(embedSass())
        .pipe(gulp.dest('dist/temp/client/app'));

});


gulp.task('ts-compile', function () {
    return gulp
        .src(['dist/temp/client/app/**/*.ts'])
        // .pipe(sourceMaps.init())
        .pipe(tsc(tsConfig))
        // .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest('dist/temp/client/app'));
});

gulp.task('bundle-app',function (done) {

    return gulp.src('dist/prod/client/app/app.es5.js')
        //.pipe(concat('bundle.js'))
        //.pipe(jsminify())

        //.pipe(jsuglify())

        .pipe(gulp.dest('dist/prod/client/app'));

});


gulp.task('build-vendor-js', function () {
    return gulp.src(lib_dev)
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('dist/prod/client/assets/lib/'))
});

gulp.task('build-vendor-css', function () {
    return gulp.src(style_dev)
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest('dist/prod/client/assets/css/'))
});

gulp.task('index-dev', function () {
    var target = gulp.src('client/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(lib_dev, {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('dist/prod/client'));
});

gulp.task('rollup...', function() {
    return gulp.src('rollup.config.js')

        .pipe(source('app.js'))

        // and output to ./dist/app.js as normal.
        .pipe(gulp.dest('dist/prod/client/app'));
});
gulp.task('rollup', function() {
        return rollup('rollup.config.js')

            .pipe(source('app.js'))

            // and output to ./dist/app.js as normal.
            .pipe(gulp.dest('dist/prod/client/app'));
});

gulp.task('es5-compile', function () {
    return gulp
        .src(['dist/prod/client/app/app.js'])
        .pipe(tsc(tsConfig))
        .pipe(concat('app.es5.js'))
        .pipe(gulp.dest('dist/prod/client/app'));
});


gulp.task('build-prod',function(done) {
    runSequence(
        'prep-env',
        'inline-html-css',
        'ts-compile',
      //  'bundle-app',
        ['copy-rootfiles', 'minify-images', 'copy-server' ,'copy-components'],
        'start-server',
        done);
});

gulp.task("copy-html", function () {
    return gulp.src(paths.htmlPages)
        .pipe(gulp.dest('dist/temp/client/app'));
});

gulp.task('build-prod-css', function () {
    gulp.src('client/app/**/*.ts')
        .pipe(embedSass())
        .pipe(gulp.dest('dist/temp/client/app'));
});

gulp.task("minify-images", function() {

    return gulp.src('client/assets/images/*')
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/prod/client/assets/images'));
});

gulp.task("copy-corelib", function(){

    return gulp.src(lib)
        .pipe(gulp.dest('dist/prod/client/assets/lib'));
});

gulp.task("copy-rootfiles", function () {
    return gulp.src(paths.rootFiles)
        .pipe(gulp.dest('dist/prod/client'));
});

gulp.task("copy-server", function () {
    return gulp.src([paths.copyServer, paths.copyeServerRootFiles])
        .pipe(gulp.dest('dist/prod/server'));
});

gulp.task('start-server', function () {
    nodemon({
        script: 'dist/prod/server/index.js'
        , ext: 'js html'
        , env: { 'NODE_ENV': 'production' }
    })
});

gulp.task("copy-components", function () {
    return gulp.src([paths.copyBowerrc, paths.copyBowerJSON, paths.copyPackageJSON, paths.copyBabelrc])
        .pipe(gulp.dest('dist/prod/'));
});

gulp.task("serve-dev",['ts-compile'], function () {

    gulp.watch(['client/app/**/*.ts'], ['ts-compile']);
    browsersync({
        port:9000,
        file:['dist/dev/client/index.html','client/app/**/*.js'],
        injectChanges:true,
        logFileChanges:false,
        logLevel:'silent',
        notify:true,
        reloadDelay:0,
        server:{
            baseDir:'./app',
            middleware:superstatic({debug:false})
        }

    });
});

gulp.task("copy-css", function () {
    return gulp.src(paths.cssPages)
        .pipe(gulp.dest('dist/dev/client/app'));
});

//<<<<<<< HEAD
gulp.task("ts-lint", function() {
    return gulp.src("client/app/**/*.ts")
        .pipe(tslint())
        .pipe(tslint("verbose", {
            emitError: false
        }))
        .pipe(tslint.report())
});

gulp.task('copy-system-lib', function () {
    var libs = [
        "@angular",
        "rxjs",
        "jasmine-core"
    ];

    var promises = [];

    libs.forEach(function (lib) {
        var defer = Q.defer();
        var pipeline = gulp
            .src('node_modules/' + lib + '/**/*')
            .pipe(gulp.dest('./dist/dev/client/assets/system-lib/' + lib));

        pipeline.on('end', function () {
            defer.resolve();
        });
        promises.push(defer.promise);
    });

    return Q.all(promises);
});

gulp.task('build-dev', function(callback) {
    runSequence(
        //['ts-lint'],
        'ts-compile',
        [ 'copy-rootfiles', 'copy-css', 'copy-corelib', 'minify-images', 'copy-html', 'copy-server', 'copy-components'],
        ['start-server'],
        'gulp-watch',
        callback);
});
gulp.task('gulp-watch', function() {
    return gulp.watch(['client/app/**/*.ts'], ['ts-compile']);

});
//=======
//gulp.task('build-dev', function(callback) {
//    runSequence(
//        //['clean'],
//        [ 'ts-compile'],
//        [ 'copy-rootfiles', 'copy-css', 'copy-corelib', 'minify-images', 'copy-server', 'copy-components'],
//        [ 'start-server'],
//        callback);
//});
//>>>>>>> sprint4


