import { Button } from '@mui/material';
import { Prettify } from './Prettify';
import { GraphHeaders } from './GraphHeaders';
import { GraphVariables } from './GraphVariables';
import { RequestSection } from './RequestSection';
import { ResponseSection } from './ResponseSection';
import { useAppSelector } from '../../redux/reduxHooks';
import { UrlInput } from './UrlInput';
import { Suspense, useState } from 'react';
import { IRequestParams } from '../../hooks/useGetResponseData';

export const GraphSection = () => {
  const { url, query, variables, headers } = useAppSelector(
    (state) => state.graphReducer
  );
  const [params, setParams] = useState<IRequestParams | null>(null);

  const clickHandler = () => {
    setParams({ url, query, variables: JSON.parse(variables), headers });
  };
  return (
    <>
      <div className="url-input">
        <Prettify />
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
