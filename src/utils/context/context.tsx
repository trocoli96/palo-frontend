import React, { createContext, useContext, useMemo, useSyncExternalStore } from 'react';

import { Session, SessionResponse } from '@types/auth';
import { ContextType, ContextValues } from '@types/context';
import { CookiesKeys } from '@types/cookies';

import { useCookies } from '../../hooks/useCookies';
import { useLazyRef } from '../../hooks/useLazyRef';

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
  const { setCookie, removeCookie } = useCookies();

  function getState<R>(selector: (state: ContextValues) => R) {
    const cb = () => selector(store.snapshot());
    return useSyncExternalStore<R>(store.subscribe, cb, cb);
  }

  return {
    getState,
    getSession: () => getState(state => state.session),
    getLoading: () => getState(state => state.loading),
    getUser: () => getState(state => state?.user),
    authUser: (session: SessionResponse) => {
      store.setState('session', session);
      store.setState('user', session.user);
      setCookie(CookiesKeys.TOKEN, session.token);
      setCookie(CookiesKeys.REFRESH_TOKEN, session.refreshToken);
    },
    logout: () => {
      store.setState('session', null);
      store.setState('user', null);
      removeCookie(CookiesKeys.TOKEN);
      removeCookie(CookiesKeys.REFRESH_TOKEN);
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
