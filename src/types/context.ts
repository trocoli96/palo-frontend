import { Session } from './auth';
import { User } from './user';

export interface ContextValues {
  user?: User;
  session?: Session;
  loading: boolean;
  // Add whatever information you want in the context
}

export type ContextType = {
  setState: (key: string, value: any) => void;
  snapshot: () => ContextValues;
  emit: () => void;
  subscribe: (callback: () => void) => () => void;
};
