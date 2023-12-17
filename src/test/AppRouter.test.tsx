import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { AppRouter } from '../routes/AppRouter';
import { authSlice } from '../redux/AuthSlice';
import { AllRoutes } from '../routes/allRoutes';
import LanguageContextProvider from '../localization/LangContextProvider';

vi.mock('@uiw/react-codemirror', () => ({
  __esModule: true,
  default: () => <div>Mocked CodeMirror</div>,
}));

describe('AppRouter', () => {
  const { setIsTokenValid } = authSlice.actions;

  beforeEach(() => {
    store.dispatch(setIsTokenValid(false));
  });

  it('WelcomePage renders correctly', () => {
    render(
      <Provider store={store}>
        <LanguageContextProvider>
          <MemoryRouter initialEntries={[AllRoutes.root.path]}>
            <AppRouter />
          </MemoryRouter>
        </LanguageContextProvider>
      </Provider>
    );

    const welcomePageElement = screen.getByText('GraphQL', {
      selector: 'h1.welcome-header',
    });
    expect(welcomePageElement).toBeInTheDocument();
  });

  it('renders LoginPage for unauthenticated user when navigating to /login', () => {
    render(
      <Provider store={store}>
        <LanguageContextProvider>
          <MemoryRouter initialEntries={[`/${AllRoutes.login.path}`]}>
            <AppRouter />
          </MemoryRouter>
        </LanguageContextProvider>
      </Provider>
    );

    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  it('renders EditorPage for authenticated user when navigating to /editor', () => {
    store.dispatch(setIsTokenValid(true));

    render(
      <Provider store={store}>
        <LanguageContextProvider>
          <MemoryRouter initialEntries={[`/${AllRoutes.editor.path}`]}>
            <AppRouter />
          </MemoryRouter>
        </LanguageContextProvider>
      </Provider>
    );

    const inputElement = screen.getByTestId('input-http');
    expect(inputElement).toBeInTheDocument();
  });

  it('redirects to WelcomePage when navigating to an invalid route', () => {
    render(
      <Provider store={store}>
        <LanguageContextProvider>
          <MemoryRouter initialEntries={['/invalid-route']}>
            <AppRouter />
          </MemoryRouter>
        </LanguageContextProvider>
      </Provider>
    );

    const notPageFoundTitle = screen.getByText(/404 Not Found/i);
    expect(notPageFoundTitle).toBeInTheDocument();
  });
});
