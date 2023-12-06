import SignInForm from '../../components/Forms/SignInForm';
import { logInWithEmailAndPassword } from '../../firebase/firebase';

const LoginPage = () => {
  return (
    <>
      <h1>SignIn</h1>
      <SignInForm submitHandler={logInWithEmailAndPassword} />
    </>
  );
};

export default LoginPage;
