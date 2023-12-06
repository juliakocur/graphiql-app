import './Header.css';
import HeaderNav from './HeaderNav/HeaderNav';
import logo from '/logo.png';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <NavLink to="/">
          <div className="logo">
            <div className="hexagon">
              <img src={logo} alt="logo" />
            </div>
            GraphiQL
          </div>
        </NavLink>
        <HeaderNav />
      </div>
    </header>
  );
};

export default Header;
