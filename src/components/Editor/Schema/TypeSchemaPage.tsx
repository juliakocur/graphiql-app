import { IFullType } from './SchemaTypes';
import { FieldArgs } from './FieldArgs';
import { ArgumentType } from './ArgumentType';

export const TypeSchemaPage = ({
  data,
  typeClickHandler,
}: {
  data: IFullType | undefined;
  typeClickHandler: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) => {
  const fields = data?.fields || data?.inputFields || [];
  return (
    <>
      {data && (
        <div>
          {data.description && <p>{data.description}</p>}
          {fields.length > 0 && (
            <>
              <h3>Fields</h3>
              <ul>
                {fields.map((field) => {
                  return (
                    <li key={field.name}>
                      <span>{field.name}</span>
                      <FieldArgs
                        args={field?.args || []}
                        typeClickHandler={typeClickHandler}
                      />
                      {' : '}
                      <ArgumentType
                        type={field.type}
                        typeClickHandler={typeClickHandler}
                      ></ArgumentType>

                      <p>{field.description}</p>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      )}
    </>
  );
};
