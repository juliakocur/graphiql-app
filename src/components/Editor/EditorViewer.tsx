import { Button, FormControlLabel, Switch } from '@mui/material';
import { ResponseRequest } from './ResponseRequest';
import { useState } from 'react';
import { graphSlice } from '../../redux/GraphQLSlice';
import { useAppSelector, useAppDispatch } from '../../redux/reduxHooks';
import { IRequestParams, Mode } from '../../types/types';
import React from 'react';
import { Loader } from '../Loader/Loader';

export const EditorViewer = () => {
  const [mode, changeMode] = useState<Mode>(Mode.request);
  const { url, query, variables, headers } = useAppSelector(
    (state) => state.graphReducer
  );

  const { setError } = graphSlice.actions;
  const dispatch = useAppDispatch();

  const [params, setParams] = useState<IRequestParams | null>(null);

  const clickHandler = () => {
    try {
      const parsedVariables = variables ? JSON.parse(variables) : {};

      setParams({ url, query, variables: parsedVariables, headers });
      dispatch(setError(null));
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch(setError('vars-json'));
      }
    }
  };

  const switchMode = () => {
    changeMode(mode === Mode.request ? Mode.response : Mode.request);
  };

  return (
    <section className="response-request">
      <div className="submit-button">
        <Button
          variant="contained"
          size="small"
          type="submit"
          onClick={clickHandler}
        >
          ►
        </Button>
      </div>
      <FormControlLabel
        control={<Switch defaultChecked />}
        label={mode}
        onClick={switchMode}
      />
      <React.Suspense
        fallback={
          <div className="response-request loader">
            <Loader />
          </div>
        }
      >
        <ResponseRequest mode={mode} params={params}></ResponseRequest>
      </React.Suspense>
    </section>
  );
};
