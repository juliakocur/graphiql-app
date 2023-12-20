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
      value={value}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
        onChange(e.target.value)
      }
      readOnly={editable}
      {...rest}
    />
  ),
}));

const mockedFetch = vi
  .spyOn(window, 'fetch')
  .mockImplementationOnce(() => {
    return Promise.resolve({
      json: () => Promise.resolve({ data: 'test data' }),
    } as Response);
  })
  .mockImplementationOnce(() => {
    return Promise.resolve(
      new Response(null, { status: 404, statusText: 'test error' })
    );
  });

describe('Editor test', () => {
  userEvent.setup();
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
  });

  it('should render editor correctly', () => {
    expect(screen.getByTestId('input-http')).toBeInTheDocument();
    expect(screen.getByText(/►/i)).toBeInTheDocument();
    expect(screen.getByTestId('response-request-area')).toBeInTheDocument();
    expect(screen.getByText(/variables/i)).toBeInTheDocument();
    expect(screen.getByText(/add new header/i)).toBeInTheDocument();
  });

  it('should add variables', async () => {
    mockedFetch.mockClear();
    await userEvent.type(screen.getByTestId('input-http'), testUrl);
    const requestResponseArea = screen.getByTestId('response-request-area');
    const varsArea = screen.getByTestId('variables-text');
    const newTestVariables = { name: 'value' };
    fireEvent.change(requestResponseArea, {
      target: { value: testQuery },
    });
    fireEvent.blur(requestResponseArea);

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
    await userEvent.clear(varsArea);
    fireEvent.blur(varsArea);
  });

  it('should add headers', async () => {
    mockedFetch.mockClear();
    const addNewHeaderBtn = screen.getByText(/add new header/i);
    await userEvent.click(addNewHeaderBtn);
    const testHeaderKey0 = 'testHeaderKey0';
    const testHeaderValue0 = 'testHeaderValue0';

    await userEvent.type(
      screen.getByTestId<HTMLInputElement>('input-key-0'),
      testHeaderKey0
    );
    await userEvent.type(
      screen.getByTestId<HTMLInputElement>('input-value-0'),
      testHeaderValue0
    );
    await userEvent.click(addNewHeaderBtn);
    await userEvent.click(screen.getByTestId('delete-btn-1'));
    await userEvent.click(screen.getByText(/►/i));

    expect(mockedFetch).toBeCalledWith(testUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        testHeaderKey0: testHeaderValue0,
      },
      body: JSON.stringify({
        query: testQuery,
        variables: {},
      }),
    });
  });
});
