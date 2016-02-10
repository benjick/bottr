import './events';

import { html } from 'snabbdom-jsx';
import { patch } from './lib/snabbdom';

//HelloMessage : (attrs, body) -> vnode
const HelloMessage = ({name}) =>
  <div on-click={ _ => alert('Hi ' + name) }>
    Hello {name}
  </div>;

const vnode = <HelloMessage name="Yassine" />

patch(document.getElementById('placeholder'), vnode);
