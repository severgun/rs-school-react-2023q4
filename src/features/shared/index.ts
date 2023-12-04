import * as yup from 'yup';

export const enum GENDER {
  Male = 'Male',
  Female = 'Female',
}

const MAX_IMAGE_SIZE_KB = 512;
const MAX_IMAGE_SIZE = MAX_IMAGE_SIZE_KB * 1024;

export const formSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]\w*/g, 'first letter of the name must be capitalized')
    .required(),
  age: yup.number().min(13).max(99).required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8)
    .max(32)
    .test(
      'password',
      'weak password. It should contain at least one lowercase letter',
      (value) => {
        return value?.match(/(?=.*[a-z])/g) ? true : false;
      }
    )
    .test(
      'password',
      'weak password. It should contain at least one uppercase letter',
      (value) => {
        return value?.match(/(?=.*[A-Z])/g) ? true : false;
      }
    )
    .test(
      'password',
      'weak password. It should contain at least one number',
      (value) => {
        return value?.match(/(?=.*[0-9])/g) ? true : false;
      }
    )
    .test(
      'password',
      'weak password. It should contain at least one special character',
      (value) => {
        return value?.match(/(?=.*[!@#\$%\^&\*])/g) ? true : false;
      }
    )
    .required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'passwords does not match'),
  gender: yup.string().required(),
  image: yup
    .mixed<FileList>()
    .nullable()
    .test(
      'image',
      `image is required and size should be less or equal to ${MAX_IMAGE_SIZE_KB} kB`,
      (fileList) => {
        if (fileList && fileList.length > 0) {
          const file = fileList[0];
          return file.size <= MAX_IMAGE_SIZE;
        } else {
          return false;
        }
      }
    ),
  isTermsAccepted: yup
    .bool()
    .required()
    .oneOf([true], 'the terms and conditions must be accepted'),
  country: yup.string().required(),
});

export interface FormsData extends yup.InferType<typeof formSchema> {}
