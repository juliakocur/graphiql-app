import { Alert, AlertTitle, Button, TextField } from '@mui/material';
import './form.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormData, schema } from './validationSchema';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const SignInForm = ({
  submitHandler,
}: {
  submitHandler: (email: string, password: string) => Promise<void>;
}) => {
  const [user] = useAuthState(auth);
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormData>({
    mode: 'onChange',
    resolver: yupResolver<IFormData>(schema),
  });

  const onSubmit = (data: IFormData) => {
    const { email, password } = data;
    submitHandler(email, password).catch((err: Error) => {
      setErrorMessage(err.message);
      setTimeout(() => {
        setErrorMessage(undefined);
      }, 2000);
    });
  };

  useEffect(() => {
    if (user) navigate('/main', { replace: true });
  }, [user, navigate]);

  return (
    <>
      <section className="sign-in-section">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="form">
          <TextField
            fullWidth
            required
            id="sign-in-email"
            label="Email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            fullWidth
            required
            id="sign-in-password"
            label="Password"
            error={!!errors.password}
            {...register('password')}
            helperText={errors.password?.message}
          />

          <Button
            variant="contained"
            type="submit"
            disabled={!isValid}
            fullWidth
          >
            Submit
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
