import { createBrowserRouter } from 'react-router-dom';

import { AuthRoutes } from './auth';
import { DashboardRoutes } from './dashboard';

export const AppRoutes = createBrowserRouter([...AuthRoutes, ...DashboardRoutes]);
