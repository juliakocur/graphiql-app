import { useContext } from 'react';
import { IResponseResultData } from '../../types/types';
import { LanguageContext } from '../../localization/LangContextProvider';
import { Localization } from '../../localization/Localization';
import CodeMirror from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';

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
          <CodeMirror
            value={JSON.stringify(data ?? undefined, null, 2)}
            extensions={[graphql()]}
            editable={false}
            readOnly={true}
          />
        </pre>
      </div>
    </>
  );
};
