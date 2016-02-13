import { html } from 'snabbdom-jsx';

import Header from './containers/Header';
import Body from './components/Body';

import store from './lib/redux';
import { test } from './actions/test';

const App = () =>
  <div>
    <Header />
    <Body />
  </div>

export default App;
