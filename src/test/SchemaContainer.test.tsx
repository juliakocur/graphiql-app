import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import LanguageContextProvider from '../localization/LangContextProvider';
import userEvent from '@testing-library/user-event';
import * as sendRequest from '../utils/graphqlRequests';
import { schemaMock, schemaMockData } from './schemaMock';
import { startSchemaPage } from '../utils/constants';
import { SchemaContainer } from '../components/Editor/Schema/SchemaContainer';

const mockedSendRequest = vi.spyOn(sendRequest, 'sendRequest');
mockedSendRequest.mockResolvedValue({ data: schemaMock, error: null });

describe('SchemaContainer test', () => {
  const user = userEvent.setup();
  const closeSchema = vi.fn();

  beforeEach(() => {
    render(
      <Provider store={store}>
        <LanguageContextProvider>
          <SchemaContainer data={schemaMock} closeSchema={closeSchema} />
        </LanguageContextProvider>
      </Provider>
    );
  });

  it('should go to the previous page when clicking on a link in the navigation', async () => {
    const prevPageName = startSchemaPage;
    const selectedTypeName = schemaMockData.allTypes[1].name;
    expect(screen.getByText(startSchemaPage)).toBeInTheDocument();

    const selectedType = screen.getByText(selectedTypeName);
    await user.click(selectedType);
    const nav = screen.getByText(new RegExp(prevPageName, 'i'), {
      selector: 'a.schema-nav-link',
    });
    expect(nav).toBeInTheDocument();
    await user.click(nav);
    const prevSchemaPageHeading = screen.getByText(
      new RegExp(prevPageName, 'i'),
      {
        selector: 'h2.schema-page-title',
      }
    );
    expect(prevSchemaPageHeading).toBeInTheDocument();
  });

  it('should open a new page by clicking on the type', async () => {
    const selectedTypeName = schemaMockData.queryType.name;
    expect(screen.getByText(startSchemaPage)).toBeInTheDocument();

    const selectedType = screen.getAllByText(selectedTypeName)[0];
    await user.click(selectedType);
    const newSchemaPageHeading = screen.getByText(
      new RegExp(selectedTypeName, 'i'),
      {
        selector: 'h2.schema-page-title',
      }
    );
    expect(newSchemaPageHeading).toBeInTheDocument();
  });

  it('search by type should work', async () => {
    const selectedTypeName = `${schemaMockData.allTypes[1].name}`;
    const searchBar = screen.getByRole('combobox');
    expect(searchBar).toBeInTheDocument();
    await user.type(searchBar, `${selectedTypeName}{arrowdown}{enter}`);
    const newSchemaPageHeading = screen.getByText(
      new RegExp(selectedTypeName, 'i'),
      {
        selector: 'h2.schema-page-title',
      }
    );
    expect(newSchemaPageHeading).toBeInTheDocument();
  });
});
