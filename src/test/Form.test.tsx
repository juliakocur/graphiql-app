import { render, screen } from '@testing-library/react';
import SignInForm from '../components/Forms/SignInForm';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import LanguageContextProvider from '../localization/LangContextProvider';
import userEvent from '@testing-library/user-event';
import { Localization } from '../localization/Localization';

describe('Form test', () => {
  const submitHandler = vi.fn();
  const user = userEvent.setup();
  const errors = Localization['en'].form.formValidationErrors;

  beforeEach(() => {
    render(
      <Provider store={store}>
        <LanguageContextProvider>
          <SignInForm submitHandler={submitHandler} />
        </LanguageContextProvider>
      </Provider>
    );
  });

  it('should render form correctly', () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/submit/i)).toBeInTheDocument();
  });
  it('should validate email', async () => {
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'wrong email');
    expect(
      screen.getByText(
        Localization['en'].form.formValidationErrors.invalidEmail
      )
    ).toBeInTheDocument();
  });

  it('should validate password: length', async () => {
    await user.type(screen.getByLabelText(/password/i), 'pas');
    expect(screen.getByText(errors.passwordLength)).toBeInTheDocument();
  });

  it('should validate password: digits', async () => {
    await user.type(
      screen.getByLabelText(/password/i),
      'Password-without-digits'
    );
    expect(screen.getByText(errors.passwordDigit)).toBeInTheDocument();
  });

  it('should validate password: uppercase letter', async () => {
    await user.type(
      screen.getByLabelText(/password/i),
      'password-without-digits123'
    );
    expect(
      screen.getByText(errors.passwordUppercaseLetter)
    ).toBeInTheDocument();
  });

  it('should validate password: lowercase letter', async () => {
    await user.type(screen.getByLabelText(/password/i), 'PASSWORD-123');
    expect(
      screen.getByText(errors.passwordLowercaseLetter)
    ).toBeInTheDocument();
  });

  it('should validate password: special character', async () => {
    await user.type(screen.getByLabelText(/password/i), 'Password123');
    expect(screen.getByText(errors.passwordSpecialChar)).toBeInTheDocument();
  });

  it('should show/hide password', async () => {
    const passwordInput = screen.getByLabelText<HTMLInputElement>(/password/i);
    expect(passwordInput.type).toBe('password');
    const passwordVisibilitySwitcher = screen.getByRole('checkbox');
    expect(passwordVisibilitySwitcher).toBeInTheDocument();
    await user.click(passwordVisibilitySwitcher);
    expect(passwordInput.type).toBe('text');
  });

  it('should call submitHandler when submit button is clicked', async () => {
    submitHandler.mockRejectedValue({ code: 'test error' });
    const validEmail = 'test@user.com';
    const validPassword = 'Password12345!';
    const passwordInput = screen.getByLabelText<HTMLInputElement>(/password/i);
    const emailInput = screen.getByLabelText<HTMLInputElement>(/email/i);
    await user.type(emailInput, validEmail);
    await user.type(passwordInput, validPassword);
    const submitBtn = screen.getByText<HTMLButtonElement>(/submit/i);
    await user.click(submitBtn);
    expect(submitHandler).toBeCalledWith(validEmail, validPassword);
  });
});
