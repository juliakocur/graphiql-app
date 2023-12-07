import { Alert, AlertTitle } from '@mui/material';
import { LanguageContext } from '../../localization/LangContextProvider';
import { useContext } from 'react';
import { Localization } from '../../localization/Localization';
import { authErrors } from '../../localization/authErrors';

const ErrorAlert = ({ errorCode }: { errorCode?: string }) => {
  const { language } = useContext(LanguageContext);

  const message =
    errorCode && errorCode in authErrors
      ? authErrors[errorCode][language]
      : authErrors['general-error'][language];
  return (
    <>
      {errorCode && (
        <Alert severity="error" className="alert">
          <AlertTitle>{Localization[language].error}</AlertTitle>
          {message}
        </Alert>
      )}
    </>
  );
};

export default ErrorAlert;
