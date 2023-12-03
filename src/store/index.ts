import uncontrolledFormSlice, {
  selectUncontrolledForm,
} from './slices/uncontrolledFormSlice';
import controlledFormSlice, {
  selectControlledForm,
} from './slices/controlledFormSlice';
import lastUpdatedFormSlice, {
  selectLastUpdatedForm,
  setLastUpdatedFrom,
} from './slices/lastUpdatedFormSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import { store } from './store';

export {
  uncontrolledFormSlice,
  controlledFormSlice,
  useAppDispatch,
  useAppSelector,
  lastUpdatedFormSlice,
  setLastUpdatedFrom,
  selectLastUpdatedForm,
  selectUncontrolledForm,
  selectControlledForm,
  store,
};
