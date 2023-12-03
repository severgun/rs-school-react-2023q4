import { FormsData, ImageData } from '@/features/shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState: FormsData = {
  name: '',
  age: 0,
  email: '',
  password: '',
  gender: '',
  isTermsAccepted: false,
  image: {
    image: '',
    size: 0,
    type: '',
  },
  country: '',
};

export const controlledFormSlice = createSlice({
  name: 'controlledFormState',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setAge: (state, action: PayloadAction<number>) => {
      state.age = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },
    setTermsAccepted: (state, action: PayloadAction<boolean>) => {
      state.isTermsAccepted = action.payload;
    },
    setImage: (state, action: PayloadAction<ImageData>) => {
      state.image = action.payload;
    },
    setCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
    },
    setFormData: (state, action: PayloadAction<FormsData>) => {
      return action.payload;
    },
  },
});

export const selectControlledForm = (state: RootState) =>
  state.controlledFormState;

export const {
  setName,
  setAge,
  setEmail,
  setPassword,
  setGender,
  setTermsAccepted,
  setImage,
  setCountry,
  setFormData,
} = controlledFormSlice.actions;

export default controlledFormSlice.reducer;
