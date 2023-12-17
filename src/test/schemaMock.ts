import {
  IIntrospectionQuery,
  TypeKind,
} from '../components/Editor/Schema/SchemaTypes';

export const schemaMockData = {
  queryType: {
    name: 'Query',
    description: 'queryTypeDescr',
    fields: {
      field1: {
        name: 'location',
        description: 'Get a specific locations by ID',
        returnType: 'String',
        args: [{ name: 'id', type: 'ID' }],
      },
      field2: {
        name: 'charactersByIds',
        description: 'Get a list of characters selected by ids',
        returnType: 'CacheControlScope',
        args: [{ name: 'ids', type: 'ID' }],
      },
    },
  },
  allTypes: [
    {
      name: 'String',
      description:
        'The String scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.',
      enumValues: [],
    },

    {
      name: 'CacheControlScope',
      description: 'description',
      enumValues: [{ name: 'PUBLIC' }, { name: 'PRIVATE' }],
    },
    {
      name: 'ID',
      description:
        'The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.',
      enumValues: [],
    },
  ],
};

export const schemaMock: IIntrospectionQuery = {
  __schema: {
    queryType: {
      name: schemaMockData.queryType.name,
    },
    mutationType: null,
    subscriptionType: null,
    types: [
      {
        kind: TypeKind.OBJECT,
        name: schemaMockData.queryType.name,
        description: schemaMockData.queryType.description,
        fields: [
          {
            name: schemaMockData.queryType.fields.field1.name,
            description: schemaMockData.queryType.fields.field1.description,
            args: [
              {
                name: schemaMockData.queryType.fields.field1.args[0].name,
                description: '',

                type: {
                  kind: TypeKind.NON_NULL,
                  name: null,
                  ofType: {
                    kind: TypeKind.SCALAR,
                    name: schemaMockData.queryType.fields.field1.args[0].type,
                    ofType: null,
                  },
                },
                args: null,
                defaultValue: null,
              },
            ],
            type: {
              kind: TypeKind.OBJECT,
              name: schemaMockData.queryType.fields.field1.returnType,
              ofType: null,
            },
            isDeprecated: false,
            deprecationReason: null,
          },

          {
            name: schemaMockData.queryType.fields.field2.name,
            description: schemaMockData.queryType.fields.field2.description,
            args: [
              {
                name: schemaMockData.queryType.fields.field2.args[0].name,
                description: '',
                args: null,
                type: {
                  kind: TypeKind.NON_NULL,
                  name: null,
                  ofType: {
                    kind: TypeKind.LIST,
                    name: null,
                    ofType: {
                      kind: TypeKind.NON_NULL,
                      name: null,
                      ofType: {
                        kind: TypeKind.SCALAR,
                        name: schemaMockData.queryType.fields.field2.args[0]
                          .type,
                        ofType: null,
                      },
                    },
                  },
                },
                defaultValue: null,
              },
            ],
            type: {
              kind: TypeKind.LIST,
              name: null,
              ofType: {
                kind: TypeKind.OBJECT,
                name: schemaMockData.queryType.fields.field2.returnType,
                ofType: null,
              },
            },
            isDeprecated: false,
            deprecationReason: null,
          },
        ],
        inputFields: null,
        enumValues: null,
        interfaces: null,
        possibleTypes: null,
      },
      {
        kind: TypeKind.SCALAR,
        name: schemaMockData.allTypes[0].name,
        description: schemaMockData.allTypes[0].description,
        fields: null,
        inputFields: null,
        enumValues: null,
        interfaces: null,
        possibleTypes: null,
      },

      {
        kind: TypeKind.ENUM,
        name: schemaMockData.allTypes[1].name,
        description: schemaMockData.allTypes[1].description,
        fields: null,
        inputFields: null,
        enumValues: [
          {
            name: schemaMockData.allTypes[1].enumValues[0].name,
            description: '',
            isDeprecated: false,
            deprecationReason: null,
          },
          {
            name: schemaMockData.allTypes[1].enumValues[1].name,
            description: '',
            isDeprecated: false,
            deprecationReason: null,
          },
        ],
        interfaces: null,
        possibleTypes: null,
      },
      {
        kind: TypeKind.SCALAR,
        name: schemaMockData.allTypes[2].name,
        description: schemaMockData.allTypes[2].description,
        fields: null,
        inputFields: null,
        enumValues: null,
        interfaces: null,
        possibleTypes: null,
      },
    ],
  },
};
