import { Button } from '@mui/material';
import { logout } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const LogOutBtn = () => {
  const navigate = useNavigate();
  const logoutClickHandler = () => {
    logout();
    navigate('/', { replace: true });
  };
  return (
    <Button variant="contained" type="submit" onClick={logoutClickHandler}>
      LogOut
    </Button>
  );
};

export default LogOutBtn;
