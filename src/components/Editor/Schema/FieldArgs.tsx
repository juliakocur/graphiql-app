import { ArgumentType } from './ArgumentType';
import { IInputValue } from './SchemaTypes';

export const FieldArgs = ({
  args,
  typeClickHandler,
}: {
  args: IInputValue[];
  typeClickHandler: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) => {
  return (
    <>
      {args.length > 0 && (
        <>
          <span>{'('}</span>
          {args.map(({ name, type }) => {
            return (
              <div key={name}>
                <span>{`${name} : `}</span>
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
