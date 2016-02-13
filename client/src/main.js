import { html } from 'snabbdom-jsx';
import { patch } from './lib/snabbdom';
import App from './App';

import store from './lib/redux';

let vnode = document.getElementById('root');

function updateUI(state) {
  const newVnode = <App state={state} />;
  vnode = patch(vnode, newVnode);
}

store.subscribe(() =>
  updateUI(store.getState())
)

updateUI(store.getState());
