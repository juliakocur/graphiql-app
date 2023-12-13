export interface IIntrospectionquery {
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
  fields: IField[];
  inputFields: IInputValue[];
  interfaces: IType;
  enumValues: {
    name: string;
    description: string;
    isDeprecated: boolean;
    deprecationReason: string;
  };
  possibleTypes: IType;
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
