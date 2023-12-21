import { useEffect, useState, useContext } from 'react';
import { graphSlice } from '../../redux/GraphQLSlice';
import { useAppSelector, useAppDispatch } from '../../redux/reduxHooks';
import { sendRequest } from '../../utils/graphqlRequests';
import { Button } from '@mui/material';
import { IIntrospectionQuery } from './Schema/SchemaTypes';
import { SchemaContainer } from './Schema/SchemaContainer';
import { IntrospectionQuery } from './Schema/SchemaQuery';
import './Schema/documentation.css';
import { schemaSlice } from '../../redux/SchemaSlice';
import { Loader } from '../Loader/Loader';
import { LanguageContext } from '../../localization/LangContextProvider';
import { Localization } from '../../localization/Localization';

export const Documentation = () => {
  const { language } = useContext(LanguageContext);
  const { url } = useAppSelector((state) => state.graphReducer);
  const [startSchemaData, setStartSchemaData] =
    useState<IIntrospectionQuery | null>(null);
  const [isSchemaLoading, setIsSchemaLoading] = useState(false);
  const { setError } = graphSlice.actions;
  const { clearHistory } = schemaSlice.actions;
  const dispatch = useAppDispatch();
  const [isDocsOpen, setIsDocsOpen] = useState(true);

  useEffect(() => {
    setStartSchemaData(null);
    setIsDocsOpen(false);
    dispatch(clearHistory());
  }, [url, clearHistory, dispatch]);

  const openDocs = async () => {
    let openSchema = !isDocsOpen;
    if (!startSchemaData) {
      setIsSchemaLoading(true);
      const startQuery = IntrospectionQuery;
      const { data, error } = await sendRequest<IIntrospectionQuery>(
        url,
        startQuery
      );
      if (data) {
        setStartSchemaData(data);
        openSchema = true;
      }

      if (error instanceof Error) {
        dispatch(setError(`Schema: ${error.message}`));
      }
      setIsSchemaLoading(false);
    }
    setIsDocsOpen(openSchema);
  };

  const closeSchema = () => {
    setIsDocsOpen(false);
  };

  return (
    <>
      {startSchemaData && (
        <div
          className={`schema ${isDocsOpen ? 'open' : ''}`}
          data-testid="schema"
        >
          <SchemaContainer data={startSchemaData} closeSchema={closeSchema} />
        </div>
      )}
      {isSchemaLoading && (
        <div className="schema-loader">
          <Loader />
        </div>
      )}
      {!isSchemaLoading && (
        <Button
          variant="contained"
          size="medium"
          className="doc-button"
          onClick={openDocs}
        >
          {Localization[language].schema}
        </Button>
      )}
    </>
  );
};
