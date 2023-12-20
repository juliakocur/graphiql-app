import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../localization/LangContextProvider';
import { graphSlice } from '../../redux/GraphQLSlice';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import { IRequestParams, IResponseResultData, Mode } from '../../types/types';
import { IResultType, promiseWrapper } from '../../hooks/useGetResponseData';
import CodeMirror from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import { sendRequest } from '../../utils/graphqlRequests';
import { Button } from '@mui/material';
import { Localization } from '../../localization/Localization';
import { prettifyRequestQuery } from '../../utils/prettify';

export const ResponseRequest = ({
  mode,
  params,
}: {
  mode: Mode;
  params: IRequestParams | null;
}) => {
  const { query } = useAppSelector((state) => state.graphReducer);
  const { language } = useContext(LanguageContext);
  const [requestQuery, setRequestQuery] = useState(query);
  const { setError, setQuery } = graphSlice.actions;
  const dispatch = useAppDispatch();
  const [result, setResults] = useState<IResultType>({
    data: null,
    error: null,
  });

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

  const onBlurHandler = () => {
    if (query !== requestQuery) {
      dispatch(setQuery(requestQuery));
    }
  };

  const prettify = () => {
    setRequestQuery(prettifyRequestQuery(requestQuery));
  };

  return (
    <div>
      {mode === Mode.request && (
        <div className="prettify-button">
          <Button
            variant="contained"
            size="small"
            onClick={prettify}
            data-testid={'prettify-btn'}
          >
            {Localization[language].prettify}
          </Button>
        </div>
      )}
      <CodeMirror
        className="request-area"
        data-testid={'response-request-area'}
        value={
          mode === Mode.request
            ? requestQuery
            : JSON.stringify(result.data ?? undefined, null, 2)
        }
        extensions={[graphql()]}
        onChange={(value) => {
          setRequestQuery(value);
        }}
        onBlur={onBlurHandler}
        editable={mode === Mode.request}
        readOnly={false}
        autoFocus={true}
      />
    </div>
  );
};
