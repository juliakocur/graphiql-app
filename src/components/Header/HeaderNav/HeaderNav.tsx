import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/reduxHooks';
import { AllRoutes } from '../../../routes/allRoutes';
import { authSlice } from '../../../redux/AuthSlice';
import { logout } from '../../../firebase/firebase';
import { useContext, useMemo } from 'react';
import LangSwitcher from './LangSwitcher';
import { LanguageContext } from '../../../localization/LangContextProvider';
import { Localization } from '../../../localization/Localization';

const HeaderNav = () => {
  const { pathname } = useLocation();
  const { isTokenValid } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const { setIsTokenValid } = authSlice.actions;
  const dispatch = useAppDispatch();
  const { language } = useContext(LanguageContext);

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
              <button className="button-nav">
                {Localization[language].editor}
              </button>
            </NavLink>
          )}
          <button className="button-nav" onClick={logoutClickHandler}>
            {Localization[language].logout}
          </button>
        </>
      ) : (
        <>
          <NavLink to={AllRoutes.registration.path}>
            <button className="button-nav">
              {Localization[language].registration}
            </button>
          </NavLink>
          <NavLink to={AllRoutes.login.path}>
            <button className="button-nav">
              {Localization[language].login}
            </button>
          </NavLink>
        </>
      )}

      <LangSwitcher></LangSwitcher>
    </nav>
  );
};

export default HeaderNav;
