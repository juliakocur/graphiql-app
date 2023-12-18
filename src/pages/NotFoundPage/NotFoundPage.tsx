import { useContext } from 'react';
import { LanguageContext } from '../../localization/LangContextProvider';
import { Localization } from '../../localization/Localization';
import './NotFoundPage.css';
const NotFoundPage = () => {
  const { language } = useContext(LanguageContext);
  return (
    <div className="page-not-found">
      <p className="title-page-not-found">
        {Localization[language]['page-not-found']}
      </p>
    </div>
  );
};

export default NotFoundPage;
