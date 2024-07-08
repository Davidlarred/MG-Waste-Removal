// user.model.ts
export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  emailVerified: boolean;
  // other fields if any...
}

export interface AppUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  // other fields if any...
}