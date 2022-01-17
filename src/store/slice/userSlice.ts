import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: number | string;
  token: string;
  name: string;
  username: string;
  avatar: string;
}

const initialState: UserState = {
  token: localStorage.getItem('token') || '',
  id: '',
  name: '',
  username: '',
  avatar: '',
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
    logOut: (state) => {
      state.id = '';
      state.username = '';
      state.token = '';
      state.name = '';
      state.avatar = '';
      localStorage.clear();
    },
  },
});

export const { setToken, setUserInfo, logOut } = userSlice.actions;

export default userSlice.reducer;
