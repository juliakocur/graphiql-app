import { useContext } from 'react';
import { IResponseResultData } from '../../types/types';
import { LanguageContext } from '../../localization/LangContextProvider';
import { Localization } from '../../localization/Localization';

export const ResponseSection = ({
  data,
}: {
  data: IResponseResultData | null;
}) => {
  const { language } = useContext(LanguageContext);

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
