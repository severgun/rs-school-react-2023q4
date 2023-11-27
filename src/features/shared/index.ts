import * as yup from 'yup';

export const enum GENDER {
  Male = 'Male',
  Female = 'Female',
}

export const schema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
  gender: yup.string().required(),
  isAcceptedTerms: yup.bool().required(),
});
