import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const enum FORM_TYPES {
  UNCONTROLLED,
  CONTROLLED,
}

type LastUpdatedForm = {
  formName: FORM_TYPES | null;
};

const initialState: LastUpdatedForm = {
  formName: null,
};

export const lastUpdatedFormSlice = createSlice({
  name: 'lastUpdatedFormState',
  initialState,
  reducers: {
    setLastUpdatedFrom: (state, action: PayloadAction<FORM_TYPES | null>) => {
      state.formName = action.payload;
    },
  },
});

export const selectLastUpdatedForm = (state: RootState) =>
  state.lastUpdatedFormState;

export const { setLastUpdatedFrom } = lastUpdatedFormSlice.actions;

export default lastUpdatedFormSlice.reducer;
