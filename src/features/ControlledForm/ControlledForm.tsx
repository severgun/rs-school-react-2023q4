import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './ControlledForm.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormsData, GENDER, formSchema } from '@/features/shared';
import * as controlledFormSlice from '@/store/slices/controlledFormSlice';
import { setLastUpdatedFrom, useAppDispatch } from '@/store';
import { useNavigate } from 'react-router-dom';
import { FORM_TYPES } from '@/store/slices/lastUpdatedFormSlice';

export default function ControlledForm(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormsData> = (data) => {
    dispatch(setLastUpdatedFrom(FORM_TYPES.CONTROLLED));
    dispatch(controlledFormSlice.setFormData(data));
    navigate('/');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.label}>
        Name:
        <input type="text" {...register('name', { required: true })} />
      </label>
      <label className={styles.label}>
        Age:
        <input
          type="number"
          {...register('age', { required: true, min: 18, max: 99 })}
        />
      </label>
      <label className={styles.label}>
        Email:
        <input type="email" {...register('email', { required: true })} />
      </label>
      <label className={styles.label}>
        Password:
        <input type="password" {...register('password', { required: true })} />
      </label>
      <label className={styles.label}>
        Confirm:
        <input type="password" />
      </label>
      <label className={styles.label}>
        Gender:
        <select {...register('gender', { required: true })}>
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
        <input type="file" accept="image/png, image/jpeg" />
      </label>
      <label className={styles.label}>
        Country:
        <input type="text" />
      </label>
      <button
        type="submit"
        className={styles.submitButton}
        onClick={handleSubmit(onSubmit)}
      >
        Submit
      </button>
    </form>
  );
}
