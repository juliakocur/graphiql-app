import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/reduxHooks';
import { AllRoutes } from '../../../routes/allRoutes';
import { authSlice } from '../../../redux/AuthSlice';
import { logout } from '../../../firebase/firebase';
import { useMemo } from 'react';

const HeaderNav = () => {
  const { pathname } = useLocation();
  const { isTokenValid } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const { setIsTokenValid } = authSlice.actions;
  const dispatch = useAppDispatch();

  const logoutClickHandler = () => {
    logout();
    dispatch(setIsTokenValid(false));
    navigate('/', { replace: true });
  };
  const isHiddenEditorBnt = useMemo(
    () => pathname.includes(AllRoutes.editor.path),
    [pathname]
  );
  return (
    <nav className="header-nav">
      {isTokenValid ? (
        <>
          {!isHiddenEditorBnt && (
            <NavLink to={AllRoutes.editor.path}>
              <button className="button-nav">Editor</button>
            </NavLink>
          )}
          <button className="button-nav" onClick={logoutClickHandler}>
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to={AllRoutes.registration.path}>
            <button className="button-nav">Registration</button>
          </NavLink>
          <NavLink to={AllRoutes.login.path}>
            <button className="button-nav">Login</button>
          </NavLink>
        </>
      )}

      <button className="button-nav">EN</button>
    </nav>
  );
};

export default HeaderNav;
