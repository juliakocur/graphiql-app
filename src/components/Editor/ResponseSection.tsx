import { useContext, useEffect } from 'react';
import useGetResponseData from '../../hooks/useGetResponseData';
import { IRequestParams } from '../../types/types';
import { graphSlice } from '../../redux/GraphQLSlice';
import { useAppDispatch } from '../../redux/reduxHooks';
import { LanguageContext } from '../../localization/LangContextProvider';
import { Localization } from '../../localization/Localization';

export const ResponseSection = ({
  params,
}: {
  params: IRequestParams | null;
}) => {
  const { data, error } = useGetResponseData({
    params,
  });
  const { language } = useContext(LanguageContext);
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
        <div className="request-response-title">
          {Localization[language].response}
        </div>
        <pre className="response-area">
          {JSON.stringify(data ?? undefined, null, 2)}
        </pre>
      </div>
    </>
  );
};
