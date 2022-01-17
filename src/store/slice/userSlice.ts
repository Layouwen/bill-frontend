import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id?: number;
  token?: string;
  name?: string;
  username?: string;
  avatar?: string;
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
    setUserInfo: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.avatar = action.payload.avatar;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
  },
});

export const { setToken, setUserInfo } = userSlice.actions;

export default userSlice.reducer;
