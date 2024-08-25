import { Session } from './auth';
import { ApplicationModals } from './modals';
import { User } from './user';

type ModalStateValue = {
  isOpen: boolean;
  options?: any;
};

export type ModalState = Record<ApplicationModals, ModalStateValue>;

export interface ContextValues {
  user?: User;
  session?: Session;
  loading: boolean;
  modalsState: ModalState;
  mutateUser: any;
  // Add whatever information you want in the context
}

export type ContextType = {
  setState: (key: string, value: any) => void;
  snapshot: () => ContextValues;
  emit: () => void;
  subscribe: (callback: () => void) => () => void;
};
