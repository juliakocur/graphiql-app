import WelcomePage from '../pages/WelcomePage/WelcomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import EditorPage from '../pages/EditorPage/EditorPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage';
import {
  Navigate,
  RouteObject,
  useLocation,
  useRoutes,
} from 'react-router-dom';
import { memo } from 'react';
import { AllRoutes } from './allRoutes';
import BasePage from '../pages/BasePage/BasePage';
import { useAppSelector } from '../redux/reduxHooks';

const AppRedirect = ({ path = '/' }: { path?: string }) => {
  const location = useLocation();
  return <Navigate to={path} state={{ from: location }} replace />;
};

interface IPropsProtectedRoute {
  children: JSX.Element;
}

export const ProtectedAuthRoute = ({ children }: IPropsProtectedRoute) => {
  const { isTokenValid } = useAppSelector((state) => state.authReducer);

  return isTokenValid ? children : <AppRedirect />;
};

export const ProtectedNotAuthRoute = ({ children }: IPropsProtectedRoute) => {
  const { isTokenValid } = useAppSelector((state) => state.authReducer);

  return !isTokenValid ? (
    children
  ) : (
    <AppRedirect path={`/${AllRoutes.editor.path}`} />
  );
};

const allRoutes: RouteObject = {
  path: AllRoutes.root.path,
  element: <BasePage />,
  children: [
    { index: true, element: <WelcomePage /> },
    {
      path: AllRoutes.login.path,
      element: (
        <ProtectedNotAuthRoute>
          <LoginPage />
        </ProtectedNotAuthRoute>
      ),
    },
    {
      path: AllRoutes.editor.path,
      element: (
        <ProtectedAuthRoute>
          <EditorPage />
        </ProtectedAuthRoute>
      ),
    },
    {
      path: AllRoutes.notFound.path,
      element: <NotFoundPage />,
    },
    {
      path: AllRoutes.registration.path,
      element: (
        <ProtectedNotAuthRoute>
          <RegistrationPage />
        </ProtectedNotAuthRoute>
      ),
    },
    {
      path: '*',
      element: <AppRedirect path={`/${AllRoutes.notFound.path}`} />,
    },
  ],
};

export const AppRouter = memo(() => {
  return useRoutes([allRoutes]);
});
