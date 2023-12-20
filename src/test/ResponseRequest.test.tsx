import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import LanguageContextProvider from '../localization/LangContextProvider';
import userEvent from '@testing-library/user-event';
import { ResponseRequest } from '../components/Editor/ResponseRequest';
import { Mode } from '../types/types';

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

describe('ResponseRequest test', () => {
  userEvent.setup();

  beforeEach(() => {
    render(
      <Provider store={store}>
        <LanguageContextProvider>
          <ResponseRequest mode={Mode.request} params={null} />
        </LanguageContextProvider>
      </Provider>
    );
  });

  it('should prettify', async () => {
    const prettifyBtn = screen.getByTestId<HTMLButtonElement>('prettify-btn');
    const query =
      'query AllChar($name:String){characters(page:2,filter:{name:$name}){info{count}}}';
    const formattedQuery = `query AllChar($name:String) {
  characters(page:2, filter: {name:$name}) {
    info {
      count
    }
  }
}`;
    const requestArea = screen.getByTestId<HTMLTextAreaElement>(
      'response-request-area'
    );
    expect(prettifyBtn).toBeInTheDocument();
    expect(requestArea).toBeInTheDocument();
    fireEvent.change(requestArea, { target: { value: query } });

    await userEvent.click(prettifyBtn);

    expect(requestArea.value).toBe(formattedQuery);
  });
});
