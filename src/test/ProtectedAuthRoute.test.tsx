import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProtectedAuthRoute } from '../routes/AppRouter';
import { store } from '../redux/store';
import { authSlice } from '../redux/AuthSlice';
test('ProtectedAuthRoute renders children when user is authorized', () => {
  const { setIsTokenValid } = authSlice.actions;
  store.dispatch(setIsTokenValid(true));

  const { getByText } = render(
    <Provider store={store}>
      <Router>
        <ProtectedAuthRoute>
          <div>Authorized Content</div>
        </ProtectedAuthRoute>
      </Router>
    </Provider>
  );

  const authorizedContent = getByText('Authorized Content');
  expect(authorizedContent).toBeInTheDocument();
});
