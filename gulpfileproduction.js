var gulp = require("gulp");
var tsc = require("gulp-typescript");
var tsConfig = tsc.createProject('./client/tsconfig.json');
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var jsuglify = require("gulp-uglifyjs");
var jsminify = require("gulp-minify");
var minifyHtml = require("gulp-minify-html");
var concat = require("gulp-concat");
var nodemon = require("nodemon");
var tslint = require('gulp-tslint');
var filter = require('gulp-filter');
var browsersync = require('superstatic');
var superstatic = require('browser-sync');
var cleanCSS = require('gulp-clean-css');
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


var lib = [
    'node_modules/core-js/client/shim.min.js',
    'node_modules/zone.js/dist/zone.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/systemjs/dist/system.src.js',
    './client/bower_components/jquery/dist/jquery.min.js',
    './client/bower_components/bootstrap/dist/js/bootstrap.min.js',
    './client/bower_components/bootstrap/dist/css/bootstrap.min.css'
];
var HTMLMinifierOpts = {conditionals: true};

gulp.task('clean-dev', function (done) {
    del('dist/dev', done);
});

gulp.task('clean-all', function (done) {
    del('dist', done);
});

gulp.task('clean-prod', function (done) {
    del('dist/prod', done);
});

gulp.task('clean-source-junk', function (done) {
    del(['client/app/**/*.js', 'client/app/**/*.js.map'], done);
});

gulp.task('ts-compile', function () {
    return gulp
        .src(['client/app/**/*.ts', 'typings/**/*.d.ts'])
        .pipe(sourceMaps.init())
        .pipe(tsc(tsConfig))
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest('dist/dev/client/app'));

});
gulp.task('prod-ts-compile', function () {
    return gulp
        .src(['client/app/**/*.ts', 'typings/**/*.d.ts'])
        .pipe(sourceMaps.init())
        .pipe(tsc(tsConfig))
        .pipe(sourceMaps.write('.'))
        //.pipe(bundle('app.js'))
        .pipe(concat('app.js'))

        .pipe(gulp.dest('dist/prod/client/app'));

});

//gulp.task("build-js",['concat-js'], function () {
//    return browserify({
//       //s basedir: '.',
//        debug: true,
//        entries: ['dist/prod/client/app/app.js'],
//        cache: {},
//        packageCache: {}
//    })
//        .plugin(tsify)
//        .bundle()
//        //.pipe(source('app.js'))
//        .pipe(buffer())
//        .pipe(sourceMaps.init({loadMaps: true}))
//       // .pipe(jsuglify())
//        //.pipe(sourceMaps.write('./'))
//        .pipe(gulp.dest("dist/prod/client/app"));
//});


gulp.task('build-prod-templates', function () {
    return gulp.src('client/app/**/*.html')
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(ngHtml2Js({
            moduleName: 'partials',
            declareModule: false
        }))
        .pipe(concat("partials.tpls.min.js"))
        .pipe(jsuglify())
        .pipe(gulp.dest('dist/prod/client/app'));
});


gulp.task('build-prod-css', function () {
    gulp.src('client/app/**/*.css')
        .pipe(cssmin())
        .pipe(concat('style.css'))
        //.pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/prod/client/app'));
});


gulp.task('build-assets', function () {


    const filterHTML = filter('./client/app/**/*.html', {restore:true});
    const filterCSS = filter('./client/app/**/*.css', {restore:true});
    return gulp.src(['./client/app/**/*.html', './client/app/**/*.css'])
        .pipe(filterHTML)
        .pipe(minifyHTML(HTMLMinifierOpts))
        //.pipe(filterHTML.restore())

        .pipe(filterCSS)
        .pipe(minifyCSS())
        .pipe(concat('app.min.css'))
        //.pipe(filterCSS.restore())
        .pipe(gulp.dest('dist/prod/client/app'));
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


gulp.task('build-dev', function(callback) {
    runSequence(
        //['clean'],
        //[ 'serve-dev'],
        [ 'copy-rootfiles', 'build-css', 'copy-corelib', 'minify-images', 'dev-build-templates', 'copy-server', 'copy-components'],
        [ 'start-server'],
        callback);
});

gulp.task('build-prod', function(callback) {
    runSequence(
        [ 'prod-ts-compile'],
        [ 'copy-rootfiles', 'build-prod-css', 'copy-corelib', 'minify-images', 'build-prod-templates', 'copy-server', 'copy-components'],
        [ 'start-server'],
        callback);
});
//