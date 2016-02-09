import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'client/main.js',
  format: 'cjs',
  plugins: [
    babel(),
    uglify(),
  ],
  dest: 'src/static/bundle.js',
};
