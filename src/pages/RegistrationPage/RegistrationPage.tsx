import { useEffect } from 'react';
import SignInForm from '../../components/Forms/SignInForm';
import { registerWithEmailAndPassword } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/reduxHooks';

const RegistrationPage = () => {
  const { isTokenValid } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  useEffect(() => {
    if (isTokenValid) navigate('/main', { replace: true });
  }, [isTokenValid, navigate]);

  return (
    <>
      {!isTokenValid && (
        <>
          <h1>SignUp</h1>
          <SignInForm submitHandler={registerWithEmailAndPassword} />
        </>
      )}
    </>
  );
};

export default RegistrationPage;
