import { Autocomplete, TextField } from '@mui/material';
import { IIntrospectionQuery } from './SchemaTypes';
import { useState } from 'react';

export const SchemaSearchBar = ({
  data,
  getTypeInfo,
}: {
  data: IIntrospectionQuery;
  getTypeInfo: (selectedType: string, addToHistory?: boolean) => void;
}) => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <div className="schema-search-bar">
      <Autocomplete
        disablePortal
        value={value}
        options={data.__schema.types.map((type) => type.name)}
        onChange={(_, newValue: string | null) => {
          newValue && getTypeInfo(newValue);
          setValue(null);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </div>
  );
};
