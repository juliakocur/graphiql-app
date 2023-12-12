import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IGraphState {
  url: string;
  query: string;
  headers: Record<string, string>;
  variables: string;
  error: string | null;
}

const initialState: IGraphState = {
  url: '',
  query: '',
  headers: {},
  variables: '',
  error: null,
};

export const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    setUrl(state, action: PayloadAction<string>) {
      state.url = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setVariables(state, action: PayloadAction<string>) {
      state.variables = action.payload;
    },
    setHeaders(state, action: PayloadAction<Record<string, string>>) {
      state.headers = action.payload;
    },
  },
});

export default graphSlice.reducer;
