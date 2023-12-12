import { IResponseResultData } from '../types/types';

export interface IResultType {
  data: IResponseResultData | null;
  error: unknown | null;
}

export const promiseWrapper = (promise: Promise<IResultType>) => {
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
