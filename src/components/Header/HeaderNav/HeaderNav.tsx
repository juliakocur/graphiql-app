import { NavLink } from 'react-router-dom';
const HeaderNav = () => {
  return (
    <div>
      <NavLink to="../">Welcome</NavLink>
      <NavLink to="/registration">Registration</NavLink>
      <NavLink to="/login">Login</NavLink>
    </div>
  );
};

export default HeaderNav;
