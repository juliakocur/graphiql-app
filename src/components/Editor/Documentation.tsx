import { useEffect, useState } from 'react';
import { graphSlice } from '../../redux/GraphQLSlice';
import { useAppSelector, useAppDispatch } from '../../redux/reduxHooks';
import { sendRequest } from '../../utils/graphqlRequests';
import folder from '/folder.png';
import { IIntrospectionquery } from './Schema/SchemaTypes';
import { SchemaContainer } from './Schema/SchemaContainer';
import { IntrospectionQuery } from './Schema/SchemaQuery';
import './Schema/documentation.css';
import { schemaSlice } from '../../redux/SchemaSlice';

export const Documentation = () => {
  const { url } = useAppSelector((state) => state.graphReducer);
  const [startSchemaData, setStartSchemaData] =
    useState<IIntrospectionquery | null>(null);
  const { setError } = graphSlice.actions;
  const { clearHistory } = schemaSlice.actions;
  const dispatch = useAppDispatch();
  const [isDocsOpen, setIsDocsOpen] = useState(true);

  useEffect(() => {
    setStartSchemaData(null);
    setIsDocsOpen(false);
    dispatch(clearHistory());
  }, [url]);

  const openDocs = async () => {
    let openSchema = !isDocsOpen;
    if (!startSchemaData) {
      const startQuery = IntrospectionQuery;
      const { data, error } = await sendRequest<IIntrospectionquery>(
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
    }
    setIsDocsOpen(openSchema);
  };

  return (
    <>
      {startSchemaData && isDocsOpen && (
        <SchemaContainer data={startSchemaData} />
      )}
      <button className="doc-button" onClick={openDocs}>
        <img src={folder} alt="documentation" />
      </button>
    </>
  );
};
