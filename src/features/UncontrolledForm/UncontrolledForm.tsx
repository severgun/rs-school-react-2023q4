import React, { useRef } from 'react';
import styles from './UncontrolledForm.module.css';
import { convertBase64 } from '@/utils/convertBase64';
import { GENDER } from '../shared';

export default function UncontrolledForm(): React.JSX.Element {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      const imgBase64 = await convertBase64(file);
      console.log('File: ', imgBase64);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        Name:
        <input type="text" />
      </label>
      <label className={styles.label}>
        Age:
        <input type="number" />
      </label>
      <label className={styles.label}>
        Email:
        <input type="email" />
      </label>
      <label className={styles.label}>
        Password:
        <input type="password" />
      </label>
      <label className={styles.label}>
        Confirm:
        <input type="password" />
      </label>
      <label className={styles.label}>
        Gender:
        <select>
          <option value={GENDER.Male}>{GENDER.Male}</option>
          <option value={GENDER.Female}>{GENDER.Female}</option>
        </select>
      </label>
      <label className={styles.label}>
        <input type="checkbox" defaultChecked={false} />
        Accept Terms & Conditions
      </label>
      <label className={styles.label}>
        Image:
        <input type="file" accept="image/png, image/jpeg" ref={fileInputRef} />
      </label>
      <label className={styles.label}>
        Country:
        <input type="text" />
      </label>
      <button
        type="submit"
        className={styles.submitButton}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </form>
  );
}
