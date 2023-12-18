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
        <LanguageContext.Consumer>
          {({ language }) => (
            <div className="error-boundary">
              <h3>
                <span>{Localization[language].boundary}</span>
              </h3>
              <Button
                variant="contained"
                size="small"
                data-testid="reload"
                onClick={this.reload}
              >
                {Localization[language].reload}
              </Button>
            </div>
          )}
        </LanguageContext.Consumer>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
