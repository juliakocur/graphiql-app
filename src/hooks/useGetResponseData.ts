import { useState, useEffect } from 'react';
import { sendRequest } from '../utils/graphqlRequests';

const promiseWrapper = (promise: Promise<unknown>) => {
  let status = 'pending';
  let result: unknown;

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

export interface IRequestParams {
  url: string;
  query: string;
  headers: Record<string, string>;
  variables: Record<string, string>;
}

function useGetResponseData({ params }: { params: IRequestParams | null }) {
  const [result, setResults] = useState<unknown>();

  useEffect(() => {
    if (!params) {
      return;
    }
    const { url, query, headers, variables } = params;
    const getData = async () => {
      const promise = sendRequest(url, query, headers, variables);
      setResults(promiseWrapper(promise));
    };

    getData();
  }, [params]);

  return result;
}

export default useGetResponseData;
