import {
  Alert,
  AlertTitle,
  Button,
  Checkbox,
  FormControl,
  TextField,
} from '@mui/material';
import './form.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormData, schema } from './validationSchema';
import { useContext, useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { LanguageContext } from '../../localization/LangContextProvider';
import { Localization } from '../../localization/Localization';

const SignInForm = ({
  submitHandler,
}: {
  submitHandler: (email: string, password: string) => Promise<void>;
}) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const { language } = useContext(LanguageContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormData>({
    mode: 'onChange',
    resolver: yupResolver<IFormData>(schema),
  });
  const [showPassword, setShowPassword] = useState(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = (data: IFormData) => {
    const { email, password } = data;
    submitHandler(email, password).catch((err: Error) => {
      setErrorMessage(err.message);
      setTimeout(() => {
        setErrorMessage(undefined);
      }, 2000);
    });
  };

  return (
    <>
      <section className="sign-in-section">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="form">
          <TextField
            fullWidth
            required
            id="sign-in-email"
            label={Localization[language].form.email}
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message || ' '}
          />
          <FormControl className="password-control">
            <TextField
              fullWidth
              required
              id="sign-in-password"
              label={Localization[language].form.password}
              error={!!errors.password}
              {...register('password')}
              type={showPassword ? 'password' : 'text'}
              helperText={errors.password?.message || ' '}
            ></TextField>
            <Checkbox
              className="show-password-icon"
              checkedIcon={<VisibilityOff />}
              icon={<Visibility />}
              onClick={handleClickShowPassword}
            />
          </FormControl>

          <Button
            variant="contained"
            size="large"
            type="submit"
            disabled={!isValid}
            fullWidth
          >
            {Localization[language].form.submit}
          </Button>
        </form>

        {errorMessage && (
          <Alert severity="error" className="alert">
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
          </Alert>
        )}
      </section>
    </>
  );
};

export default SignInForm;
