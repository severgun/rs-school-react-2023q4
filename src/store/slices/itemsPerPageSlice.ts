import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface IItemsPerPageState {
  itemsPerPage: number;
}

const initialState: IItemsPerPageState = {
  itemsPerPage: 10,
};

export const itemsPerPageSlice = createSlice({
  name: 'itemsPerPage',
  initialState,
  reducers: {
    setItemsPerPageValue: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
  },
});

export const selectItemsPerPage = (state: RootState) => state.itemsPerPage;

export const { setItemsPerPageValue } = itemsPerPageSlice.actions;

export default itemsPerPageSlice.reducer;
