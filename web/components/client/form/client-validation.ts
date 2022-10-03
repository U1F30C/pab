import * as yup from 'yup';

export const clientSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),

  phoneNumber: yup.string().required(),
  jobRole: yup.string().required(),
  state: yup.string().required(),
  address: yup.string().required(),
  clientname: yup.string().required(),
});
