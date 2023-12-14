import { IFullType, TypeClickHandler } from './SchemaTypes';
import { FieldArgs } from './FieldArgs';
import { ArgumentType } from './ArgumentType';

export const TypeSchemaPage = ({
  data,
  typeClickHandler,
}: {
  data?: IFullType;
  typeClickHandler: TypeClickHandler;
}) => {
  const fields = data?.fields || data?.inputFields || [];
  return (
    <>
      {data && (
        <div>
          {data.description && <p>{data.description}</p>}
          {fields.length > 0 && (
            <>
              <h3 className="schema-subtitle">Fields</h3>
              <ul>
                {fields.map((field) => {
                  return (
                    <li key={field.name}>
                      <span className="field-name">{field.name}</span>
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

          {data.enumValues && data.enumValues.length > 0 && (
            <>
              <h3 className="schema-subtitle">Enum values</h3>
              <ul>
                {data.enumValues.map((enumValue) => {
                  return (
                    <li key={enumValue.name}>
                      <span className="field-name">{enumValue.name}</span>
                      <p>{enumValue.description}</p>
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
