import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import LanguageContextProvider from '../localization/LangContextProvider';
import userEvent from '@testing-library/user-event';
import { Documentation } from '../components/Editor/Documentation';
import * as sendRequest from '../utils/graphqlRequests';
import { schemaMock } from './schemaMock';
import { startSchemaPage } from '../utils/constants';

const mockedSendRequest = vi.spyOn(sendRequest, 'sendRequest');
mockedSendRequest.mockResolvedValue({ data: schemaMock, error: null });

describe('Documentation test', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    render(
      <Provider store={store}>
        <LanguageContextProvider>
          <Documentation />
        </LanguageContextProvider>
      </Provider>
    );
  });

  it('should render openDocs button', () => {
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should display a loading indicator while fetching schema', async () => {
    mockedSendRequest.mockReturnValueOnce(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: schemaMock, error: null });
        }, 1000);
      })
    );
    const openDocsBtn = screen.getByRole('button');
    await user.click(openDocsBtn);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should not display schema in case of error', async () => {
    mockedSendRequest.mockResolvedValueOnce({
      data: null,
      error: new Error('failed fetch schema'),
    });
    const openDocsBtn = screen.getByRole('button');
    await user.click(openDocsBtn);
    expect(screen.queryByText(startSchemaPage)).toBeNull();
  });

  it('should display start schema page if ok', async () => {
    const openDocsBtn = screen.getByRole('button');
    await user.click(openDocsBtn);
    expect(screen.getByText(startSchemaPage)).toBeInTheDocument();
  });

  it('should close schema when close btn is clicked or open schema btn is clicked', async () => {
    const openDocsBtn = screen.getByRole('button');
    await user.click(openDocsBtn);
    expect(screen.getByText(startSchemaPage)).toBeInTheDocument();
    expect(screen.getByTestId('schema')).toHaveClass('open');
    expect(screen.getByText('✖')).toBeInTheDocument();
    await user.click(screen.getByText('✖'));
    expect(screen.getByTestId('schema')).not.toHaveClass('open');
  });
});
