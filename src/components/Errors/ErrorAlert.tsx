import { Alert, AlertTitle } from '@mui/material';
import { LanguageContext } from '../../localization/LangContextProvider';
import { useContext, useEffect } from 'react';
import { Localization } from '../../localization/Localization';
import { authErrors } from '../../localization/authErrors';
import { graphSlice } from '../../redux/GraphQLSlice';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';

const ErrorAlert = () => {
  const { language } = useContext(LanguageContext);
  const { setError } = graphSlice.actions;
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.graphReducer);

  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(setError(null));
    }, 3000);
    return () => {
      clearTimeout(timerId);
    };
  }, [error, dispatch, setError]);

  const errorMessage =
    error && error in authErrors ? authErrors[error][language] : error;
  return (
    <>
      {error && (
        <Alert severity="error" className="alert">
          <AlertTitle>{Localization[language].error}</AlertTitle>
          {errorMessage}
        </Alert>
      )}
    </>
  );
};

export default ErrorAlert;
