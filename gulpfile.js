var gulp = require("gulp");
var tsc = require("gulp-typescript");
var tsConfig = tsc.createProject('./client/tsconfig.json');
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var jsuglify = require("gulp-uglify");
var jsminify = require("gulp-minify");
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
    copyBowerrc:'.bowerrc'

};
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
var PATH = {
    dest: {
        all: 'dist',
        dev: {
            all: 'dist/dev/client',
            app:'dist/dev/client/app',
            assets: 'dist/dev/client/assets',
            lib: 'dist/dev/client/assets/lib',
            css:'dist/dev/client/assets/styles',
            images:'dist/dev/client/assets/images'
        },
        prod: {
            all: 'dist/prod',
            assets: 'dist/dev/client/assets',
            css:'dist/dev/client/assets/styles',
            images:'dist/dev/client/assets/images'
        }
    },
    src: {
        // Order is quite important here for the HTML tag injection.
        lib: [
            'node_modules/core-js/client/shim.min.js',
            'node_modules/zone.js/dist/zone.js',
            'node_modules/reflect-metadata/Reflect.js',
            'node_modules/systemjs/dist/system.src.js'
        ]
    }
};

var lib = [
    'node_modules/core-js/client/shim.min.js',
    'node_modules/zone.js/dist/zone.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/systemjs/dist/system.src.js',
    './client/bower_components/jquery/dist/jquery.min.js',
    './client/bower_components/bootstrap/dist/js/bootstrap.min.js',
    './client/bower_components/bootstrap/dist/css/bootstrap.min.css',


];
var HTMLMinifierOpts = {conditionals: true};

gulp.task('clean', function (done) {
    del(PATH.dest.all, done);

});

gulp.task('clean-clutter', function (done) {

    del('client/app/**/*.js', done);
    del('client/app/**/*.js.map', done);
});
//gulp.task('lint:ts', function() {
//    return gulp.src('client/app/**/*.ts')
//        .pipe(tslint())
//        .pipe(tslint.report('verbose', { emitError: false }));
//});

gulp.task('dev-build-templates', function () {
    return gulp.src('client/app/**/*.html')
        .pipe(ngHtml2Js({
            moduleName: 'partials',
            declareModule: false
        }))
        .pipe(concat("partials.tpls.min.js"))
        .pipe(gulp.dest('dist/dev/client/app'));
});
gulp.task('build-css', function () {
    gulp.src('client/app/**/*.css')
        .pipe(cssmin())
        .pipe(concat('style.css'))
        //.pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/dev/client/app'));

    //gulp.task('minify-css', function() {
    //    return gulp.src('styles/*.css')
    //        .pipe(cleanCSS({compatibility: 'ie8'}))
    //        .pipe(gulp.dest('dist'));
    //});

});
gulp.task('bundle-js', function() {
    var builder = new sysBuilder('public', './client/system.config.js');
    return builder.buildStatic('dist/dev/client/app/**/*.*', 'dist/dev/client/app/app.min.js')
        .then(function () {
            return del(['dist/dev/client/app/**/*', '!dist/dev/client/app/app.min.js']);
        })
        .catch(function(err) {
            console.error('>>> [systemjs-builder] Bundling failed'.bold.green, err);
        });
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
        .pipe(gulp.dest('dist/dev/client/app'));
});


gulp.task('ts-compile', function () {
    return gulp
        .src(['client/app/**/*.ts', 'typings/**/*.d.ts'])
        .pipe(sourceMaps.init())
        .pipe(tsc(tsConfig))
        .pipe(sourceMaps.write('.'))
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('dist/dev/client/app'));

});


gulp.task('minify-dev', function () {
    return gulp
        .src('dist/client/app/**/*.*')
        .pipe(sourceMaps.init())
        .pipe(tsc(tsConfig))
        //.pipe(jsminify())
        //.pipe(jsuglify({
        //    mangle: true,
        //    compress:true
        //}))
        .pipe(sourceMaps.write('.'))
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('dist/dev/client/app'));
});

gulp.task("copy-html", function () {
    return gulp.src(paths.htmlPages)
        .pipe(gulp.dest('dist/dev/client/app'));
});

gulp.task("copy-css", function () {
    return gulp.src(paths.cssPages)
        .pipe(gulp.dest('dist/dev/client/app'));
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
        .pipe(gulp.dest('dist/dev/client/assets/images'));
});

gulp.task("copy-corelib", function(){

    return gulp.src(lib)
        .pipe(gulp.dest('dist/dev/client/assets/lib'));
});
gulp.task("copy-rootfiles", function () {
    return gulp.src(paths.rootFiles)
        .pipe(gulp.dest('dist/dev/client'));
});

gulp.task("copy-server", function () {
    return gulp.src([paths.copyServer, paths.copyeServerRootFiles])
        .pipe(gulp.dest('dist/dev/server'));
});

gulp.task('start-server', function () {
    nodemon({
        script: 'dist/dev/server/index.js'
        , ext: 'js html'
        , env: { 'NODE_ENV': 'development' }
    })
});

gulp.task("copy-components", function () {
    return gulp.src([paths.copyBowerrc, paths.copyBowerJSON, paths.copyPackageJSON])
        .pipe(gulp.dest('dist/dev/'));
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


gulp.task('default', function(callback) {
    runSequence(
        //['clean'],
        //[ 'serve-dev'],
        [ 'copy-rootfiles', 'copy-css', 'copy-corelib', 'minify-images', 'copy-html', 'copy-server', 'copy-components'],
        [ 'start-server'],
        callback);
});
//gulp.task("default", gulpsync.sync([
//    "clean",
//    "ts-compile",
//    "copy-rootfiles",
//    "copy-css",
//    "copy-corelib",
//    "minify-images",
//    "copy-html"
//
//]), function () {
//
//    //return browserify({
//    //    basedir: '.',
//    //    debug: true,
//    //    entries: ['client/app/boot.ts'],
//    //    cache: {},
//    //    packageCache: {}
//    //})
//    //    .plugin(tsify)
//    //    .bundle()
//    //    .pipe(source('bundle.js'))
//    //    .pipe(gulp.dest("dist"));
//});


