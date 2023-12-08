import { useEffect, useState } from 'react';
import './Header.css';
import HeaderNav from './HeaderNav/HeaderNav';
import logo from '/logo.png';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  const scrollHandler = () => {
    setIsSticky(window.scrollY > 0);
  };
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <header className={`header${isSticky ? ' sticky' : ''}`}>
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
