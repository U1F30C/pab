import * as yup from "yup";

export const vaccineSchema = yup.object().shape({
  name: yup.string().required(),
});
