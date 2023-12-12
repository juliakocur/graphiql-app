type IAuthErrorsType = Record<string, { ru: string; en: string }>;

export const authErrors: IAuthErrorsType = {
  'auth/email-already-exists': {
    ru: 'Email уже используется',
    en: 'The provided email is already in use by an existing user',
  },
  'auth/id-token-expired': {
    ru: 'Срок действия токена истек.',
    en: '	The provided Firebase ID token is expired.',
  },
  'auth/id-token-revoked': {
    ru: 'Токен Firebase ID был отозван.',
    en: 'The Firebase ID token has been revoked.',
  },
  'auth/invalid-credential': {
    ru: 'Неверный логин/пароль',
    en: 'Invalid login/password',
  },
  'aauth/invalid-email': {
    ru: 'Невалидный email. Это должен быть адрес электронной почты в виде строки.',
    en: 'The provided value for the email user property is invalid. It must be a string email address.',
  },
  'auth/invalid-password': {
    ru: 'Значение для свойства password недопустимо. Это должна быть строка, состоящая не менее чем из шести символов.',
    en: 'The provided value for the password user property is invalid. It must be a string with at least six characters.',
  },
  'auth/too-many-requests': {
    ru: 'Количество запросов превышает максимально допустимое, попробуйте позже',
    en: 'The number of requests exceeds the maximum allowed.',
  },
  'general-error': {
    ru: 'Что-то пошло не так, попробуйте позже',
    en: 'Something went wrong, try again later',
  },
  'auth/email-already-in-use': {
    ru: 'Пользователь с таким email уже существует',
    en: 'The provided email is already in use by an existing user',
  },
  'vars-json': {
    ru: 'Переменные должны быть представлены в формате JSON',
    en: 'Variables are invalid JSON',
  },
};
