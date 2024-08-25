import React, { createContext, useContext, useMemo, useSyncExternalStore } from 'react';

import i18n from 'i18next';

import { ContextValues, CookiesKeys, Session, SessionResponse } from 'types';
import { useCookies, useLazyRef } from '../hooks';

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
      if (session?.user?.local?.code) {
        i18n.changeLanguage(session.user.local.code);
      }
      if (session.token) {
        setCookie(CookiesKeys.TOKEN, session.token);
      }
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

  // @ts-ignore
  const store = useMemo<ContextType>(() => {
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return {
      setState: (key: any, value: any) => {
        // @ts-ignore
        if (Object.is(state.current[key], value)) {
          return;
        }
        // @ts-ignore
        state.current[key] = value;
        store.emit();
      },
      snapshot: () => state.current,
      subscribe: (callback: any) => {
        // @ts-ignore
        listener.current.add(callback);
        // @ts-ignore
        return () => listener.current.delete(callback);
      },
      // @ts-ignore
      emit: () => listener.current.forEach(cb => cb()),
    };
  }, []);

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};
