import { useContext } from 'react';
import { LanguageContext } from '../../localization/LangContextProvider';
import { Loader } from '../Loader/Loader';
import { Localization } from '../../localization/Localization';

export const ResponseFallback = () => {
  const { language } = useContext(LanguageContext);
  return (
    <div className="response">
      <div className="request-response-title">
        {Localization[language].response}
      </div>
      <Loader />
    </div>
  );
};
