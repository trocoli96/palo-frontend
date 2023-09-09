import { User } from './user';

export interface Session {
  refreshToken: string;
  token: string;
  tokenExpires: number;
  user: User;
}
