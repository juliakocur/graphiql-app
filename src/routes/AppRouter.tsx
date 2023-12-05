import WelcomePage from '../pages/WelcomePage/WelcomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import MainPage from '../pages/MainPage/MainPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage';
import { Outlet, RouteObject, useRoutes } from 'react-router-dom';
import { memo } from 'react';
import { AllRoutes } from './allRoutes';

const allRoutes: RouteObject = {
  path: AllRoutes.root.path,
  element: (
    <>
      <Outlet />
    </>
  ),
  children: [
    { index: true, element: <WelcomePage /> },
    {
      path: AllRoutes.login.path,
      element: <LoginPage />,
    },
    {
      path: AllRoutes.main.path,
      element: <MainPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
    {
      path: AllRoutes.registration.path,
      element: <RegistrationPage />,
    },
  ],
};

export const AppRouter = memo(() => {
  return useRoutes([allRoutes]);
});
