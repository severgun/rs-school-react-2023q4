import React, { useRef, useState } from 'react';
import styles from './UncontrolledForm.module.css';
import { convertBase64 } from '@/utils/convertBase64';
import { FormsData, GENDER, formSchema } from '../shared';
import * as uncontrolledFormSlice from '@/store/slices/uncontrolledFormSlice';
import { useAppDispatch } from '@/store';
import { ValidationError } from 'yup';
import {
  FORM_TYPES,
  setLastUpdatedForm,
} from '@/store/slices/lastUpdatedFormSlice';
import { useNavigate } from 'react-router-dom';

export default function UncontrolledForm(): React.JSX.Element {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordConfirmInputRef = useRef<HTMLInputElement>(null);
  const genderInputRef = useRef<HTMLSelectElement>(null);
  const termsAcceptedCheckboxRef = useRef<HTMLInputElement>(null);
  const countryInputRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const [nameError, setNameError] = useState<string>('');
  const [ageError, setAgeError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [passwordConfirmError, setPasswordConfirmError] = useState<string>('');
  const [genderError, setGenderError] = useState<string>('');
  const [termsAcceptedError, setTermsAcceptedError] = useState<string>('');
  const [imageError, setImageError] = useState<string>('');
  const [countryError, setCountryError] = useState<string>('');

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const clearErrorMessages = () => {
    setNameError('');
    setAgeError('');
    setEmailError('');
    setPasswordError('');
    setPasswordConfirmError('');
    setGenderError('');
    setTermsAcceptedError('');
    setImageError('');
    setCountryError('');
  };

  const validateForm = (formData: FormsData): void => {
    clearErrorMessages();

    formSchema
      .validate(formData, { abortEarly: false })
      .then(async () => {
        dispatch(setLastUpdatedForm(FORM_TYPES.UNCONTROLLED));

        const imageFile = formData.image as FileList;
        const imageData = {
          image: (await convertBase64(imageFile[0])) || '',
          size: imageFile[0].size,
          type: imageFile[0].type,
        };

        dispatch(
          uncontrolledFormSlice.setFormData({
            ...formData,
            image: imageData,
          })
        );

        navigate('/');
      })
      .catch((err: ValidationError) => {
        err.inner.forEach((error) => {
          switch (error.path) {
            case 'name':
              setNameError(error.message);
              break;
            case 'age':
              setAgeError(error.message);
              break;
            case 'email':
              setEmailError(error.message);
              break;
            case 'password':
              setPasswordError(error.message);
              break;
            case 'passwordConfirm':
              setPasswordConfirmError(error.message);
              break;
            case 'gender':
              setGenderError(error.message);
              break;
            case 'isTermsAccepted':
              setTermsAcceptedError(error.message);
              break;
            case 'country':
              setCountryError(error.message);
              break;
            case 'image':
            case 'image.image':
            case 'image.size':
            case 'image.type':
              setImageError(error.message);
              break;

            default:
              break;
          }
        });
      });
  };

  const handleSubmit = async (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const name = nameInputRef.current?.value;
    const age = ageInputRef.current?.value || '0';
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    const passwordConfirm = passwordConfirmInputRef.current?.value;
    const gender = genderInputRef.current?.value;
    const isTermsAccepted = termsAcceptedCheckboxRef.current?.checked;
    const country = countryInputRef.current?.value;

    const fileList = imgInputRef.current?.files;

    const formData: FormsData = {
      name: name || '',
      age: +age || 0,
      email: email || '',
      password: password || '',
      passwordConfirm: passwordConfirm,
      gender: gender || '',
      isTermsAccepted: isTermsAccepted || false,
      image: fileList,
      country: country || '',
    };

    validateForm(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputContainer}>
        <label className={styles.label}>
          Name:
          <input type="text" ref={nameInputRef} />
        </label>
        {nameError && <p className={styles.errorMessage}>{nameError}</p>}
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>
          Age:
          <input type="number" ref={ageInputRef} min={13} max={99} />
        </label>
        {ageError && <p className={styles.errorMessage}>{ageError}</p>}
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>
          Email:
          <input type="email" ref={emailInputRef} />
        </label>
        {emailError && <p className={styles.errorMessage}>{emailError}</p>}
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>
          Password:
          <input type="password" ref={passwordInputRef} />
        </label>
        {passwordError && (
          <p className={styles.errorMessage}>{passwordError}</p>
        )}
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>
          Confirm:
          <input type="password" ref={passwordConfirmInputRef} />
        </label>
        {passwordConfirmError && (
          <p className={styles.errorMessage}>{passwordConfirmError}</p>
        )}
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>
          Gender:
          <select ref={genderInputRef}>
            <option value={GENDER.Male}>{GENDER.Male}</option>
            <option value={GENDER.Female}>{GENDER.Female}</option>
          </select>
        </label>
        {genderError && <p className={styles.errorMessage}>{genderError}</p>}
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>
          <input
            type="checkbox"
            defaultChecked={false}
            ref={termsAcceptedCheckboxRef}
          />
          Accept Terms & Conditions
        </label>
        {termsAcceptedError && (
          <p className={styles.errorMessage}>{termsAcceptedError}</p>
        )}
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>
          Image:
          <input type="file" accept="image/png, image/jpeg" ref={imgInputRef} />
        </label>
        {imageError && <p className={styles.errorMessage}>{imageError}</p>}
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>
          Country:
          <input type="text" ref={countryInputRef} />
        </label>
        {countryError && <p className={styles.errorMessage}>{countryError}</p>}
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        onClick={handleSubmit}
        ref={submitButtonRef}
      >
        Submit
      </button>
    </form>
  );
}
