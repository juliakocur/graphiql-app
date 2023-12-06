import { useEffect } from 'react';
import LogOutBtn from '../../components/Forms/LogOut';
import { useAppSelector } from '../../redux/reduxHooks';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const { isTokenValid } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isTokenValid) {
      navigate('/', { replace: true });
    }
  }, [isTokenValid, navigate]);
  return (
    <>
      <div>main</div>
      <LogOutBtn />
    </>
  );
};

export default MainPage;
