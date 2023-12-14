import { useEffect, useState } from 'react';
import './Header.css';
import HeaderNav from './HeaderNav/HeaderNav';
import logo from '/logo.svg';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [isScroll, setIsScroll] = useState(false);

  const scrollHandler = () => {
    setIsScroll(window.scrollY > 10);
  };
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <header className={`header${isScroll ? ' sticky' : ''}`}>
      <div className="header-container">
        <NavLink to="/">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </NavLink>
        <HeaderNav />
      </div>
    </header>
  );
};

export default Header;
