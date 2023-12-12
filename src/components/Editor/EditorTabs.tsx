import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { RequestSection } from './RequestSection';
import { CustomTabPanel } from './EditorViewer';
import { IRequestParams, IResponseResultData } from '../../types/types';
import { graphSlice } from '../../redux/GraphQLSlice';
import { useAppSelector, useAppDispatch } from '../../redux/reduxHooks';
import { IResultType, promiseWrapper } from '../../hooks/useGetResponseData';
import { sendRequest } from '../../utils/graphqlRequests';
import { ResponseSection } from './ResponseSection';

export const EditorTabs = ({ value }: { value: number }) => {
  const [params, setParams] = useState<IRequestParams | null>(null);
  const [result, setResults] = useState<IResultType>({
    data: null,
    error: null,
  });
  const { url, query, variables, headers } = useAppSelector(
    (state) => state.graphReducer
  );
  const { setError } = graphSlice.actions;
  const dispatch = useAppDispatch();

  const clickHandler = () => {
    try {
      const parsedVariables = variables ? JSON.parse(variables) : {};
      setParams({ url, query, variables: parsedVariables, headers });
      dispatch(setError(null));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(setError('vars-json'));
      }
    }
  };

  useEffect(() => {
    if (!params) {
      return;
    }
    const { url, query, headers, variables } = params;
    const getData = async () => {
      const promise = sendRequest<IResponseResultData>(
        url,
        query,
        headers,
        variables
      );
      setResults(promiseWrapper(promise));
    };
    getData();
  }, [params]);

  useEffect(() => {
    const { error } = result;
    if (error && error instanceof Error) {
      dispatch(setError(error.message));
    }
  }, [result, dispatch, setError]);

  return (
    <Box sx={{ width: '100%' }}>
      <CustomTabPanel value={value} index={0}>
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
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ResponseSection data={result.data} />
      </CustomTabPanel>
    </Box>
  );
};
