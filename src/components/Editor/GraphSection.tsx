import { Button } from '@mui/material';
import { GraphHeaders } from './GraphHeaders';
import { GraphVariables } from './GraphVariables';
import { RequestSection } from './RequestSection';
import { ResponseSection } from './ResponseSection';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import { UrlInput } from './UrlInput';
import { Suspense, useState } from 'react';
import { IRequestParams } from '../../types/types';
import { graphSlice } from '../../redux/GraphQLSlice';

export const GraphSection = () => {
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

  return (
    <>
      <div className="url-input">
        <UrlInput />
      </div>
      <div className="graph-container">
        <RequestSection />
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
        <Suspense fallback={<div>Loading</div>}>
          <ResponseSection params={params} />{' '}
        </Suspense>
      </div>
      <div className="variables-headers">
        <GraphHeaders />
        <GraphVariables />
      </div>
    </>
  );
};
