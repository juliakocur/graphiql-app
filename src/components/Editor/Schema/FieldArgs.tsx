import { ArgumentType } from './ArgumentType';
import { IInputValue, TypeClickHandler } from './SchemaTypes';

export const FieldArgs = ({
  args,
  typeClickHandler,
}: {
  args: IInputValue[];
  typeClickHandler: TypeClickHandler;
}) => {
  return (
    <>
      {args.length > 0 && (
        <>
          <span>{'('}</span>
          {args.map(({ name, type }) => {
            return (
              <div key={name}>
                <span className="arg-name">{`${name} : `}</span>
                <ArgumentType type={type} typeClickHandler={typeClickHandler} />
                {args.length > 1 && <span>{', '}</span>}
              </div>
            );
          })}{' '}
          <span>{')'}</span>
        </>
      )}
    </>
  );
};
