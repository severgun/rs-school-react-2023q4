import { configureStore } from '@reduxjs/toolkit';
import itemsPerPageReducer from './slices/itemsPerPageSlice';
import searchValueReducer from './slices/searchValueSlice';
import { animalsApiSlice } from '@/services/animalsApi';

export const store = configureStore({
  reducer: {
    searchValue: searchValueReducer,
    itemsPerPage: itemsPerPageReducer,
    [animalsApiSlice.reducerPath]: animalsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(animalsApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
