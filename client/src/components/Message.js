import { html } from 'snabbdom-jsx';

const Message = ({
  color: color = 'primary',
  title: title = 'Title here',
}, children) =>
  <div className={`message is-${color}`}>
    <div className="message-header">
    {title}
    </div>
    <div className="message-body">
      {children}
    </div>
  </div>;

export default Message;
