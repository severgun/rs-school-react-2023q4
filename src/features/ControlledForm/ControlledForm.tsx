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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormsData> = (data) => {
    dispatch(setLastUpdatedFrom(FORM_TYPES.CONTROLLED));
    dispatch(controlledFormSlice.setFormData(data));
    navigate('/');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputContainer}>
        <label className={styles.label}>
          Name:
          <input type="text" {...register('name', { required: true })} />
        </label>
        {errors.name && (
          <p className={styles.errorMessage}>{errors.name.message}</p>
        )}
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>
          Age:
          <input
            type="number"
            min={13}
            max={99}
            {...register('age', {
              required: true,
              min: 13,
              max: 99,
              valueAsNumber: true,
            })}
          />
        </label>
        {errors.age && (
          <p className={styles.errorMessage}>{errors.age.message}</p>
        )}
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>
          Email:
          <input type="email" {...register('email', { required: true })} />
        </label>
        {errors.email && (
          <p className={styles.errorMessage}>{errors.email.message}</p>
        )}
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>
          Password:
          <input
            type="password"
            {...register('password', { required: true })}
          />
        </label>
        {errors.password && (
          <p className={styles.errorMessage}>{errors.password.message}</p>
        )}
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>
          Confirm:
          <input
            type="password"
            {...register('passwordConfirm', { required: true })}
          />
        </label>
        {errors.passwordConfirm && (
          <p className={styles.errorMessage}>
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>
          Gender:
          <select {...register('gender', { required: true })}>
            <option value={GENDER.Male}>{GENDER.Male}</option>
            <option value={GENDER.Female}>{GENDER.Female}</option>
          </select>
        </label>
        {errors.gender && (
          <p className={styles.errorMessage}>{errors.gender.message}</p>
        )}
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>
          <input
            type="checkbox"
            defaultChecked={false}
            {...register('isTermsAccepted', { required: true })}
          />
          Accept Terms & Conditions
        </label>
        {errors.isTermsAccepted && (
          <p className={styles.errorMessage}>
            {errors.isTermsAccepted.message}
          </p>
        )}
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>
          Image:
          <input
            type="file"
            accept="image/png, image/jpeg"
            {...register('image', {
              setValueAs: (value) => {
                return {
                  image: value.name,
                  size: value.size,
                  type: value.type,
                };
              },
            })}
          />
        </label>
        {errors.image && (
          <p className={styles.errorMessage}>{errors.image.message}</p>
        )}
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>
          Country:
          <input type="text" {...register('country', { required: true })} />
        </label>
        {errors.country && (
          <p className={styles.errorMessage}>{errors.country.message}</p>
        )}
      </div>

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
