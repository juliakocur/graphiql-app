import { IType, TypeClickHandler, TypeKind } from './SchemaTypes';

export const ArgumentType = ({
  type,
  typeClickHandler,
}: {
  type: IType | null;
  typeClickHandler: TypeClickHandler;
}) => {
  if (!type) {
    return <></>;
  }

  function createArgType(
    type: IType | null,
    name = '',
    beforeSpan = '',
    afterSpan = ''
  ) {
    if (!type) {
      return { name, beforeSpan, afterSpan };
    }

    switch (type.kind) {
      case TypeKind.LIST:
        beforeSpan += '[';
        afterSpan += ']';
        break;
      case TypeKind.NON_NULL:
        afterSpan += '!';
        break;
      default:
        name += type.name ?? '';
        break;
    }

    return createArgType(type.ofType, name, beforeSpan, afterSpan);
  }

  const { name, beforeSpan, afterSpan } = createArgType(type);

  return (
    <>
      <p className="argument">
        <span>{beforeSpan}</span>
        <a href={name} onClick={typeClickHandler} className="arg-type">
          {name}
        </a>
        <span>{afterSpan}</span>
      </p>
    </>
  );
};
