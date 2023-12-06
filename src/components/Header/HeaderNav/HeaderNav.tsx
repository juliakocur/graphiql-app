import { NavLink } from 'react-router-dom';

const HeaderNav = () => {
  return (
    <nav className="header-nav">
      <NavLink to="../">
        <button className="button-nav">Welcome</button>
      </NavLink>
      <NavLink to="/registration">
        <button className="button-nav">Registration</button>
      </NavLink>
      <NavLink to="/login">
        <button className="button-nav">Login</button>
      </NavLink>
      <button className="button-nav">EN</button>
    </nav>
  );
};

export default HeaderNav;
