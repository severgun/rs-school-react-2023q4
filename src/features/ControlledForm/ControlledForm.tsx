import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './ControlledForm.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { GENDER, schema } from '@/features/shared';

type Inputs = {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  isAcceptedTerms: boolean;
};

const enum ERRORS {
  FieldRequired = 'This field is required',
}

export default function ControlledForm(): React.JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.label}>
        Name:
        <input type="text" {...register('name', { required: true })} />
        {errors.name && <span>{ERRORS.FieldRequired}</span>}
      </label>
      <label className={styles.label}>
        Age:
        <input
          type="number"
          {...register('age', { required: true, min: 18, max: 99 })}
        />
        {errors.age && <span>{ERRORS.FieldRequired}</span>}
      </label>
      <label className={styles.label}>
        Email:
        <input type="email" {...register('email', { required: true })} />
        {errors.email && <span>{ERRORS.FieldRequired}</span>}
      </label>
      <label className={styles.label}>
        Password:
        <input type="password" {...register('password', { required: true })} />
        {errors.password && <span>{ERRORS.FieldRequired}</span>}
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
        {errors.gender && <span>{ERRORS.FieldRequired}</span>}
      </label>
      <label className={styles.label}>
        <input
          type="checkbox"
          defaultChecked={false}
          {...register('isAcceptedTerms', { required: true })}
        />
        Accept Terms & Conditions
        {errors.isAcceptedTerms && <span>{ERRORS.FieldRequired}</span>}
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
