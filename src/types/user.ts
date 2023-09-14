export enum Role {
  USER = 'User',
  ADMIN = 'Admin',
}

export interface UserRole {
  id: number;
  name: Role;
}

export interface User {
  email: string;
  name: string;
  role: UserRole;
  // Add whatever props in user
}
