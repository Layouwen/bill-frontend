import { followApi } from '@/service/follow';
import { recordApi } from '@/service/record';
import { systemNotifyApi } from '@/service/systemNotify';
import { topicApi } from '@/service/topic';
import { userSlice, i18nSlice, systemSlice } from '@/store/slice';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: {
    i18n: i18nSlice.reducer,
    user: userSlice.reducer,
    system: systemSlice.reducer,
    [followApi.reducerPath]: followApi.reducer,
    [topicApi.reducerPath]: topicApi.reducer,
    [systemNotifyApi.reducerPath]: systemNotifyApi.reducer,
    [recordApi.reducerPath]: recordApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      followApi.middleware,
      topicApi.middleware,
      systemNotifyApi.middleware,
      recordApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);

export default store;
