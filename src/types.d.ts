export type FormsDataState = {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  isTermsAccepted: boolean;
  image: {
    image: string;
    size: number;
    type: string;
  };
  country: string;
};

export type ImageData = {
  image: string;
  size: number;
  type: string;
};
