import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ISchemaState {
  history: string[];
}

const initialState: ISchemaState = {
  history: [],
};

export const schemaSlice = createSlice({
  name: 'schema',
  initialState,
  reducers: {
    pushToHistory(state, action: PayloadAction<string>) {
      state.history.push(action.payload);
    },
    removeFromHistory(state) {
      state.history.pop();
    },
    clearHistory(state) {
      state.history = [];
    },
  },
});

export default schemaSlice.reducer;
