import { html } from 'snabbdom-jsx';

function createEditor(id) {
  const editor = ace.edit(id);
  editor.setTheme('ace/theme/twilight');
  editor.getSession().setMode('ace/mode/javascript');
  editor.getSession().setTabSize(2);
  editor.setFontSize(20);
}

const Editor = () =>
  <div id="editor"
    hook-insert={(v1) => {
      console.log('created', v1)
      createEditor('editor')
    }}
    hook-update={() => console.log('update')}>{`var init = function(text, done) {
    var fetch = require('node-fetch');
    fetch('http://quotes.stormconsultancy.co.uk/random.json')
    .then(function(res) {
      return res.json();
    })
    .then(function(json) {
      done(json.quote + " - " + json.author);
    });
  };`}</div>;

export default Editor;
