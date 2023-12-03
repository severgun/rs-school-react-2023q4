import { configureStore } from '@reduxjs/toolkit';
import {
  uncontrolledFormSlice,
  controlledFormSlice,
  lastUpdatedFormSlice,
} from '@/store';

export const store = configureStore({
  reducer: {
    uncontrolledFormState: uncontrolledFormSlice,
    controlledFormState: controlledFormSlice,
    lastUpdatedFormState: lastUpdatedFormSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
