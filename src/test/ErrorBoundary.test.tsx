import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

describe('ErrorBoundary', () => {
  it('should render error UI and reloads on button click', () => {
    const originalConsoleError = console.error;
    console.error = vi.fn();

    Object.defineProperty(window, 'location', {
      writable: true,
      value: { assign: vi.fn() },
    });

    Object.defineProperty(window.location, 'reload', {
      writable: true,
      value: vi.fn(),
    });

    const ErrorThrowingComponent = () => {
      throw new Error('Test error');
    };
    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByTestId(/reload/i)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId(/reload/i));

    expect(window.location.reload).toHaveBeenCalled();
    console.error = originalConsoleError;
    vi.restoreAllMocks();
  });

  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Normal content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText(/normal content/i)).toBeInTheDocument();
  });
});
