import * as yup from "yup";
import { Roles, RolesDisplayNameMap } from "../../../constants/roles";

export const userSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  lastName: yup.string().required(),
  role: yup
    .string()
    .oneOf([
      Roles.Admin,
      Roles.Inspector,
      Roles.GlobalAdmin,
    ]),
});
