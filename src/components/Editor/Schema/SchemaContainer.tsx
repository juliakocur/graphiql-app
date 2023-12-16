import { useState } from 'react';
import {
  IFullType,
  IIntrospectionQuery,
  TypeClickHandler,
} from './SchemaTypes';
import { StartSchemaPage } from './StartSchemaPage';
import { TypeSchemaPage } from './TypeSchemaPage';
import { schemaSlice } from '../../../redux/SchemaSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/reduxHooks';
import { startSchemaPage } from '../../../utils/constants';
import { SchemaNavigation } from './SchemaNavigation';
import { SchemaSearchBar } from './SchemaSearchBar';
import { Button } from '@mui/material';

export const SchemaContainer = ({
  data,
  closeSchema,
}: {
  data: IIntrospectionQuery;
  closeSchema: () => void;
}) => {
  const findType = (selectedType: string) =>
    data.__schema.types.filter((type) => type.name === selectedType)[0];

  const { history } = useAppSelector((state) => state.schemaReducer);
  const lastHistoryElement = history.at(-1);
  const [currentPage, setCurrentPage] = useState(
    lastHistoryElement || startSchemaPage
  );
  const [typeInfo, setTypeInfo] = useState<IFullType>(findType(currentPage));

  const { pushToHistory } = schemaSlice.actions;
  const dispatch = useAppDispatch();
  const getTypeInfo = (selectedType: string, addToHistory = true) => {
    const typeInfo = findType(selectedType);
    if (addToHistory && lastHistoryElement !== selectedType) {
      dispatch(pushToHistory(selectedType));
    }
    setTypeInfo(typeInfo);
    setCurrentPage(selectedType);
  };

  const typeClickHandler: TypeClickHandler = (
    event: React.MouseEvent<HTMLAnchorElement>,
    addToHistory = true
  ) => {
    event.preventDefault();
    const selectedType = event.currentTarget.text;
    getTypeInfo(selectedType, addToHistory);
  };

  return (
    <div className="schema-container">
      <div className="schema-head">
        <SchemaNavigation typeClickHandler={typeClickHandler} />
        <Button
          variant="contained"
          size="small"
          className="close-btn"
          onClick={closeSchema}
        >
          ✖
        </Button>
      </div>
      <SchemaSearchBar data={data} getTypeInfo={getTypeInfo} />
      <h2 className="schema-page-title">{currentPage}</h2>
      {currentPage === startSchemaPage ? (
        <StartSchemaPage data={data} typeClickHandler={typeClickHandler} />
      ) : (
        <TypeSchemaPage data={typeInfo} typeClickHandler={typeClickHandler} />
      )}
    </div>
  );
};
