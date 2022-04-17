import { followApi } from '@/service/follow';
import { topicApi } from '@/service/topic';
import { userSlice, i18nSlice } from '@/store/slice';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: {
    i18n: i18nSlice.reducer,
    user: userSlice.reducer,
    [followApi.reducerPath]: followApi.reducer,
    [topicApi.reducerPath]: topicApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(followApi.middleware, topicApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);

export default store;
