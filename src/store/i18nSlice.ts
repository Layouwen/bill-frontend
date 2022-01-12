import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Lang = 'en' | 'zh';

interface I18nState {
  lang: Lang;
}

const initialState: I18nState = {
  lang: 'en',
};

export const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  reducers: {
    changeLang: (state, action: PayloadAction<Lang>) => {
      state.lang = action.payload;
    },
  },
});

export const { changeLang } = i18nSlice.actions;

export default i18nSlice.reducer;
