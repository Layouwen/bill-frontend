import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token?: string;
}

const initialState: UserState = {
  token: localStorage.getItem('token') || '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
  },
});

export const { setToken } = userSlice.actions;

export default userSlice.reducer;
