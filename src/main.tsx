import React from 'react';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { AppProvider } from '@utils/context/context';

import './App.css';
import { AppRoutes } from './app';

export const InitApp = () => {
  const initialContext = {
    session: undefined,
    isLoggedIn: false,
  };

  return (
    <AppProvider value={initialContext}>
      <ChakraProvider>
        <RouterProvider router={AppRoutes} />
        <Toaster position="bottom-right" />
      </ChakraProvider>
    </AppProvider>
  );
};
