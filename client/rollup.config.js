// import babel from 'rollup-plugin-babel';
// import commonjs from 'rollup-plugin-commonjs';
// import nodeResolve from 'rollup-plugin-node-resolve';
//
// export default {
//   entry: 'src/main.js',
//   format: 'cjs',
//   plugins: [
//     babel(),
//     nodeResolve({
//       jsnext: true,
//       main: true,
//       browser: true,
//     }),
//     commonjs(),
//   ],
//   dest: 'bundle.js',
// };

import path from 'path';
import fs from 'fs';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

let pkg = JSON.parse(fs.readFileSync('./package.json'));

let external = Object.keys(pkg.peerDependencies || {}).concat(Object.keys(pkg.devDependencies || {}));

export default {
	entry: 'src/main.js',
	dest: pkg.main,
	sourceMap: path.resolve(pkg.main),
	moduleName: pkg.amdName,
	format: 'cjs',
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
			skip: external
		}),
		commonjs({
			include: 'node_modules/**',
			exclude: '**/*.css'
		}),
	]
};
