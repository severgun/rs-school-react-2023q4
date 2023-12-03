import {
  selectControlledForm,
  selectLastUpdatedForm,
  selectUncontrolledForm,
  useAppDispatch,
  useAppSelector,
  setLastUpdatedFrom,
} from '@/store';
import styles from './HomePage.module.css';
import React, { useEffect, useState } from 'react';
import { FormsData } from '@/features/shared';
import { FORM_TYPES } from '@/store/slices/lastUpdatedFormSlice';

export default function HomePage(): React.JSX.Element {
  const [uncontrolledHighlighted, setUncontrolledHighlighted] =
    useState<boolean>(false);
  const [controlledHighlighted, setControlledHighlighted] =
    useState<boolean>(false);
  const { formName } = useAppSelector(selectLastUpdatedForm);
  const uncontrolledFormState = useAppSelector(selectUncontrolledForm);
  const controlledFormState = useAppSelector(selectControlledForm);

  const dispatch = useAppDispatch();

  const HIGHLIGHT_TIMEOUT = 2000;

  useEffect(() => {
    if (formName === FORM_TYPES.UNCONTROLLED) {
      setUncontrolledHighlighted(true);
      setTimeout(() => {
        setUncontrolledHighlighted(false);
        dispatch(setLastUpdatedFrom(null));
      }, HIGHLIGHT_TIMEOUT);
    }

    if (formName === FORM_TYPES.CONTROLLED) {
      setControlledHighlighted(true);
      setTimeout(() => {
        setControlledHighlighted(false);
        dispatch(setLastUpdatedFrom(null));
      }, HIGHLIGHT_TIMEOUT);
    }
  }, [dispatch, formName]);

  const printFormResults = (formState: FormsData): React.JSX.Element => {
    return (
      <>
        <ul>
          <li>Name: {formState.name}</li>
          <li>Age: {formState.age}</li>
          <li>Email: {formState.email}</li>
          <li>Password: {formState.password}</li>
          <li>Gender: {formState.gender}</li>
          <li>Terms was accepted: {formState.isTermsAccepted.toString()}</li>
          <li>Country: {formState.country}</li>
          <li>
            Image:{' '}
            <img
              className={styles.uploadedImg}
              src={`${formState.image.image}`}
              alt="Uploaded image"
            />
          </li>
        </ul>
      </>
    );
  };

  return (
    <>
      <h2>Home Page</h2>
      <div className={styles.container}>
        <div
          className={
            uncontrolledHighlighted
              ? `${styles.formResultsContainer}, ${styles.highlightedContainer}`
              : styles.formResultsContainer
          }
        >
          <h3>Uncontrolled Form Content:</h3>
          {uncontrolledFormState.name &&
            printFormResults(uncontrolledFormState)}
        </div>
        <div
          className={
            styles.formResultsContainer +
            ',' +
            (controlledHighlighted && styles.highlightedContainer)
          }
        >
          <h3>Controlled Form Content:</h3>
          {controlledFormState.name && printFormResults(controlledFormState)}
        </div>
      </div>
    </>
  );
}
