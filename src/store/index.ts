import { configureStore } from '@reduxjs/toolkit';
import { i18nSlice } from '@/store/i18nSlice';

export default configureStore({
  reducer: { i18n: i18nSlice.reducer },
});
