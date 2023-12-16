import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import LanguageContextProvider from '../localization/LangContextProvider';
import { AppRouter } from '../routes/AppRouter';
import { AllRoutes } from '../routes/allRoutes';

describe('Test all routes', () => {
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

  it('RegistrationPage renders correctly', () => {
    render(
      <Provider store={store}>
        <LanguageContextProvider>
          <MemoryRouter initialEntries={[`/${AllRoutes.registration.path}`]}>
            <AppRouter />
          </MemoryRouter>
        </LanguageContextProvider>
      </Provider>
    );

    const registrationTitle = screen.getByText(/Sign Up/i);
    expect(registrationTitle).toBeInTheDocument();
  });
  it('LoginPage renders correctly', () => {
    render(
      <Provider store={store}>
        <LanguageContextProvider>
          <MemoryRouter initialEntries={[`/${AllRoutes.login.path}`]}>
            <AppRouter />
          </MemoryRouter>
        </LanguageContextProvider>
      </Provider>
    );

    const loginTitle = screen.getByText(/Sign In/i);
    expect(loginTitle).toBeInTheDocument();
  });
  it('NotFoundPage renders correctly', () => {
    render(
      <Provider store={store}>
        <LanguageContextProvider>
          <MemoryRouter initialEntries={[`/${AllRoutes.notFound.path}`]}>
            <AppRouter />
          </MemoryRouter>
        </LanguageContextProvider>
      </Provider>
    );

    const notPageFoundTitle = screen.getByText(/404 Not Found/i);
    expect(notPageFoundTitle).toBeInTheDocument();
  });
});
