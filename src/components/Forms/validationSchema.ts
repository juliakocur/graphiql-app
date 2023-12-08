import * as yup from 'yup';
import { ValidationErrorsCodes } from '../../utils/constants';

export const schema = yup.object({
  email: yup
    .string()
    .required(ValidationErrorsCodes.required)
    .email(ValidationErrorsCodes.invalidEmail)
    .matches(
      /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
      ValidationErrorsCodes.invalidEmail
    ),
  password: yup
    .string()
    .required(ValidationErrorsCodes.required)
    .test(
      'len',
      ValidationErrorsCodes.passwordLength,
      (password) => password.length >= 8
    )
    .matches(/[A-ZА-ЯЁ]/u, ValidationErrorsCodes.passwordUppercaseLetter)
    .matches(/[a-zа-яё]/u, ValidationErrorsCodes.passwordLowercaseLetter)
    .matches(/[0-9]/u, ValidationErrorsCodes.passwordDigit)
    .matches(
      /[^A-ZА-Яa-zа-я0-9Ёё\s]/u,
      ValidationErrorsCodes.passwordSpecialChar
    ),
});

export type IFormData = yup.InferType<typeof schema>;
