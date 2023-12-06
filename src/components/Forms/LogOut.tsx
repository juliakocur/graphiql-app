import { Button } from '@mui/material';
import { logout } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { authSlice } from '../../redux/AuthSlice';
import { useAppDispatch } from '../../redux/reduxHooks';

const LogOutBtn = () => {
  const navigate = useNavigate();
  const { setIsTokenValid } = authSlice.actions;
  const dispatch = useAppDispatch();

  const logoutClickHandler = () => {
    logout();
    dispatch(setIsTokenValid(false));
    navigate('/', { replace: true });
  };
  return (
    <Button variant="contained" type="submit" onClick={logoutClickHandler}>
      LogOut
    </Button>
  );
};

export default LogOutBtn;
