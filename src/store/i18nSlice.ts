import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from '@/i18n';

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
      void i18n.changeLanguage(action.payload);
      state.lang = action.payload;
    },
  },
});

export const { changeLang } = i18nSlice.actions;

export default i18nSlice.reducer;
