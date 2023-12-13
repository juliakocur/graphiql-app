import { useState } from 'react';
import { IFullType, IIntrospectionquery } from './SchemaTypes';
import { StartSchemaPage } from './StartSchemaPage';
import { TypeSchemaPage } from './TypeSchemaPage';
import { schemaSlice } from '../../../redux/SchemaSlice';
import { useAppDispatch } from '../../../redux/reduxHooks';
import { startSchemaPage } from '../../../utils/constants';
import { SchemaNavigation } from './SchemaNavigation';

export const SchemaContainer = ({ data }: { data: IIntrospectionquery }) => {
  const [currentPage, setCurrentPage] = useState(startSchemaPage);
  const [typeInfo, setTypeInfo] = useState<IFullType>();
  const { pushToHistory } = schemaSlice.actions;
  const dispatch = useAppDispatch();

  const typeClickHandler = (
    event: React.MouseEvent<HTMLAnchorElement>,
    addToHistory = true
  ) => {
    event.preventDefault();
    const selectedType = event.currentTarget.text;

    console.log(selectedType);
    const typeInfo = data.__schema.types.filter(
      (type) => type.name === selectedType
    );
    if (addToHistory) {
      dispatch(pushToHistory(currentPage));
    }
    setTypeInfo(typeInfo[0]);
    setCurrentPage(selectedType);
    console.log(typeInfo);
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
