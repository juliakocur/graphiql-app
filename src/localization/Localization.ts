import { ValidationErrorsCodes } from '../utils/constants';

export const Localization = {
  en: {
    editor: 'Editor',
    registration: 'Registration',
    login: 'Login',
    logout: 'LogOut',
    submit: 'Submit',
    'welcome-text1':
      'GraphQL is a query language for your API, and a server-side runtime for executing queries using a type system you define for your data. GraphQL is not tied to any specific database or storage engine and is instead backed by your existing code and data.',
    'welcome-text2':
      'As an alternative to REST, GraphQL lets developers construct requests that pull data from multiple data sources in a single API call. Additionally, GraphQL gives API maintainers the flexibility to add or deprecate fields without impacting existing queries. Developers can build APIs with whatever methods they prefer, and the GraphQL specification will ensure they function in predictable ways to clients.',
    'card-project': {
      title: 'Project',
      text: 'This application provides access to GraphQL for authorized users. We tried to create an easy-to-use open source data manipulation product for building web-oriented software interfaces.',
    },
    'card-course': {
      title: 'Course',
      text: 'This project was completed as part of the React course from RSSchool. The course provides theoretical and practical knowledge sufficient to start working on the React framework.',
    },
    'card-developers': {
      title: 'Developers',
      nat: 'Natalia Oreshkova',
      ant: 'Anton Belski',
      jul: 'Julia Kocur',
    },
    'registration-title': 'Sign Up',
    'login-title': 'Sign In',
    form: {
      email: 'Email',
      password: 'Password',
      submit: 'submit',
      formValidationErrors: {
        [ValidationErrorsCodes.required]: 'Field is mandatory',
        [ValidationErrorsCodes.invalidEmail]: 'Email has an invalid format',
        [ValidationErrorsCodes.passwordLength]:
          'Password length must be at least 8 characters',
        [ValidationErrorsCodes.passwordUppercaseLetter]:
          'Password must contain at least one uppercase letter',
        [ValidationErrorsCodes.passwordLowercaseLetter]:
          'Password must contain at least one lowercase letter',
        [ValidationErrorsCodes.passwordSpecialChar]:
          'Password must contain at least one special character',
        [ValidationErrorsCodes.passwordDigit]:
          'Password must contain at least one digit',
      },
    },
    error: 'Error',
    request: 'Request',
    response: 'Response',
    prettify: 'prettify',
    newHeader: '+ Add new Header',
    variables: 'Variables',
    del: 'DEL',
    reload: 'Reload',
    boundary: 'Oops.. Something went wrong.',
    'page-not-found': 'Page not Found',
    schema: 'Schema',
  },

  ru: {
    editor: 'Редактор',
    registration: 'Регистрация',
    login: 'Вход',
    logout: 'Выйти',
    submit: 'Отправить',
    'welcome-text1':
      'GraphQL — это язык запросов для вашего API и серверная среда выполнения запросов с использованием системы типов, которую вы определяете для своих данных. GraphQL не привязан к конкретной базе данных и вместо этого поддерживается существующим кодом и данными.',
    'welcome-text2':
      'В отличие от REST, GraphQL позволяет создавать запросы, извлекающие данные из нескольких источников с помощью единственного вызова API. Кроме того, GraphQL дает разработчикам API возможность добавлять или удалять поля, не затрагивая существующие запросы. Разработчики могут создавать API методами, которые они предпочитают, а спецификация GraphQL гарантирует, что они будут работать предсказуемо для клиентов.',
    'card-project': {
      title: 'О проекте',
      text: 'Это приложение предоставляет доступ к GraphQL-редактору авторизованным пользователям. В редакторе пользователи могут протестировать любое API, которое поддерживает GraphqL-запросы',
    },
    'card-course': {
      title: 'О курсе',
      text: 'Этот проект был выполнен в рамках курса React от RSSchool. Курс дает теоретические и практические знания, достаточные для начала работы над фреймворком React.',
    },
    'card-developers': {
      title: 'Разработчики',
      nat: 'Наталья Орешкова',
      ant: 'Антон Бельский',
      jul: 'Юлия Коцур',
    },
    'registration-title': 'Регистрация',
    'login-title': 'Вход',
    form: {
      email: 'Электронная почта',
      password: 'Пароль',
      submit: 'Отправить',
      formValidationErrors: {
        [ValidationErrorsCodes.required]: 'Поле является обязательным',
        [ValidationErrorsCodes.invalidEmail]:
          'Неверный формат электронной почты',
        [ValidationErrorsCodes.passwordLength]:
          'Длина пароля должна быть не менее 8 символов',
        [ValidationErrorsCodes.passwordUppercaseLetter]:
          'Пароль должен содержать хотя бы 1 заглавную букву',
        [ValidationErrorsCodes.passwordLowercaseLetter]:
          'Пароль должен содержать хотя бы 1 строчную букву',
        [ValidationErrorsCodes.passwordSpecialChar]:
          'Пароль должен содержать хотя бы 1 специальный символ',
        [ValidationErrorsCodes.passwordDigit]:
          'Пароль должен содержать хотя бы 1 цифру',
      },
    },
    error: 'Ошибка',
    request: 'Запрос',
    response: 'Ответ',
    prettify: 'Форматировать',
    newHeader: '+ Добавить Заголовок',
    variables: 'Переменные',
    del: 'Удалить',
    reload: 'Обновить',
    boundary: 'Уупс.. Что-то пошло не так.',
    'page-not-found': 'Страница не найдена',
    schema: 'Схема',
  },
};
