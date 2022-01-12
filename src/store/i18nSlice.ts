import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  lang: 'en' | 'zh';
}

const initialState: InitialState = {
  lang: 'en',
};

export const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  reducers: {
    changeLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { changeLang } = i18nSlice.actions;

export default i18nSlice.reducer;
