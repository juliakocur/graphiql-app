import { useState } from 'react';
import {
  IFullType,
  IIntrospectionquery,
  TypeClickHandler,
} from './SchemaTypes';
import { StartSchemaPage } from './StartSchemaPage';
import { TypeSchemaPage } from './TypeSchemaPage';
import { schemaSlice } from '../../../redux/SchemaSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/reduxHooks';
import { startSchemaPage } from '../../../utils/constants';
import { SchemaNavigation } from './SchemaNavigation';

export const SchemaContainer = ({ data }: { data: IIntrospectionquery }) => {
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

  const typeClickHandler: TypeClickHandler = (
    event: React.MouseEvent<HTMLAnchorElement>,
    addToHistory = true
  ) => {
    event.preventDefault();
    const selectedType = event.currentTarget.text;
    const typeInfo = findType(selectedType);
    if (addToHistory) {
      dispatch(pushToHistory(selectedType));
    }
    setTypeInfo(typeInfo);
    setCurrentPage(selectedType);
  };

  return (
    <div className="schema-container">
      <SchemaNavigation typeClickHandler={typeClickHandler} />
      <h2>{currentPage}</h2>
      {currentPage === startSchemaPage ? (
        <StartSchemaPage data={data} typeClickHandler={typeClickHandler} />
      ) : (
        <TypeSchemaPage data={typeInfo} typeClickHandler={typeClickHandler} />
      )}
    </div>
  );
};
