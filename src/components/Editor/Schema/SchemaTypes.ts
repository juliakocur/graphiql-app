export interface IIntrospectionQuery {
  __schema: {
    queryType: ITypeName;
    mutationType: ITypeName | null;
    subscriptionType: ITypeName | null;
    types: IFullType[];
  };
}

interface ITypeName {
  name: string;
}

export interface IFullType {
  kind: TypeKind;
  name: string;
  description: string;
  fields: IField[] | null;
  inputFields: IInputValue[] | null;
  interfaces: IType;
  enumValues: IEnumValues[] | null;
  possibleTypes: IType;
}
export interface IEnumValues {
  name: string;
  description: string;
  isDeprecated: boolean;
  deprecationReason: string;
}

export enum TypeKind {
  SCALAR = 'SCALAR',
  OBJECT = 'OBJECT',
  INTERFACE = 'INTERFACE',
  UNION = 'UNION',
  ENUM = 'ENUM',
  INPUT_OBJECT = 'INPUT_OBJECT',
  LIST = 'LIST',
  NON_NULL = 'NON_NULL',
}

interface IField {
  name: string;
  description: string;
  args: IInputValue[];
  type: IType;
  isDeprecated: boolean;
  deprecationReason: string;
}

export interface IInputValue {
  name: string;
  description: string;
  type: IType;
  defaultValue: string;
  args: null;
}

export interface IType {
  kind: TypeKind;
  name: string | null;
  ofType: IType | null;
}

export type TypeClickHandler = (
  event: React.MouseEvent<HTMLAnchorElement>,
  addToHistory?: boolean
) => void;
