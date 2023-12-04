import uncontrolledFormSlice, {
  selectUncontrolledForm,
} from './slices/uncontrolledFormSlice';
import controlledFormSlice, {
  selectControlledForm,
} from './slices/controlledFormSlice';
import lastUpdatedFormSlice, {
  selectLastUpdatedForm,
  setLastUpdatedForm,
} from './slices/lastUpdatedFormSlice';
import countriesListSlice, {
  selectCountriesList,
} from './slices/countriesListSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import { store } from './store';

export {
  uncontrolledFormSlice,
  controlledFormSlice,
  useAppDispatch,
  useAppSelector,
  lastUpdatedFormSlice,
  setLastUpdatedForm,
  selectLastUpdatedForm,
  selectUncontrolledForm,
  selectControlledForm,
  selectCountriesList,
  countriesListSlice,
  store,
};
