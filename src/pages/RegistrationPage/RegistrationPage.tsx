import { useContext } from 'react';
import SignInForm from '../../components/Forms/SignInForm';
import { registerWithEmailAndPassword } from '../../firebase/firebase';
import { LanguageContext } from '../../localization/LangContextProvider';
import { Localization } from '../../localization/Localization';

const RegistrationPage = () => {
  const { language } = useContext(LanguageContext);
  return (
    <>
      <h1>{Localization[language]['registration-title']}</h1>
      <SignInForm submitHandler={registerWithEmailAndPassword} />
    </>
  );
};

export default RegistrationPage;
