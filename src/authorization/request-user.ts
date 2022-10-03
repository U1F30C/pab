export interface RequestUser {
  id: number;
  name: string;
  lastName: string;
  role: string;
  email: string;
}

declare global {
  namespace Express {
    interface User extends RequestUser {}
  }
}
