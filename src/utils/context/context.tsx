import React, { createContext, useContext, useMemo, useSyncExternalStore } from 'react';

import { useLazyRef } from '../../hooks/useLazyRef';
import { Session } from '../types/auth';
import { ContextType, ContextValues } from '../types/context';

// @ts-ignore
const AppContext = createContext<ContextType>(null);

const useAppContextStore = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be inside the App Provider');
  }
  return context;
};

export const useAppContext = () => {
  const store = useAppContextStore();

  function getState<R>(selector: (state: ContextValues) => R) {
    const cb = () => selector(store.snapshot());
    return useSyncExternalStore<R>(store.subscribe, cb, cb);
  }

  return {
    getState,
    getLoggedIn: () => getState(state => state.isLoggedIn),
    getSession: () => getState(state => state.session),
    getUser: () => getState(state => state.session?.user),
    setLoggedIn: (isLoggedIn: boolean) => store.setState('isLoggedIn', isLoggedIn),
    authUser: (session: Session) => {
      store.setState('session', session);
      store.setState('isLoggedIn', true);
    },
    setSession: (session: Session) => store.setState('session', session),
  };
};

export const AppProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ContextValues;
}) => {
  const listener = useLazyRef<Set<() => void>>(() => new Set());

  const state = useLazyRef<ContextValues>(() => {
    return value;
  });

  const store = useMemo<ContextType>(() => {
    return {
      setState: (key, value) => {
        // @ts-ignore
        if (Object.is(state.current[key], value)) {
          return;
        }
        // @ts-ignore
        state.current[key] = value;
        store.emit();
      },
      snapshot: () => state.current,
      subscribe: callback => {
        listener.current.add(callback);
        return () => listener.current.delete(callback);
      },
      emit: () => listener.current.forEach(cb => cb()),
    };
  }, []);

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};
