import { userSlice, i18nSlice } from '@/store/slice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: { i18n: i18nSlice.reducer, user: userSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
