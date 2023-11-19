import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ISearchValueState {
  searchValue: string;
}

const params = new URL(document.location.toString()).searchParams;
const initialState: ISearchValueState = {
  searchValue: params.get('search') ?? '',
};

export const searchValueSlice = createSlice({
  name: 'searchValue',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const selectSearchValue = (state: RootState) => state.searchValue;

export const { setSearchValue } = searchValueSlice.actions;

export default searchValueSlice.reducer;
