import { useContext } from 'react';
import SignInForm from '../../components/Forms/SignInForm';
import { logInWithEmailAndPassword } from '../../firebase/firebase';
import { LanguageContext } from '../../localization/LangContextProvider';
import { Localization } from '../../localization/Localization';

const LoginPage = () => {
  const { language } = useContext(LanguageContext);
  return (
    <>
      <h1>{Localization[language]['login-title']}</h1>
      <SignInForm submitHandler={logInWithEmailAndPassword} />
    </>
  );
};

export default LoginPage;
