import { configureStore } from '@reduxjs/toolkit';
import demosReducer from './slices/demosSlice';

export const store = configureStore({
  reducer: {
    demos: demosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
