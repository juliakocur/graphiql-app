import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IGraphState {
  url: string;
  query: string;
  headers: Record<string, string>;
  variables: string;
  response: string;
}

const initialState: IGraphState = {
  url: '',
  query: '',
  headers: {},
  variables: '',
  response: '',
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
    setResponse(state, action: PayloadAction<string>) {
      state.response = action.payload;
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
