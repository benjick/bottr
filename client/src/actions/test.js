import store from '../lib/redux';

export function test() {
  setTimeout(() => {
    store.dispatch({ type: 'INCREMENT' })
  }, 2000)
}
