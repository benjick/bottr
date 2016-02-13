import { html } from 'snabbdom-jsx';

import Message from './Message';
import Editor from './Editor';

const Body = () =>
  <div className="columns">
    <div className="column editor-wrapper">
      <Editor />
    </div>
    <div className="column is-third">
      <div className="content" style="margin: 20px 10px;">
        <Message>Testar lite</Message>
        <h1 className="title">Script playground</h1>
        <p className="control is-grouped">
          <input type="text" className="input" id="codeInput" value="test value" />
          <button type="submit" className="button is-primary" id="runCode" >Execute</button>
        </p>

        <div className="message is-primary">
          <div className="message-header">
          Result
          </div>
          <div className="message-body">
            <span id="result"></span>
          </div>
        </div>
        <div className="message is-warning">
          <div className="message-header">
            Output
          </div>
          <div className="message-body">
            <pre id="console"></pre>
          </div>
        </div>

        <input type="text" className="input" id="codeName" value="myscript" />
        <button type="submit" className="button is-primary" id="saveCode">Save script</button>
      </div>
    </div>
  </div>;

export default Body;
