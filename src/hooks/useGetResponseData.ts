import { useState, useEffect } from 'react';
import { sendRequest } from '../utils/graphqlRequests';
import { IRequestParams, IResponseResultData } from '../types/types';

interface IResultType {
  data: IResponseResultData | null;
  error: unknown | null;
}

const promiseWrapper = (promise: Promise<IResultType>) => {
  let status = 'pending';
  let result: { data: IResponseResultData | null; error: unknown | null };

  const suspender = promise.then(
    (data) => {
      status = 'success';
      result = data;
    },
    (error) => {
      status = 'error';
      result = error;
    }
  );

  return function getResult() {
    switch (status) {
      case 'pending':
        throw suspender;
      case 'success':
        return result;
      case 'error':
        throw result;
      default:
        throw new Error('Unknown status');
    }
  };
};

function useGetResponseData({ params }: { params: IRequestParams | null }) {
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

  return result;
}

export default useGetResponseData;
