import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserInfo = {
  id: number | string;
  name: string;
  username: string;
  avatar: string;
};

interface UserState {
  token: string;
  userInfo: UserInfo;
}

const initialState: UserState = {
  token: localStorage.getItem('token') || '',
  userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      const { id, name, username, avatar } = action.payload;
      state.userInfo = { id, name, username, avatar };
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    updateUserInfo: (
      state,
      {
        payload: { name, avatar },
      }: PayloadAction<{ name: string; avatar: string }>,
    ) => {
      state.userInfo = { ...state.userInfo, name, avatar };
    },
    logOut: (state) => {
      state.userInfo = {
        username: '',
        name: '',
        id: '',
        avatar: '',
      };
      state.token = '';
      localStorage.clear();
    },
  },
});

export const { setToken, setUserInfo, updateUserInfo, logOut } =
  userSlice.actions;

export default userSlice.reducer;
