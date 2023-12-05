export interface IRouteItem {
  path: string;
  name: string;
}
const baseRoutes = {
  root: {
    path: '/',
    name: 'Root',
  },

  login: {
    path: 'login',
    name: 'Login page',
  },
  main: {
    path: 'main',
    name: 'Main page',
  },

  notFound: {
    path: '*',
    name: 'Not found page',
  },

  registration: {
    path: 'registration',
    name: 'Registration page',
  },
};
type TAllRoutes = {
  [key in keyof typeof routes]: IRouteItem;
};
const routes = {
  ...baseRoutes,
};
export const AllRoutes: TAllRoutes = routes;
