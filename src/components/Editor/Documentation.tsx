import { useState } from 'react';
import { graphSlice } from '../../redux/GraphQLSlice';
import { useAppSelector, useAppDispatch } from '../../redux/reduxHooks';
import { sendRequest } from '../../utils/graphqlRequests';
import folder from '/folder.png';
import { IIntrospectionquery } from './Schema/SchemaTypes';
import { SchemaContainer } from './Schema/SchemaContainer';
import { IntrospectionQuery } from './Schema/SchemaQuery';
import './Schema/documentation.css';
export const Documentation = () => {
  const { url } = useAppSelector((state) => state.graphReducer);
  const [startShemaData, setStartShemaData] =
    useState<IIntrospectionquery | null>(null);
  const { setError } = graphSlice.actions;
  const dispatch = useAppDispatch();

  const openDocs = async () => {
    const startQuery = IntrospectionQuery;
    const { data, error } = await sendRequest<IIntrospectionquery>(
      url,
      startQuery
    );
    console.log(data);
    if (data) {
      setStartShemaData(data);
    }
    if (error instanceof Error) {
      dispatch(setError(`Schema: ${error.message}`));
    }
  };

  return (
    <>
      {startShemaData && <SchemaContainer data={startShemaData} />}
      <button className="doc-button" onClick={openDocs}>
        <img src={folder} alt="documentation" />
      </button>
    </>
  );
};
