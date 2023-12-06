import { NavLink } from 'react-router-dom';
const HeaderNav = () => {
  return (
    <nav>
      <NavLink to="../">Welcome</NavLink>
      <NavLink to="/registration">Registration</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
  );
};

export default HeaderNav;
