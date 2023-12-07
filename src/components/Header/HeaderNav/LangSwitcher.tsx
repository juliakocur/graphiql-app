import { FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { LanguageContext } from '../../../localization/LangContextProvider';
import { useContext } from 'react';
import { Languages, LocalStorageKeys } from '../../../utils/constants';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url(./ru.png)`,
        backgroundSize: 'contain',
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url(./en.png)`,
      backgroundSize: 'contain',
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));
const defaultChecked =
  localStorage.getItem(LocalStorageKeys.language) === Languages.ru;

const LangSwitcher = () => {
  const { switchLanguage } = useContext(LanguageContext);

  return (
    <FormControlLabel
      onClick={switchLanguage}
      control={
        <MaterialUISwitch sx={{ m: 1 }} defaultChecked={defaultChecked} />
      }
      label=""
    />
  );
};

export default LangSwitcher;
