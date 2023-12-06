import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInForm from '../../components/Forms/SignInForm';
import { logInWithEmailAndPassword } from '../../firebase/firebase';
import { useAppSelector } from '../../redux/reduxHooks';

const LoginPage = () => {
  const { isTokenValid } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  useEffect(() => {
    if (isTokenValid) navigate('/main', { replace: true });
  }, [isTokenValid, navigate]);

  return (
    <>
      {!isTokenValid && (
        <>
          <h1>SignIn</h1>
          <SignInForm submitHandler={logInWithEmailAndPassword} />
        </>
      )}
    </>
  );
};

export default LoginPage;
