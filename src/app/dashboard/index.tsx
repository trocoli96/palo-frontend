import React from 'react';

import { ProtectedRoute } from '@components/routes/protectedRoute/protectedRoute';
import { PROTECTED_ROUTES } from '@utils/routes/routes';

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
        <Home />
      </ProtectedRoute>
    ),
  },
];
