import { useEffect } from 'react';
import useGetResponseData from '../../hooks/useGetResponseData';
import { IRequestParams } from '../../types/types';
import { graphSlice } from '../../redux/GraphQLSlice';
import { useAppDispatch } from '../../redux/reduxHooks';

export const ResponseSection = ({
  params,
}: {
  params: IRequestParams | null;
}) => {
  const { data, error } = useGetResponseData({
    params,
  });
  const { setError } = graphSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error && error instanceof Error) {
      dispatch(setError(error.message));
    }
  }, [error, dispatch, setError]);

  return (
    <>
      <div className="response">
        <div className="request-response-title">Response</div>
        <pre className="response-area">
          {JSON.stringify(data ?? undefined, null, 2)}
        </pre>
      </div>
    </>
  );
};
