import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '../src/routes/AppRouter';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import LanguageContextProvider from './localization/LangContextProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <LanguageContextProvider>
        <ErrorBoundary>
          <AppRouter />
        </ErrorBoundary>
      </LanguageContextProvider>
    </Provider>
  </BrowserRouter>
);
