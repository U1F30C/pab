import { Roles } from '../constants/roles';

export enum UserStates {
  Active = 'Active',
  Inactive = 'Inactive',
}
export interface User {
  id: string;
  name: string;
  jobRole: string;
  address: string;
  email: string;
  phoneNumber: string;
  state: UserStates;
  username: string;
  password: string;
}
