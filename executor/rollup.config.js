import babel from 'rollup-plugin-babel';

export default {
  entry: 'client/main.js',
  format: 'cjs',
  plugins: [babel()],
  dest: 'src/static/bundle.js',
};
