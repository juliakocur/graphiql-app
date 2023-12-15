import React from 'react';
import { Button } from '@mui/material';
import { LanguageContext } from '../../localization/LangContextProvider';
import { Localization } from '../../localization/Localization';
import './ErrorBoundary.css';

export interface IProps {
  children: React.ReactNode;
}

export interface IState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  reload() {
    location.reload();
  }

  static getDerivedStateFromError(error: Error) {
    console.error('Catch error: ', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h3>
            <LanguageContext.Consumer>
              {() => {
                const language =
                  localStorage.getItem('language') === 'ru' ? 'ru' : 'en';
                // тут через LS работает как надо
                return <span>{Localization[language].boundary}</span>;
              }}
            </LanguageContext.Consumer>
          </h3>
          <LanguageContext.Consumer>
            {(value) => {
              console.log(value.language);
              // тут смена языка происходит только после перезагрузки страницы
              return (
                <Button variant="contained" size="small" onClick={this.reload}>
                  {Localization[value.language].reload}
                </Button>
              );
            }}
          </LanguageContext.Consumer>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
