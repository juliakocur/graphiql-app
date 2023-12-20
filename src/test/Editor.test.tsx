import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import LanguageContextProvider from '../localization/LangContextProvider';
import userEvent from '@testing-library/user-event';
import { GraphSection } from '../components/Editor/GraphSection';

vi.mock('@uiw/react-codemirror', () => ({
  __esModule: true,
  default: ({
    value,
    onChange,
    editable,
    ...rest
  }: {
    value: string;
    onChange: (value: string) => void;
    editable?: boolean;
  }) => (
    <textarea
      data-testid="mocked-code-mirror"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      readOnly={editable}
      {...rest}
    />
  ),
}));

const mockedFetch = vi.spyOn(window, 'fetch');

describe('Editor test', () => {
  userEvent.setup();
  //  const errors = Localization['en'].form.formValidationErrors;
  const testUrl = 'test url';
  const testQuery =
    'query AllChar($name:String){characters(page:2,filter:{name:$name}){info{count}}}';

  beforeEach(async () => {
    render(
      <Provider store={store}>
        <LanguageContextProvider>
          <GraphSection />
        </LanguageContextProvider>
      </Provider>
    );
    await userEvent.type(screen.getByTestId('input-http'), testUrl);
    // act(() => {
    fireEvent.change(screen.getByTestId('response-request-area'), {
      target: { value: testQuery },
    });
    fireEvent.blur(screen.getByTestId('response-request-area'));
    //   });

    /*     await userEvent.type(
      screen.getByTestId('response-request-area'),
      testQuery
    ); */
    //await userEvent.type(screen.getByTestId('variables-text'), '')
    //await userEvent.type(screen.getByTestId('input-http'), testUrl)
  });

  it('should render editor correctly', () => {
    expect(screen.getByTestId('input-http')).toBeInTheDocument();
    expect(screen.getByText(/►/i)).toBeInTheDocument();
    expect(screen.getByTestId('response-request-area')).toBeInTheDocument();
    expect(screen.getByText(/variables/i)).toBeInTheDocument();
    expect(screen.getByText(/add new header/i)).toBeInTheDocument();
  });

  it('should add vars', async () => {
    fireEvent.change(screen.getByTestId('response-request-area'), {
      target: { value: testQuery },
    });
    /*  const varsWrapper = screen.getByText(/variables/i);
    await userEvent.click(varsWrapper); */

    const varsArea = screen.getByTestId('variables-text');
    const newTestVariables = { name: 'value' };
    fireEvent.change(varsArea, {
      target: { value: JSON.stringify(newTestVariables) },
    });
    fireEvent.blur(varsArea);
    await userEvent.click(screen.getByText(/►/i));
    expect(mockedFetch).toBeCalledWith(testUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: testQuery,
        variables: newTestVariables,
      }),
    });
    // });
  });
  it('should add headers', () => {
    //  expect(1).toBe(1);
  });
});
