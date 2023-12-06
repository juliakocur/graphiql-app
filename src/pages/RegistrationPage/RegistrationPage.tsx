import SignInForm from '../../components/Forms/SignInForm';
import { registerWithEmailAndPassword } from '../../firebase/firebase';

const RegistrationPage = () => {
  return (
    <>
      <h1>SignUp</h1>
      <SignInForm submitHandler={registerWithEmailAndPassword} />
    </>
  );
};

export default RegistrationPage;
