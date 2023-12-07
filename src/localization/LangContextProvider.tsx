import { FC, PropsWithChildren, createContext, useState } from 'react';
import { Languages, LocalStorageKeys } from '../utils/constants';

type LanguageContextProps = {
  language: Languages;
  switchLanguage: () => void;
};

const LanguageContextInitial = {
  language:
    (localStorage.getItem(LocalStorageKeys.language) as Languages) ||
    Languages.ru,
  switchLanguage: () => {},
};

export const LanguageContext = createContext<LanguageContextProps>(
  LanguageContextInitial
);

const LanguageContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [language, setLanguage] = useState(
    (localStorage.getItem(LocalStorageKeys.language) as Languages) ||
      Languages.ru
  );

  const switchLanguage = () => {
    setLanguage((prevLanguage) =>
      prevLanguage === Languages.ru ? Languages.en : Languages.ru
    );
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContextProvider;
