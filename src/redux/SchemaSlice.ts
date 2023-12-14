import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { startSchemaPage } from '../utils/constants';

interface ISchemaState {
  history: string[];
}

const initialState: ISchemaState = {
  history: [startSchemaPage],
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
      state.history = [startSchemaPage];
    },
  },
});

export default schemaSlice.reducer;
