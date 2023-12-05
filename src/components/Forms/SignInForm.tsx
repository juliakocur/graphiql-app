import { Button, TextField } from '@mui/material';
import './form.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormData, schema } from './validationSchema';

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormData>({
    mode: 'onChange',
    resolver: yupResolver<IFormData>(schema),
  });

  const onSubmit = (data: IFormData) => console.log(data);

  return (
    <>
      <section className="sign-in-section">
        <h1>SignIn</h1>
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
      </section>
    </>
  );
};

export default SignInForm;
