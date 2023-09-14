import React from 'react';

import { AnonymousRoute } from '@components/routes/anonymousRoute/anonymousRoute';
import { UNPROTECTED_ROUTES } from '@types/routes';

import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const AuthRoutes = [
  {
    path: '*',
    element: (
      <AnonymousRoute>
        <Login />
      </AnonymousRoute>
    ),
  },
  {
    path: UNPROTECTED_ROUTES.REGISTER,
    element: (
      <AnonymousRoute>
        <Register />
      </AnonymousRoute>
    ),
  },
  {
    path: UNPROTECTED_ROUTES.LOGIN,
    element: (
      <AnonymousRoute>
        <Login />
      </AnonymousRoute>
    ),
  },
];
