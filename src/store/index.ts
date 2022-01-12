import { configureStore } from '@reduxjs/toolkit';
import { i18nSlice } from '@/store/i18nSlice';

const store = configureStore({
  reducer: { i18n: i18nSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
