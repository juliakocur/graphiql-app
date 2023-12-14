import { IIntrospectionQuery, TypeClickHandler } from './SchemaTypes';

export const StartSchemaPage = ({
  data,
  typeClickHandler,
}: {
  data: IIntrospectionQuery;
  typeClickHandler: TypeClickHandler;
}) => {
  return (
    <div className="shema-page">
      <p>A GraphQL schema provides a root type for each kind of operation.</p>
      <section>
        <h3 className="schema-subtitle">Root Types</h3>
        <p>
          query:{' '}
          <a href={data.__schema.queryType.name} onClick={typeClickHandler}>
            {data.__schema.queryType.name}
          </a>
        </p>
      </section>
      <section>
        <h3 className="schema-subtitle">All Schema Types</h3>
        <ul>
          {data.__schema.types.map(({ name }) => {
            if (!name.startsWith('__')) {
              return (
                <li key={name}>
                  <a href={name} onClick={typeClickHandler}>
                    {name}
                  </a>
                </li>
              );
            }
          })}
        </ul>
      </section>
    </div>
  );
};
