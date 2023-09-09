import { Session } from './auth';

export interface ContextValues {
  session?: Session;
  isLoggedIn?: boolean;
  // Add whatever information you want in the context
}

export type ContextType = {
  setState: (key: string, value: any) => void;
  snapshot: () => ContextValues;
  emit: () => void;
  subscribe: (callback: () => void) => () => void;
};
