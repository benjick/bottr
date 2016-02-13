import { html } from 'snabbdom-jsx';

import MenuItem from '../components/MenuItem';

const Header = () =>
  <header className="header">
    <div className="container">
      <div className="header-left">
        <a className="header-item" href="#">
          <img src="images/preview.png" alt="Logo" />
        </a>
        <MenuItem title="Home" href="#" />
        <MenuItem title="Editor" href="#" isActive={true} />
      </div>

      <div className="header-right header-menu">
        <span className="header-item">
          <a className="button" href="/api/login">Login</a>
        </span>
      </div>
    </div>
  </header>;

export default Header;
