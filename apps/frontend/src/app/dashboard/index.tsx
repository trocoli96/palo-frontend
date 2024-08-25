import React from 'react';

import { PROTECTED_ROUTES } from 'types';

import { Admin } from './pages/admin/admin';
import { Home } from './pages/home/home';
import { ProtectedRoute } from '../../components/routes/protectedRoute/protectedRoute';

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
