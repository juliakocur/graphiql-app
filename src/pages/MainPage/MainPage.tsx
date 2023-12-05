import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import LogOutBtn from '../../components/Forms/LogOut';
import { auth } from '../../firebase/firebase';

const MainPage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate('/main', { replace: true });
  }, [user, navigate]);
  return (
    <>
      <div>main</div>
      <LogOutBtn />
    </>
  );
};

export default MainPage;
