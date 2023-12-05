import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import SignInForm from '../../components/Forms/SignInForm';
import { auth, logInWithEmailAndPassword } from '../../firebase/firebase';

const LoginPage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate('/main', { replace: true });
  }, [user, navigate]);
  return (
    <>
      <h1>SignIn</h1>
      <SignInForm submitHandler={logInWithEmailAndPassword} />
    </>
  );
};

export default LoginPage;
