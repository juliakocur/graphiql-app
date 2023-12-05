import * as yup from 'yup';

export const schema = yup.object({
  email: yup
    .string()
    .required('Field is mandatory')
    .email('Email has an invalid format')
    .matches(
      /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
      'Email has an invalid format'
    ),
  password: yup
    .string()
    .required('Field is mandatory')
    .test(
      'len',
      'Password length must be at least 8 characters',
      (password) => password.length >= 8
    )
    .matches(
      /[A-ZА-ЯЁ]/u,
      'Password must contain at least one uppercase letter'
    )
    .matches(
      /[a-zа-яё]/u,
      'Password must contain at least one lowercase letter'
    )
    .matches(/[0-9]/u, 'Password must contain at least one digit')
    .matches(
      /[^A-ZА-Яa-zа-я0-9Ёё\s]/u,
      'Password must contain at least one special character'
    ),
});

export type IFormData = yup.InferType<typeof schema>;
