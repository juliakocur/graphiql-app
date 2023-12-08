import { Button, Checkbox, FormControl, TextField } from '@mui/material';
import './form.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormData, schema } from './validationSchema';
import { useContext, useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { LanguageContext } from '../../localization/LangContextProvider';
import { Localization } from '../../localization/Localization';
import { ValidationErrorsCodes } from '../../utils/constants';
import ErrorAlert from '../Errors/ErrorAlert';
import { FirebaseError } from 'firebase/app';

const SignInForm = ({
  submitHandler,
}: {
  submitHandler: (email: string, password: string) => Promise<void>;
}) => {
  const { language } = useContext(LanguageContext);
  const [errorCode, setErrorCode] = useState<string>();
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
    submitHandler(email, password).catch((err: FirebaseError) => {
      setErrorCode(err.code);
      setTimeout(() => {
        setErrorCode(undefined);
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
            helperText={
              errors.email?.message
                ? Localization[language].form.formValidationErrors[
                    errors.email.message as ValidationErrorsCodes
                  ]
                : ' '
            }
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
              helperText={
                errors.password?.message
                  ? Localization[language].form.formValidationErrors[
                      errors.password.message as ValidationErrorsCodes
                    ]
                  : ' '
              }
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

        <ErrorAlert errorCode={errorCode} />
      </section>
    </>
  );
};

export default SignInForm;
