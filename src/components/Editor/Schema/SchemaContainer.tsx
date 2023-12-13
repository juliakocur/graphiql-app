import { useState } from 'react';
import { IFullType, IIntrospectionquery } from './SchemaTypes';
import { StartSchemaPage } from './StartSchemaPage';
import { TypeSchemaPage } from './TypeSchemaPage';

export const SchemaContainer = ({ data }: { data: IIntrospectionquery }) => {
  const startPage = 'Docs';
  const [currentPage, setCurrentPage] = useState(startPage);
  const [typeInfo, setTypeInfo] = useState<IFullType>();
  const typeClickHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const selectedType = event.currentTarget.text;

    console.log(selectedType);
    const typeInfo = data.__schema.types.filter(
      (type) => type.name === selectedType
    );
    setTypeInfo(typeInfo[0]);
    setCurrentPage(selectedType);
    console.log(typeInfo);
  };
  return (
    <div className="schema-container">
      <h2>{currentPage}</h2>
      {currentPage === startPage ? (
        <StartSchemaPage data={data} typeClickHandler={typeClickHandler} />
      ) : (
        <TypeSchemaPage data={typeInfo} typeClickHandler={typeClickHandler} />
      )}
    </div>
  );
};
