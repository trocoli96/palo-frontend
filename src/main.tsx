import React from 'react';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { LoaderScreen } from '@layouts/loader/loader';
import { ContextValues } from '@types/context';
import { CookiesKeys } from '@types/cookies';
import { AUTH_ENDPOINTS } from '@types/endpoints';
import { User } from '@types/user';
import { api } from '@utils/api/api';
import { AppProvider } from '@utils/context/context';
import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import './App.css';
import { AppRoutes } from './app';
import { useCookies } from './hooks/useCookies';

export const InitApp = () => {
  // Check if we already have a stored token
  const { getCookie } = useCookies();
  const token = getCookie(CookiesKeys.TOKEN);

  // Get /me info in case we have a token
  const { data, isLoading } = useSWR<AxiosResponse<User>>(token && 'validate-cookie-token', () => {
    return api.get(AUTH_ENDPOINTS.VALIDATE_TOKEN);
  });

  // Prepare initial context
  const initialContext: ContextValues = {
    session: {
      token: token,
    },
    user: data?.data,
    loading: false,
  };

  if (isLoading) {
    return <LoaderScreen />;
  }

  return (
    <AppProvider value={initialContext}>
      <ChakraProvider>
        <RouterProvider router={AppRoutes} />
        <Toaster position="bottom-right" />
      </ChakraProvider>
    </AppProvider>
  );
};
