import { Roles } from "../constants/roles";

export interface User {
  id: number;
  name: string;
  lastName: string;
  fullName: string;
  email: string;
  role: Roles;
  active: boolean | string;
}
