import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IAuthState {
  isTokenValid: boolean;
}

const initialState: IAuthState = {
  isTokenValid: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsTokenValid(state, action: PayloadAction<boolean>) {
      state.isTokenValid = action.payload;
    },
  },
});

export default authSlice.reducer;
