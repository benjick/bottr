import { rollup } from 'rollup';
import path from 'path';
import fs from 'fs';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';

let pkg = JSON.parse(fs.readFileSync('./package.json'));

let external = Object.keys(pkg.peerDependencies || {}).concat(Object.keys(pkg.devDependencies || {}));

function build() {
  return rollup({
  	entry: 'src/main.js',
  	moduleName: pkg.amdName,
    external,
  	plugins: [
  		babel({
  			babelrc: false,
  			comments: false,
  			exclude: 'node_modules/**',
  			presets: [
  				'es2015-loose-rollup',
  				'stage-0'
  			],
  			plugins: [
  				['transform-react-jsx', { pragma: 'html' }]
  			]
  		}),
  		nodeResolve({
  			jsnext: true,
  			main: true,
  			skip: external,
  		}),
  		commonjs({
  			include: 'node_modules/**',
  			exclude: '**/*.css',
  		}),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      uglify(),
  	],
  })
  .then(bundle => {
    return bundle.write({
      dest: 'static/bundle.js',
      format: 'cjs',
      sourceMap: true,
    });
  });
}

if (!module.parent) {
  console.log('Starting build...');
  build()
  .then((e) => console.log('Build complete'))
  .catch((e) => console.log('Build error', e));
}

export default build;
