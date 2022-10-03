import * as yup from 'yup';
import { Roles, RolesDisplayNameMap } from '../../../constants/roles';

export const userSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),

  phoneNumber: yup.string().required(),
  jobRole: yup.string().required(),
  state: yup.string().required(),
  address: yup.string().required(),
  username: yup.string().required(),
});
