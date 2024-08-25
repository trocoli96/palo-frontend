export enum Role {
  USER = 'User',
  ADMIN = 'Admin',
}

export interface UserRole {
  id: number;
  name: Role;
}

interface Status {
  id: number;
  name: string;
}

interface Local {
  id: number;
  code: string;
}

interface Tenant {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  status: Status;
  local: Local;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  role: UserRole;
  status: Status;
  local: Local;
  tenant: Tenant;
  // Add whatever props in user
}
