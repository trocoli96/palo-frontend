import { User } from './user';

export interface SessionResponse {
  refreshToken: string;
  token?: string | null;
  tokenExpires: number;
  user: User;
}

export interface Session {
  refreshToken?: string;
  token?: string | null;
  tokenExpires?: number;
}
