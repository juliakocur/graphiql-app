import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import App from '../components/App/App';

describe('test App', () => {
  it('test App', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const headerElement = screen.getByText('GraphQL');
    expect(headerElement).toBeInTheDocument();
  });
});
