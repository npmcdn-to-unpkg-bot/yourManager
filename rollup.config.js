import nodeResolve from 'rollup-plugin-node-resolve';
class RollupNG2 {
    constructor(options){
        this.options = options;
    }
    resolveId(id, from){
        if (id.startsWith('rxjs/')){
            return `${__dirname}/node_modules/rxjs-es/${id.replace('rxjs/', '')}.js`;
        }
    }
}

const rollupNG2 = (config) => new RollupNG2(config);

export default {
    entry: 'dist/temp/client/app/boot.js',
    //format:'iife',
    sourceMap: true,
    moduleName: 'main',
    plugins: [
        rollupNG2(),
        nodeResolve({
            jsnext: true, main: true
        })
    ]
};

//import { rollup } from 'rollup';
//import nodeResolve from 'rollup-plugin-node-resolve';
//
//rollup({
//    entry: 'dist/temp/client/app/boot.js',
//    plugins: [
//        rollupNG2(),
//        nodeResolve({
//            // use "module" field for ES6 module if possible
//            module: true, // Default: true
//
//            // use "jsnext:main" if possible
//            // – see https://github.com/rollup/rollup/wiki/jsnext:main
//            jsnext: true,  // Default: false
//
//            // use "main" field or index.js, even if it's not an ES6 module
//            // (needs to be converted from CommonJS to ES6
//            // – see https://github.com/rollup/rollup-plugin-commonjs
//            main: true,  // Default: true
//
//            // if there's something your bundle requires that you DON'T
//            // want to include, add it to 'skip'. Local and relative imports
//            // can be skipped by giving the full filepath. E.g.,
//            // `path.resolve('src/relative-dependency.js')`
//            skip: [ 'some-big-dependency' ],  // Default: []
//
//            // some package.json files have a `browser` field which
//            // specifies alternative files to load for people bundling
//            // for the browser. If that's you, use this option, otherwise
//            // pkg.browser will be ignored
//            browser: true,  // Default: false
//
//            // not all files you want to resolve are .js files
//            extensions: [ '.js', '.json' ],  // Default: ['.js']
//
//            // whether to prefer built-in modules (e.g. `fs`, `path`) or
//            // local ones with the same names
//            preferBuiltins: false  // Default: true
//
//        })
//    ]
//}).then( bundle => bundle.write({ dest: 'dist/prod/client/app/bundle.js', format: 'iife' }) );