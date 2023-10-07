import React from 'react';

import { ProtectedRoute } from '@components/routes/protectedRoute/protectedRoute';
import { PROTECTED_ROUTES } from '@types';

import { Admin } from './pages/admin/admin';
import { Home } from './pages/home/home';

export const DashboardRoutes = [
  {
    path: PROTECTED_ROUTES.HOME,
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: PROTECTED_ROUTES.ADMIN,
    element: (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    ),
  },
];
