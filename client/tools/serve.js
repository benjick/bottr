import BrowserSync from 'browser-sync';
import build from './build';
const sync = BrowserSync.create();

function serve() {
  sync.init({
    server: './static',
    port: 3001,
  });

  sync.watch('./static/*.html').on('change', sync.reload);
  sync.watch('./static/*.css').on('change', sync.reload);

  sync.watch('./src/**/*.js').on('change', () => {
    build()
    .then(() => sync.reload('./static/bundle.js'))
    .catch((e) => console.error('Build error', e));
  })
}

if (!module.parent) {
  build().then(serve)
}

export default serve;
