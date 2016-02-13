import { html } from 'snabbdom-jsx';

const MenuItem = ({ isActive, title, href }) =>
  <a
    class-header-tab={true}
    class-is-active={isActive}
    href={href}>
    {title}
  </a>;

export default MenuItem;
