import { useState, useEffect } from 'react';

import Cookies from 'js-cookie';

type CookieValue = string | undefined;

export function useCookies(): {
  getCookie: (key: string) => CookieValue;
  setCookie: (key: string, value: string, options?: Cookies.CookieAttributes) => void;
  removeCookie: (key: string) => void;
} {
  const getCookie = (key: string): CookieValue => Cookies.get(key);

  const setCookie = (key: string, value: string, options?: Cookies.CookieAttributes) => {
    Cookies.set(key, value, options);
    setCookieState(value);
  };

  const removeCookie = (key: string) => {
    Cookies.remove(key);
  };

  const [cookieState, setCookieState] = useState<CookieValue | null>(null);

  useEffect(() => {
    if (cookieState) {
      setCookieState(getCookie(cookieState));
    }
  }, [cookieState]);

  return { getCookie, setCookie, removeCookie };
}
