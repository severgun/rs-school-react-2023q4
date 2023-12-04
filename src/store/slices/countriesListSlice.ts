import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type CountriesList = {
  countriesList: string[];
};

const initialState: CountriesList = {
  countriesList: ['Russia', 'Belarus', 'Ukraine', 'Kazakhstan', 'Poland'],
};

export const countriesListSlice = createSlice({
  name: 'countriesListState',
  initialState,
  reducers: {
    setCountriesListState: (state, action: PayloadAction<string[]>) => {
      state.countriesList = action.payload;
    },
  },
});

export const selectCountriesList = (state: RootState) =>
  state.countriesListState;

export const { setCountriesListState } = countriesListSlice.actions;

export default countriesListSlice.reducer;
