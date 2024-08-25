import React from 'react';

import { UNPROTECTED_ROUTES } from 'types';

import { ForgotPassword } from './pages/forgotPassword/forgotPassword';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { AnonymousRoute } from '../../components/routes/anonymousRoute/anonymousRoute';

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
  {
    path: UNPROTECTED_ROUTES.FORGOT_PASSWORD,
    element: (
      <AnonymousRoute>
        <ForgotPassword />
      </AnonymousRoute>
    ),
  },
];
