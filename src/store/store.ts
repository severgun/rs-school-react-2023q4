import { configureStore } from '@reduxjs/toolkit';
import {
  uncontrolledFormSlice,
  controlledFormSlice,
  lastUpdatedFormSlice,
} from '@/store';
import countriesListSlice from './slices/countriesListSlice';

export const store = configureStore({
  reducer: {
    uncontrolledFormState: uncontrolledFormSlice,
    controlledFormState: controlledFormSlice,
    lastUpdatedFormState: lastUpdatedFormSlice,
    countriesListState: countriesListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
