import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import LanguageContextProvider from '../../localization/LangContextProvider';

const BasePage = () => {
  return (
    <>
      <LanguageContextProvider>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </LanguageContextProvider>
    </>
  );
};

export default BasePage;
