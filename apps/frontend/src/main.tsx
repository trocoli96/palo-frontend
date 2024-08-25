import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { RouterProvider } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { LoaderScreen } from '@layouts/loader/loader';
import { AUTH_ENDPOINTS, ContextValues, CookiesKeys, ModalState, SessionResponse } from '@types';
import { noTokenApi } from '@utils/api/api';
import { AppProvider } from '@utils/context/context';
import { AxiosResponse } from 'axios';
import useSWR, { SWRConfig } from 'swr';

import { AppRoutes } from './app';
import { useCookies } from './hooks/useCookies';
import './utils/i18n/i18n';

export const InitApp = () => {
  // Check if we already have a stored token
  const { getCookie, setCookie, removeCookie } = useCookies();
  const token = getCookie(CookiesKeys.TOKEN);
  const refreshToken = getCookie(CookiesKeys.REFRESH_TOKEN);
  const { i18n } = useTranslation();

  // Get /me info in case we have a token
  const { data, isLoading, mutate } = useSWR(
    token || refreshToken ? 'validate-cookie-token' : null,
    async () => {
      // First, try to validate the access token
      if (token) {
        try {
          const validateToken = await noTokenApi.get(AUTH_ENDPOINTS.VALIDATE_TOKEN, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (validateToken.status !== 401) {
            i18n.changeLanguage(validateToken.data?.local?.code?.split('-')[0]);
            return validateToken;
          }
        } catch (e) {
          console.log('Token expired, going to refresh.');
        }
      }

      // If the access token is not valid, attempt to refresh it using the refresh token
      try {
        const refreshTokenRequest: AxiosResponse<SessionResponse> = await noTokenApi.post(
          AUTH_ENDPOINTS.VALIDATE_REFRESH_TOKEN,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );
        if (refreshTokenRequest.status !== 401) {
          if (refreshTokenRequest?.data?.token) {
            setCookie(CookiesKeys.TOKEN, refreshTokenRequest.data.token);
          }
          if (refreshTokenRequest?.data?.refreshToken) {
            setCookie(CookiesKeys.REFRESH_TOKEN, refreshTokenRequest.data.refreshToken);
          }
          return await noTokenApi.get(AUTH_ENDPOINTS.VALIDATE_TOKEN, {
            headers: {
              Authorization: `Bearer ${refreshTokenRequest.data.token}`,
            },
          });
        }
        i18n.changeLanguage(refreshTokenRequest.data?.user.local?.code?.split('-')[0]);
        return refreshTokenRequest;
      } catch (e) {
        removeCookie(CookiesKeys.TOKEN);
        removeCookie(CookiesKeys.REFRESH_TOKEN);
      }
    },
  );

  // Prepare initial context
  const initialContext: ContextValues = {
    session: {
      token: token,
    },
    user: data?.data,
    loading: false,
    modalsState: {} as ModalState,
    mutateUser: mutate,
  };

  if (isLoading) {
    return <LoaderScreen />;
  }

  // https://twitter.com/_georgemoller/status/1703935267327901722
  return (
    <AppProvider value={initialContext}>
      <ChakraProvider>
        <SWRConfig
          value={{
            revalidateOnFocus: false,
          }}
        >
          <RouterProvider router={AppRoutes} />
          <Toaster position="bottom-right" />
        </SWRConfig>
      </ChakraProvider>
    </AppProvider>
  );
};
