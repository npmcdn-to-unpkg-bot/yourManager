var gulp = require("gulp");
var tsc = require("gulp-typescript");
var tsConfig = tsc.createProject('./client/tsconfig.json');
var npmConfig = tsc.createProject('package.json');
var browserify = require('gulp-browserify');
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
var embedTemplates = require('gulp-angular-embed-templates');

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
gulp.task('prod-ts-compile', function (done) {

    return gulp.src('dist/dev/client/app/boot.js')
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('dist/prod/client/app'));

});


gulp.task('prod-inline-compile', function (done) {
    return gulp.src('client/app/**/*.ts', {base: 'client/app/'})
        .pipe(embedTemplates()) // inline templates
        //.pipe(tsc(tsConfig));
        .pipe(gulp.dest('client/app'));

});



//"build_prod": "npm run build && browserify -s main dist/dev/client/app/boot.js > dist/bundle.js && npm run minify",
//    "minify": "uglifyjs dist/bundle.js --screw-ie8 --compress --mangle --output dist/bundle.min.js"

//gulp.task("build-js",['concat-js'], function () {
//
//     browserify({
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
//        .pipe(sourceMaps.init({loadMaps: true}))var inlineNg2Template = require('gulp-inline-ng2-template');
//       // .pipe(jsuglify())
//        //.pipe(sourceMaps.write('./'))
//        .pipe(gulp.dest("dist/prod/client/app"));
//});


gulp.task('build-prod-templates', function () {
    //return gulp.src('client/app/**/*.html')
    //    .pipe(minifyHtml({
    //        empty: true,
    //        spare: true,
    //        quotes: true
    //    }))
    //    .pipe(ngHtml2Js({
    //        moduleName: 'partials',
    //        declareModule: false
    //    }))
    //    .pipe(concat("partials.tpls.min.js"))
    //  //  .pipe(jsuglify())
    //    .pipe(gulp.dest('dist/prod/client/app'));
});


gulp.task("copy-html", function () {
    return gulp.src(paths.htmlPages)
        .pipe(concat('ym-app.templates.html'))
        .pipe(gulp.dest('dist/dev/client/app'));
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
    return gulp.src([paths.copyBowerrc, paths.copyBowerJSON, paths.copyPackageJSON, paths.copyBabelrc])
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

gulp.task("copy-html", function () {
    return gulp.src(paths.htmlPages)
        .pipe(gulp.dest('dist/dev/client/app'));
});

gulp.task("copy-css", function () {
    return gulp.src(paths.cssPages)
        .pipe(gulp.dest('dist/dev/client/app'));
});

gulp.task('build-dev', function(callback) {
    runSequence(
        //['clean'],
        [ 'ts-compile'],
        [ 'copy-rootfiles', 'copy-css', 'copy-corelib', 'minify-images', 'copy-server', 'copy-components'],
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