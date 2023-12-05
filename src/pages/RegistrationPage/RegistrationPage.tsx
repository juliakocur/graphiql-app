import { useEffect } from 'react';
import SignInForm from '../../components/Forms/SignInForm';
import { auth, registerWithEmailAndPassword } from '../../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate('/main', { replace: true });
  }, [user, navigate]);
  return (
    <>
      <h1>SignUp</h1>
      <SignInForm submitHandler={registerWithEmailAndPassword} />
    </>
  );
};

export default RegistrationPage;
